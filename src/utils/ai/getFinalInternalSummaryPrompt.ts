import { FINAL_CONVERSATION_SUMMARY_INTERNAL_PROMPT } from '../../constants/prompts';

function getFinalInternalSummaryPrompt({
  conversationContext,
  userSentiment,
}: {
  conversationContext: string;
  userSentiment: number;
}): string {
  return FINAL_CONVERSATION_SUMMARY_INTERNAL_PROMPT.replace(
    '{CONVERSATION_CONTEXT}',
    conversationContext
  ).replace('{USER_SENTIMENT}', String(userSentiment));
}
export default getFinalInternalSummaryPrompt;
