// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview AI-powered tag generator for blog posts.
 *
 * - generateTags - A function that generates relevant tags for a given blog post.
 * - GenerateTagsInput - The input type for the generateTags function.
 * - GenerateTagsOutput - The return type for the generateTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTagsInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post for which tags need to be generated.'),
});
export type GenerateTagsInput = z.infer<typeof GenerateTagsInputSchema>;

const GenerateTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of relevant tags generated for the blog post.'),
});
export type GenerateTagsOutput = z.infer<typeof GenerateTagsOutputSchema>;

export async function generateTags(input: GenerateTagsInput): Promise<GenerateTagsOutput> {
  return generateTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTagsPrompt',
  input: {schema: GenerateTagsInputSchema},
  output: {schema: GenerateTagsOutputSchema},
  prompt: `You are an expert blog post tag generator.

  Given the content of a blog post, you will generate an array of relevant tags that can be used to help users search and discover content.

  Blog Post Content: {{{blogPostContent}}}

  The tags should be relevant and descriptive. Return them as a JSON array of strings.  Do not include any introduction or explanation, just the array.  The array should be no more than 10 items long.
  `, 
});

const generateTagsFlow = ai.defineFlow(
  {
    name: 'generateTagsFlow',
    inputSchema: GenerateTagsInputSchema,
    outputSchema: GenerateTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
