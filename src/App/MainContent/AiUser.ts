import getCompletion from '~/api/ai/get-completion';
import getAiUserPrompt from '~/utils/ai/getAiUserPrompt';

import { AI_USER_THINKING_STATUSES } from './constants';
import type { AiUserThinkingStatus } from './types';

class AiUser {
  id: string;
  prevAiLastMessageText: string = '';
  status: AiUserThinkingStatus = AI_USER_THINKING_STATUSES.Idle;

  constructor() {
    this.id = `ai-user-${Math.random().toString(8).slice(2)}`;
  }

  think = async ({
    aiLastMessageText,
    setUserQuery,
  }: {
    aiLastMessageText: string;
    setUserQuery: (query: string) => void;
  }) => {
    if (this.status === AI_USER_THINKING_STATUSES.Idle) {
      this.status = AI_USER_THINKING_STATUSES.Thinking;
      this.prevAiLastMessageText = aiLastMessageText;
      const prompt = getAiUserPrompt({
        assistantQuestion: aiLastMessageText,
      });
      const completion = await getCompletion(prompt);
      const generated = completion.response.trim();
      this.status = AI_USER_THINKING_STATUSES.Sending;
      setUserQuery(generated);
    }
  };
}

export default AiUser;
