import { useEffect, useRef } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import useAppState from '~/context/app-state/useAppState';
import type { ChatMessage } from '~/types/chat';

import ChatMessageComponent from './ChatMessageComponent/ChatMessageComponent';

function ConversationContainer() {
  const { chatMessages, isFinalStep } = useAppState();

  const scrollRef = useRef<HTMLDivElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const isFullHeight = isFinalStep;

  useEffect(() => {
    if (scrollRef.current && bottomRef.current) {
      const container = scrollRef.current;

      // Get current scroll position and target position
      const startPosition = container.scrollTop;
      const targetPosition = container.scrollHeight - container.clientHeight;
      const distance = targetPosition - startPosition;

      // Animation duration
      const duration = 2000;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        const easedProgress = easeInOutCubic(progress);
        container.scrollTop = startPosition + distance * easedProgress;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, [chatMessages]);

  return (
    <Paper
      ref={scrollRef}
      sx={{
        flex: 1,
        p: 2,
        overflow: 'auto',
        maxHeight: isFullHeight ? 'calc(100vh - 100px)' : 'calc(100vh - 320px)',
      }}
    >
      <Stack spacing={2}>
        {chatMessages.map((message: ChatMessage, index) => (
          <ChatMessageComponent
            key={index}
            parts={message.parts}
            timestamp={message.timestamp}
            type={message.type}
          />
        ))}
        <div ref={bottomRef} />
      </Stack>
    </Paper>
  );
}

export default ConversationContainer;
