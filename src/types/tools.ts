import type { ChatMessage } from './chat';
import type { ToolItem } from './flow';

export type ToolWithExec = ToolItem & {
  exec?: () => Promise<ChatMessage>;
};
