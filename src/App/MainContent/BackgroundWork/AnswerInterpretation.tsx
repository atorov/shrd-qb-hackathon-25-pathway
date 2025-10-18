import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import useAppState from '~/context/app-state/useAppState';

import getConfidenceColor from './get-confidence-color';

export default function AnswerInterpretation() {
  const { answerInterpretation } = useAppState();

  return answerInterpretation.answer ? (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        Answer Interpretation
      </Typography>
      <Chip
        label={answerInterpretation.answer}
        variant="filled"
        color={getConfidenceColor(answerInterpretation.confidence)}
        sx={{
          mb: 1,
          width: '100%',
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
            padding: '8px 16px',
          },
        }}
      />
    </Box>
  ) : null;
}
