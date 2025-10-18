import type { AI_USER_THINKING_STATUSES } from './constants';

export type AiUserThinkingStatus =
  (typeof AI_USER_THINKING_STATUSES)[keyof typeof AI_USER_THINKING_STATUSES];
