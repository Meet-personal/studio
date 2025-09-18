
'use server';

/**
 * @fileOverview Generates email content for contact form submissions.
 *
 * - generateContactEmails - A function that creates email content for both the admin and the user.
 * - GenerateContactEmailsInput - The input type for the generateContactEmails function.
 * - GenerateContactEmailsOutput - The return type for the generateContactEmails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContactEmailsInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the submitter.'),
  subject: z.string().describe('The subject of the contact message.'),
  message: z.string().describe('The content of the contact message.'),
});
export type GenerateContactEmailsInput = z.infer<typeof GenerateContactEmailsInputSchema>;

const EmailSchema = z.object({
    subject: z.string().describe('The subject line of the email.'),
    body: z.string().describe('The HTML body content of the email.'),
});

const GenerateContactEmailsOutputSchema = z.object({
  adminEmail: EmailSchema.describe('The email to be sent to the site administrator.'),
  userEmail: EmailSchema.describe('The thank-you email to be sent to the user.'),
});
export type GenerateContactEmailsOutput = z.infer<typeof GenerateContactEmailsOutputSchema>;


export async function generateContactEmails(input: GenerateContactEmailsInput): Promise<GenerateContactEmailsOutput> {
  return generateContactEmailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContactEmailsPrompt',
  input: {schema: GenerateContactEmailsInputSchema},
  output: {schema: GenerateContactEmailsOutputSchema},
  prompt: `You are an assistant for a website called "Daily Chronicles". Your task is to generate two emails in HTML format based on a user's contact form submission.

  The user's details are:
  - Name: {{{name}}}
  - Email: {{{email}}}
  - Subject: {{{subject}}}
  - Message:
  {{{message}}}

  1.  **Admin Email**: This email is for the website administrator.
      - The subject line should be "New Contact Form Submission: {{{subject}}}".
      - The body should clearly present all the information from the user (Name, Email, Subject, Message) in a clean, readable HTML format.

  2.  **User Thank-You Email**: This email is for the user who submitted the form.
      - The subject line should be "We've received your message, {{{name}}}!".
      - The body should be a friendly, professional HTML-formatted email. Thank them for contacting Daily Chronicles and let them know that you will get back to them soon. Address them by their name, {{{name}}}.
  
  Provide the output as a single JSON object with two keys: 'adminEmail' and 'userEmail', each containing 'subject' and 'body' fields.
  `,
});

const generateContactEmailsFlow = ai.defineFlow(
  {
    name: 'generateContactEmailsFlow',
    inputSchema: GenerateContactEmailsInputSchema,
    outputSchema: GenerateContactEmailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
