import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useAppState from '~/context/app-state/useAppState';

import getSentimentColor from './get-sentiment-color';

function SentimentChart() {
  const { chatMessages, currentStep, userSentiment } = useAppState();

  const prevStepIdRef = useRef<string>('');

  const [sentimentHistory, setSentimentHistory] = useState<number[]>([]);

  useEffect(() => {
    if (
      currentStep?.id &&
      prevStepIdRef.current !== currentStep.id &&
      chatMessages.length &&
      chatMessages.at(-1)?.type === 'user' &&
      Number.isFinite(userSentiment)
    ) {
      prevStepIdRef.current = currentStep.id;
      setSentimentHistory(prev => [...prev, userSentiment]);
    }
  }, [chatMessages, currentStep?.id, userSentiment]);

  return sentimentHistory.length > 0 ? (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mb: 0.25 }}
      >
        User Sentiment History
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 120,
          position: 'relative',
          bgcolor: 'grey.100',
          borderRadius: 1,
          overflow: 'hidden',
          pt: 0.5,
        }}
      >
        {(() => {
          const pad = 4;
          const svgWidth = 100; // virtual width units
          const svgHeight = 40; // virtual height units
          const n = sentimentHistory.length;
          // Adaptive gap: shrink as bar count grows
          const gap = n <= 25 ? 2 : n <= 50 ? 1 : 0.5;
          const innerWidth = svgWidth - pad * 2;
          const totalGap = gap * (n - 1);
          const barWidth = n === 0 ? 0 : (innerWidth - totalGap) / n;
          const paletteMap: Record<string, string> = {
            success: '#2e7d32',
            info: '#0288d1',
            warning: '#ed6c02',
            error: '#d32f2f',
          };
          return (
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <line
                x1={0}
                x2={svgWidth}
                y1={svgHeight - pad}
                y2={svgHeight - pad}
                stroke="#e0e0e0"
                strokeWidth={1}
              />
              <line
                x1={0}
                x2={svgWidth}
                y1={pad}
                y2={pad}
                stroke="#e0e0e0"
                strokeWidth={1}
              />
              {sentimentHistory.map((s, i) => {
                const norm = (s - 1) / 4; // 0..1
                const barHeight = Math.max(1, norm * (svgHeight - pad * 2));
                const x = pad + i * (barWidth + gap);
                const y = svgHeight - pad - barHeight;
                const colorName = getSentimentColor(s);
                const baseColor = paletteMap[colorName] || '#1976d2';
                const opacity =
                  i === n - 1 ? 1 : 0.35 + (0.65 * i) / (n - 1 || 1);
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx={0.8}
                    fill={baseColor}
                    opacity={opacity}
                  />
                );
              })}
              {(() => {
                const last = sentimentHistory[sentimentHistory.length - 1];
                if (typeof last !== 'number') return null;
                const norm = (last - 1) / 4;
                const y = pad + (1 - norm) * (svgHeight - pad * 2);
                return (
                  <line
                    x1={0}
                    x2={svgWidth}
                    y1={y}
                    y2={y}
                    stroke="#424242"
                    strokeWidth={0.5}
                    strokeDasharray="2 2"
                  />
                );
              })()}
            </svg>
          );
        })()}
        <Box
          component="span"
          sx={{
            position: 'absolute',
            top: 2,
            right: 4,
            fontSize: '0.55rem',
            color: 'text.secondary',
          }}
        >
          1-5
        </Box>
      </Box>
    </Box>
  ) : null;
}

export default SentimentChart;
