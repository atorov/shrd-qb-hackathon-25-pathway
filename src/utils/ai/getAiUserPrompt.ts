import { AI_USER_PROMPT } from '../../constants/prompts';

function getAiUserPrompt({
  assistantQuestion,
}: {
  assistantQuestion: string;
}): string {
  return AI_USER_PROMPT.replace('{ASSISTANT_QUESTION}', assistantQuestion);
}
export default getAiUserPrompt;
