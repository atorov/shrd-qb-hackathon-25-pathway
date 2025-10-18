import type { JsonSchema7Type } from 'zod-to-json-schema';

import { ANSWER_INTERPRETATION_PROMPT } from '../../constants/prompts';

function getAnswerInterpretationPrompt<T extends JsonSchema7Type>({
  aiLastMessageText,
  conversationContext,
  jsonSchema,
  possibleAnswers,
  userLatestMessageText,
}: {
  aiLastMessageText: string;
  conversationContext: string;
  jsonSchema: T;
  possibleAnswers: string;
  userLatestMessageText: string;
}): string {
  return ANSWER_INTERPRETATION_PROMPT.replace(
    '{CONVERSATION_CONTEXT}',
    conversationContext
  )
    .replace('{AI_LAST_MESSAGE}', aiLastMessageText)
    .replace('{USER_LATEST_MESSAGE}', userLatestMessageText)
    .replace('{POSSIBLE_ANSWERS}', possibleAnswers)
    .replace('{JSON_SCHEMA}', JSON.stringify(jsonSchema, null, 2));
}
export default getAnswerInterpretationPrompt;
