import type { JsonSchema7Type } from 'zod-to-json-schema';

import { SENTIMENT_ANALYSIS_PROMPT } from '../../constants/prompts';

function getSentimentAnalysisPrompt<T extends JsonSchema7Type>({
  jsonSchema,
  previousSentiment,
  userLatestMessageText,
}: {
  jsonSchema: T;
  previousSentiment: number;
  userLatestMessageText: string;
}): string {
  return SENTIMENT_ANALYSIS_PROMPT.replace(
    '{JSON_SCHEMA}',
    JSON.stringify(jsonSchema, null, 2)
  )
    .replace('{PREVIOUS_SENTIMENT}', String(previousSentiment))
    .replace('{USER_LATEST_MESSAGE}', userLatestMessageText);
}
export default getSentimentAnalysisPrompt;
