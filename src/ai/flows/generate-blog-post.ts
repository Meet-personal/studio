'use server';

/**
 * @fileOverview A blog post generation AI agent.
 *
 * - generateBlogPost - A function that handles the blog post generation process.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostInputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the blog post (IT, Consultant, Travel, Finance, Business, Companies, Cryptocoins).'
    ),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  description: z.string().describe('A short, one-sentence description of the blog post.'),
  content: z.string().describe('The content of the blog post, at least 6 paragraphs long.'),
  tags: z.array(z.string()).describe('Relevant tags for the blog post.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: {schema: GenerateBlogPostInputSchema},
  output: {schema: GenerateBlogPostOutputSchema},
  prompt: `You are a blog post writer. Write a detailed and engaging blog post about the following category: {{{category}}}.

    The blog post must have a title, a short one-sentence description, content that is at least six paragraphs long, and a list of relevant tags.
    Make sure the content provides in-depth information and is well-structured.
  `,
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
