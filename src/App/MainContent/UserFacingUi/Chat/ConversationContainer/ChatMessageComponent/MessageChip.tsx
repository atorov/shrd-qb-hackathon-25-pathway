import Markdown from 'react-markdown';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import type { ChatMessage } from '~/types/chat';

type MessageChipProps = Pick<ChatMessage, 'parts' | 'type'>;

function MessageChip({ parts, type }: MessageChipProps) {
  const isAssistant = type === 'assistant';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        maxWidth: '480px',
      }}
    >
      {parts.map((part, index) => {
        if (part.type === 'image') {
          return (
            <Box
              key={index}
              sx={{
                borderRadius: '18px',
                overflow: 'hidden',
                p: 0.5,
              }}
            >
              <img
                src={`data:image/png;base64,${part.content}`}
                alt={part.alt || 'Shared image'}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '12px',
                  minHeight: '100px',
                  backgroundColor: '#f0f0f0',
                }}
              />
            </Box>
          );
        }

        return (
          <Chip
            key={index}
            label={<Markdown>{part.content}</Markdown>}
            sx={{
              bgcolor: !isAssistant ? 'primary.main' : 'grey.200',
              color: !isAssistant ? 'primary.contrastText' : 'text.primary',
              width: 'fit-content',
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
              },
            }}
          />
        );
      })}
    </Box>
  );
}
export default MessageChip;
