import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import useAppState from '~/context/app-state/useAppState';

import getConfidenceColor from './get-confidence-color';

function Confidence() {
  const { answerInterpretation } = useAppState();

  return answerInterpretation.answer ? (
    <Box>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        Confidence:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <LinearProgress
          variant="determinate"
          value={answerInterpretation.confidence * 100}
          color={getConfidenceColor(answerInterpretation.confidence)}
          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
        />
        <Chip
          label={`${(answerInterpretation.confidence * 100).toFixed(1)}%`}
          size="small"
          color={getConfidenceColor(answerInterpretation.confidence)}
        />
      </Box>
    </Box>
  ) : null;
}

export default Confidence;
