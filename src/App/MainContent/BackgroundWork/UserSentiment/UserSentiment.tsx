import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import useAppState from '~/context/app-state/useAppState';

import getSentimentColor from './get-sentiment-color';
import SentimentChart from './SentimentChart';

function UserSentiment() {
  const { conversationContext, userSentiment } = useAppState();

  return conversationContext ? (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        User Sentiment
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <LinearProgress
          variant="determinate"
          value={((userSentiment - 1) / 4) * 100}
          color={getSentimentColor(userSentiment)}
          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
        />
        <Chip
          label={userSentiment.toFixed(1)}
          size="small"
          color={getSentimentColor(userSentiment)}
        />
      </Box>
      <SentimentChart />
    </Box>
  ) : null;
}

export default UserSentiment;
