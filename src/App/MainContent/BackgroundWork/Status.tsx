import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

import { STATUS } from '~/constants/status';
import useAppState from '~/context/app-state/useAppState';

function Status() {
  const { status } = useAppState();

  return (
    <Box sx={{ mb: 1 }}>
      <Chip
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {status === STATUS.InProgress && (
              <CircularProgress size={16} color="inherit" />
            )}
            {status}
          </Box>
        }
        color={status === STATUS.InProgress ? 'warning' : 'default'}
        variant="filled"
        sx={{ width: '100%' }}
      />
    </Box>
  );
}

export default Status;
