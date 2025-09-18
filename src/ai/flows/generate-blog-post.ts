
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
  description: z.string().describe('A detailed, multi-sentence description of the blog post, suitable for SEO.'),
  content: z.string().describe('The content of the blog post, at least 5 paragraphs long with multiple headings.'),
  tags: z.array(z.string()).describe('An array of 5 to 10 relevant tags for the blog post.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: {schema: GenerateBlogPostInputSchema},
  output: {schema: GenerateBlogPostOutputSchema},
  prompt: `You are an expert blog post writer tasked with creating high-quality, detailed content. Write a comprehensive and engaging blog post about the following category: {{{category}}}.

    The blog post must adhere to the following strict requirements:
    1.  **Title:** A compelling and SEO-friendly title.
    2.  **Description:** A detailed, multi-sentence paragraph that summarizes the article, suitable for meta descriptions.
    3.  **Content:** The main body must be substantial, at least 5 paragraphs long. It should be well-structured with multiple H2 and H3 headings to break up the text and improve readability. Provide in-depth information and a clear voice.
    4.  **Tags:** A list of 5 to 10 relevant and specific tags for the blog post.
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
