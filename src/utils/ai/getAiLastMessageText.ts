import type { ChatMessage } from '~/types/chat';

function getAiLastMessageText(chatMessages: ChatMessage[]): string {
  return (
    chatMessages
      .filter(m => m.type === 'assistant')
      .at(-1)
      ?.parts.filter(p => p.type === 'text')
      .map(p => p.content)
      .join('\n') ?? ''
  );
}

export default getAiLastMessageText;
