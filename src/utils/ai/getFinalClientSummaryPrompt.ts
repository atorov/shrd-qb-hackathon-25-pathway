import { FINAL_CONVERSATION_SUMMARY_FOR_CUSTOMER_PROMPT } from '../../constants/prompts';

function getFinalClientSummaryPrompt({
  conversationContext,
  userSentiment,
}: {
  conversationContext: string;
  userSentiment: number;
}): string {
  return FINAL_CONVERSATION_SUMMARY_FOR_CUSTOMER_PROMPT.replace(
    '{CONVERSATION_CONTEXT}',
    conversationContext
  ).replace('{USER_SENTIMENT}', String(userSentiment));
}
export default getFinalClientSummaryPrompt;
