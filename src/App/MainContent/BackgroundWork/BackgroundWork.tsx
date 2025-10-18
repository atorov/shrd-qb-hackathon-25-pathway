import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import AnswerInterpretation from './AnswerInterpretation';
import Confidence from './Confidence';
import ConversationContext from './ConversationContext';
import FinalInternalSummary from './FinalInternalSummary';
import SessionAndStep from './SessionAndStep';
import Status from './Status';
import ToolsUsed from './ToolsUsed';
import UserSentiment from './UserSentiment/UserSentiment';

function BackgroundWork() {
  return (
    <Grid
      size={4}
      sx={{
        flex: 1,
        overflow: 'auto',
        maxHeight: 'calc(100vh - 100px)',
        padding: 2,
      }}
    >
      <SessionAndStep />
      <Status />
      <Divider sx={{ my: 1 }} />
      <FinalInternalSummary />
      <UserSentiment />
      <Divider sx={{ my: 1 }} />
      <ConversationContext />
      <AnswerInterpretation />
      <Confidence />
      <Divider sx={{ my: 1 }} />
      <ToolsUsed />
    </Grid>
  );
}

export default BackgroundWork;
