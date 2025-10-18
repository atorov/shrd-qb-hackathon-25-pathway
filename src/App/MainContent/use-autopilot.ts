import { useEffect } from 'react';

import { STATUS } from '~/constants/status';
import useAppState from '~/context/app-state/useAppState';
import getAiLastMessageText from '~/utils/ai/getAiLastMessageText';

import AiUser from './AiUser';
import { AI_USER_THINKING_STATUSES } from './constants';

const AI_AUTOPILOT_ENABLED =
  import.meta.env.VITE_AI_AUTOPILOT_ENABLED === 'true';

const aiUser = new AiUser();

function useAutopilot(submitChatMessage: () => void) {
  const {
    currentFlowId,
    isFinalStep,
    setUserQuery,
    status,
    userQuery,
    chatMessages,
  } = useAppState();

  const aiLastMessageText = getAiLastMessageText(chatMessages);

  // Detect when AI has sent a new message and start "thinking"
  useEffect(() => {
    if (
      AI_AUTOPILOT_ENABLED &&
      status === STATUS.Idle &&
      currentFlowId &&
      !isFinalStep &&
      aiLastMessageText &&
      aiUser.prevAiLastMessageText !== aiLastMessageText &&
      aiUser.status === AI_USER_THINKING_STATUSES.Idle
    ) {
      aiUser.think({
        aiLastMessageText,
        setUserQuery,
      });
    }
  }, [
    aiLastMessageText,
    currentFlowId,
    isFinalStep,
    setUserQuery,
    status,
    submitChatMessage,
  ]);

  // Auto-submit user query when it changes (for AI user simulation)
  useEffect(() => {
    if (
      AI_AUTOPILOT_ENABLED &&
      userQuery &&
      aiUser.status === AI_USER_THINKING_STATUSES.Sending
    ) {
      setTimeout(() => {
        submitChatMessage();
        aiUser.status = AI_USER_THINKING_STATUSES.Idle;
      }, 2000);
    }
  }, [submitChatMessage, userQuery]);
}

export default useAutopilot;
