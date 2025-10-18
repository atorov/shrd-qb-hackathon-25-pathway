import { SUMMARIZATION_PROMPT } from '../../constants/prompts';

function getSummarizationPrompt({
  aiLastMessageText,
  conversationContext,
  userLatestMessageText,
}: {
  aiLastMessageText: string;
  conversationContext: string;
  userLatestMessageText: string;
}): string {
  return SUMMARIZATION_PROMPT.replace('{AI_LAST_MESSAGE}', aiLastMessageText)
    .replace('{CONVERSATION_CONTEXT}', conversationContext)
    .replace('{USER_LATEST_MESSAGE}', userLatestMessageText);
}
export default getSummarizationPrompt;
