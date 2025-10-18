import { useCallback } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { STATUS } from '~/constants/status';
import useAppState from '~/context/app-state/useAppState';

import AiUser from './AiUser';
import BackgroundWork from './BackgroundWork/BackgroundWork';
import useAutopilot from './use-autopilot';
import Chat from './UserFacingUi/Chat/Chat';
import Init1 from './UserFacingUi/Init1';
import SelectFlow from './UserFacingUi/SelectFlow';

const aiUser = new AiUser();

function MainContent() {
  const {
    addNewUserChatMessage,
    currentFlowId,
    setUserQuery,
    status,
    userQuery,
  } = useAppState();

  const submitChatMessage = useCallback(() => {
    addNewUserChatMessage({
      parts: [
        {
          type: 'text',
          content: userQuery.trim(),
        },
      ],
      timestamp: Date.now(),
      type: 'user',
    });
    setUserQuery('');
  }, [addNewUserChatMessage, setUserQuery, userQuery]);

  useAutopilot(submitChatMessage);

  if (status === STATUS.Init1) return <Init1 />;

  if (status === STATUS.Idle && !currentFlowId) return <SelectFlow />;

  if (
    (status === STATUS.Init2 ||
      status === STATUS.Idle ||
      status === STATUS.InProgress) &&
    currentFlowId
  ) {
    return (
      <Container sx={{ py: 0, display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Grid container spacing={1} sx={{ flex: 1, overflow: 'hidden' }}>
          <BackgroundWork />
          <Chat aiUser={aiUser} submitChatMessage={submitChatMessage} />
        </Grid>
      </Container>
    );
  }

  return null;
}

export default MainContent;
