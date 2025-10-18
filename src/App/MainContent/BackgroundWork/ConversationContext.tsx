import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useAppState from '~/context/app-state/useAppState';

function ConversationContext() {
  const { conversationContext } = useAppState();

  const conversationScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll conversation context
  useEffect(() => {
    if (conversationScrollRef.current && conversationContext) {
      const container = conversationScrollRef.current;
      const startPosition = container.scrollTop;
      const targetPosition = container.scrollHeight - container.clientHeight;
      const distance = targetPosition - startPosition;
      const duration = 600;
      const startTime = performance.now();
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = (t: number) =>
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        container.scrollTop = startPosition + distance * ease(progress);
        if (progress < 1) requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    }
  }, [conversationContext]);

  return conversationContext ? (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        Conversation Context
      </Typography>
      <Box
        ref={conversationScrollRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          maxHeight: '160px',
          overflow: 'auto',
        }}
      >
        {conversationContext
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map((line, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{ p: 0.5, bgcolor: 'grey.50', lineHeight: 1 }}
            >
              <Typography
                variant="caption"
                sx={{ lineHeight: 1, fontSize: '0.75rem' }}
              >
                {line}
              </Typography>
            </Paper>
          ))}
      </Box>
    </Box>
  ) : null;
}

export default ConversationContext;
