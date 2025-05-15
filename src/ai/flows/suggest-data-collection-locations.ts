'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting data collection locations to users.
 *
 * - suggestDataCollectionLocations - A function that suggests data collection locations based on user input.
 * - SuggestDataCollectionLocationsInput - The input type for the suggestDataCollectionLocations function.
 * - SuggestDataCollectionLocationsOutput - The return type for the suggestDataCollectionLocations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDataCollectionLocationsInputSchema = z.object({
  latitude: z
    .number()
    .describe('The latitude of the user requesting data collection locations.'),
  longitude: z
    .number()
    .describe('The longitude of the user requesting data collection locations.'),
  dataType: z
    .enum(['property', 'scan', 'recording'])
    .describe(
      'The type of data the user wants to collect: property, scan, or recording.'
    ),
});
export type SuggestDataCollectionLocationsInput = z.infer<
  typeof SuggestDataCollectionLocationsInputSchema
>;

const SuggestDataCollectionLocationsOutputSchema = z.object({
  locations: z
    .array(
      z.object({
        latitude: z.number().describe('The latitude of the suggested location.'),
        longitude: z.number().describe('The longitude of the suggested location.'),
        description: z.string().describe('A description of the suggested location.'),
      })
    )
    .describe(
      'An array of suggested locations for data collection, with latitude, longitude, and a description.'
    ),
});
export type SuggestDataCollectionLocationsOutput = z.infer<
  typeof SuggestDataCollectionLocationsOutputSchema
>;

export async function suggestDataCollectionLocations(
  input: SuggestDataCollectionLocationsInput
): Promise<SuggestDataCollectionLocationsOutput> {
  return suggestDataCollectionLocationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDataCollectionLocationsPrompt',
  input: {schema: SuggestDataCollectionLocationsInputSchema},
  output: {schema: SuggestDataCollectionLocationsOutputSchema},
  prompt: `You are an expert urban data collection assistant.

  Given the user's current location (latitude: {{{latitude}}}, longitude: {{{longitude}}}) and the type of data they want to collect ({{{dataType}}}), suggest several locations where they could effectively collect this data.

  Return the locations as a JSON array of objects, each with latitude, longitude, and a short description of the location and why it's suitable for data collection.

  The locations should be within a reasonable distance from the user's current location.
  `,
});

const suggestDataCollectionLocationsFlow = ai.defineFlow(
  {
    name: 'suggestDataCollectionLocationsFlow',
    inputSchema: SuggestDataCollectionLocationsInputSchema,
    outputSchema: SuggestDataCollectionLocationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
