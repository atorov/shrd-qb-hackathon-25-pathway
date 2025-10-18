import Markdown from 'react-markdown';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import useAppState from '~/context/app-state/useAppState';

function FinalInternalSummary() {
  const { finalInternalSummary } = useAppState();

  return finalInternalSummary ? (
    <>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Final Internal Summary
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Box sx={{ fontSize: '0.75rem', '& *': { fontSize: 'inherit' } }}>
            <Markdown>{finalInternalSummary}</Markdown>
          </Box>
        </Paper>
      </Box>
      <Divider sx={{ my: 1 }} />
    </>
  ) : null;
}

export default FinalInternalSummary;
