import { AI_ASSISTANT_PROMPT } from '../../constants/prompts';

function getAiAssistantPrompt({
  conversationContext,
  referenceText,
  userSentiment,
}: {
  conversationContext: string;
  referenceText: string;
  userSentiment: number;
}): string {
  return AI_ASSISTANT_PROMPT.replace(
    '{CONVERSATION_CONTEXT}',
    conversationContext
  )
    .replace('{USER_SENTIMENT}', String(userSentiment))
    .replace('{REFERENCE_TEXT}', referenceText);
}
export default getAiAssistantPrompt;
