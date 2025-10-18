import Box from '@mui/material/Box';

import type { ChatMessage } from '~/types/chat';

import MessageAvatar from './MessageAvatar';
import MessageChip from './MessageChip';
import Timestamp from './Timestamp';

type ChatMessageComponentProps = ChatMessage;

function ChatMessageComponent({
  parts,
  timestamp,
  type,
}: ChatMessageComponentProps) {
  const isAssistant = type === 'assistant';

  const avatarText = isAssistant ? 'AI' : 'C';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        justifyContent: isAssistant ? 'flex-start' : 'flex-end',
      }}
    >
      {isAssistant ? (
        <MessageAvatar avatarText={avatarText} type={type} />
      ) : null}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <MessageChip parts={parts} type={type} />
        <Timestamp timestamp={timestamp} />
      </Box>

      {!isAssistant ? (
        <MessageAvatar avatarText={avatarText} type={type} />
      ) : null}
    </Box>
  );
}

export default ChatMessageComponent;
