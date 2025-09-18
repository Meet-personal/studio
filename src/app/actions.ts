
'use server';

import { generateBlogPost } from '@/ai/flows/generate-blog-post';
import { addPost } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { findImage } from '@/lib/placeholder-images';
import { CATEGORIES } from '@/lib/constants';
import { generateContactEmails, type GenerateContactEmailsInput } from '@/ai/flows/generate-contact-emails';

export type FormState = {
  message: string;
  type: 'success' | 'error';
} | null;

export async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const password = formData.get('password');
  if (password !== 'admin123') {
      return { message: 'Incorrect password.', type: 'error' };
  }
  
  const categorySlug = formData.get('category') as string;
  if (!categorySlug) {
    return { message: 'Category is required.', type: 'error' };
  }
  
  const categoryDetails = CATEGORIES.find(c => c.slug === categorySlug);
  if (!categoryDetails) {
    return { message: 'Invalid category.', type: 'error' };
  }

  try {
    const generatedData = await generateBlogPost({ category: categoryDetails.name });

    if (!generatedData || !generatedData.title || !generatedData.content || !generatedData.tags) {
        return { message: `AI failed to generate a valid post. Response was incomplete. Received: ${JSON.stringify(generatedData)}`, type: 'error' };
    }

    const image = findImage(categorySlug, true);

    const postData = {
      title: generatedData.title,
      description: generatedData.description,
      content: generatedData.content,
      category: categorySlug,
      tags: generatedData.tags,
      image: image.imageUrl,
      imageHint: image.imageHint,
    };

    const newPost = addPost(postData);

    revalidatePath('/');
    revalidatePath(`/category/${categorySlug}`);
    revalidatePath(`/post/${newPost.id}`);
    
    return { message: 'Successfully generated a new post!', type: 'success' };
  } catch (e: any) {
    console.error(e);
    return { message: `Failed to generate post: ${e.message || 'An unknown error occurred.'}`, type: 'error' };
  }
}

export async function handleContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
        return { message: 'Please fill out all fields.', type: 'error' };
    }

    try {
        const emailInput: GenerateContactEmailsInput = { name, email, subject, message };
        const emails = await generateContactEmails(emailInput);
        
        // TODO: Implement email sending logic here
        // For example, using a service like Resend:
        // await resend.emails.send({
        //   from: 'Your App <onboarding@resend.dev>',
        //   to: 'your-admin-email@example.com',
        //   subject: emails.adminEmail.subject,
        //   html: emails.adminEmail.body,
        // });
        // await resend.emails.send({
        //   from: 'Your App <onboarding@resend.dev>',
        //   to: email,
        //   subject: emails.userEmail.subject,
        //   html: emails.userEmail.body,
        // });

        console.log("Admin Email:", emails.adminEmail);
        console.log("User Email:", emails.userEmail);

        return { message: "Thank you for your message! We'll get back to you shortly.", type: 'success' };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to send message. Please try again later.', type: 'error' };
    }
}
