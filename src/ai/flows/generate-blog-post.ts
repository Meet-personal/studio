
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
  prompt: `You are an expert blog post writer. Create a comprehensive and engaging blog post about the following category: {{{category}}}.

  Your response must be a JSON object with the following structure:
  - "title": A compelling and SEO-friendly title.
  - "description": A detailed, multi-sentence paragraph that summarizes the article.
  - "content": The main body, at least 5 paragraphs long, with multiple H2 and H3 headings.
  - "tags": An array of 5 to 10 relevant tags.
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
