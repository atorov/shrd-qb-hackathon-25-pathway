import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { SESSIONS_IDENTIFIER_ID } from '~/constants/quickbase';

import useAppState from '~/context/app-state/useAppState';

function SessionAndStep() {
  const { currentStep, session } = useAppState();

  const currentStepId = currentStep?.id;
  const sessionId = String(session?.[SESSIONS_IDENTIFIER_ID]?.value);

  return currentStepId ? (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {sessionId}
      </Typography>
      <Typography variant="body1">{currentStepId}</Typography>
    </Box>
  ) : null;
}

export default SessionAndStep;
