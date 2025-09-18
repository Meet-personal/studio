
'use server';

import { generateBlogPost } from '@/ai/flows/generate-blog-post';
import { addPost, getPosts, isAdmin, hasPostForToday } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { findImage } from '@/lib/placeholder-images';
import { CATEGORIES } from '@/lib/constants';

export type FormState = {
  message: string;
  type: 'success' | 'error';
} | null;

export async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!isAdmin()) {
    return { message: 'You do not have permission to create a post.', type: 'error' };
  }
  
  const categorySlug = formData.get('category') as string;
  if (!categorySlug) {
    return { message: 'Category is required.', type: 'error' };
  }

  if (hasPostForToday(categorySlug)) {
    return { message: `A post for this category has already been created today.`, type: 'error' };
  }
  
  const categoryDetails = CATEGORIES.find(c => c.slug === categorySlug);
  if (!categoryDetails) {
    return { message: 'Invalid category.', type: 'error' };
  }

  try {
    const generatedData = await generateBlogPost({ category: categoryDetails.name });

    const image = findImage(categorySlug, true);

    const newPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title: generatedData.title,
      content: generatedData.content,
      category: categorySlug,
      tags: generatedData.tags,
      createdAt: new Date(),
      image: image.imageUrl,
      imageHint: image.imageHint,
    };

    addPost(newPost);

    revalidatePath('/');
    revalidatePath(`/category/${categorySlug}`);
    
    return { message: 'Successfully generated a new post!', type: 'success' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to generate post. Please try again.', type: 'error' };
  }
}
