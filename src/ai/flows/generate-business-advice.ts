'use server';

/**
 * @fileOverview Generates business advice based on provided business data.
 *
 * - generateBusinessAdvice - A function that generates business advice.
 * - GenerateBusinessAdviceInput - The input type for the generateBusinessAdvice function.
 * - GenerateBusinessAdviceOutput - The return type for the generateBusinessAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBusinessAdviceInputSchema = z.object({
  salesData: z
    .string()
    .describe(
      'A summary of sales data, including sales trends, best-selling products, and customer demographics.'
    ),
  customerData: z
    .string()
    .describe(
      'A summary of customer data, including customer purchase history and preferences.'
    ),
  businessExpenses: z
    .string()
    .describe(
      'A summary of business expenses, including categories and amounts.'
    ),
});
export type GenerateBusinessAdviceInput = z.infer<
  typeof GenerateBusinessAdviceInputSchema
>;

const GenerateBusinessAdviceOutputSchema = z.object({
  advice: z.string().describe('AI-generated business advice.'),
});
export type GenerateBusinessAdviceOutput = z.infer<
  typeof GenerateBusinessAdviceOutputSchema
>;

export async function generateBusinessAdvice(
  input: GenerateBusinessAdviceInput
): Promise<GenerateBusinessAdviceOutput> {
  return generateBusinessAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBusinessAdvicePrompt',
  input: {schema: GenerateBusinessAdviceInputSchema},
  output: {schema: GenerateBusinessAdviceOutputSchema},
  prompt: `You are a business consultant specializing in providing actionable advice to small and medium-sized enterprises (SMEs) in emerging markets like Uganda.

  Based on the following business data, provide plain-English advice on sales trends, customer insights, and growth strategies. Focus on practical steps the business owner can take to improve their performance.  Avoid complex charts, technical jargon and focus on simple, actionable recommendations.

Sales Data: {{{salesData}}}
Customer Data: {{{customerData}}}
Business Expenses: {{{businessExpenses}}}`,
});

const generateBusinessAdviceFlow = ai.defineFlow(
  {
    name: 'generateBusinessAdviceFlow',
    inputSchema: GenerateBusinessAdviceInputSchema,
    outputSchema: GenerateBusinessAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
