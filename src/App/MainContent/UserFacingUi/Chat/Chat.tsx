import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { STATUS } from '~/constants/status';
import useAppState from '~/context/app-state/useAppState';

import type AiUser from '../../AiUser';
import { AI_USER_THINKING_STATUSES } from '../../constants';
import ConversationContainer from './ConversationContainer/ConversationContainer';
import OptionsAndStatusBar from './OptionsAndStatusBar';

type ReplyProps = {
  aiUser: AiUser;
  submitChatMessage: () => void;
};

function Reply({ aiUser, submitChatMessage }: ReplyProps) {
  const { isFinalStep, setUserQuery, status, userQuery } = useAppState();

  return (
    <Grid size={8} sx={{ display: 'flex', p: 0.5 }}>
      <Stack spacing={1} sx={{ flex: 1 }}>
        <ConversationContainer />

        {!isFinalStep ? (
          <>
            <OptionsAndStatusBar />

            <TextField
              fullWidth
              disabled={
                status !== STATUS.Idle ||
                aiUser.status === AI_USER_THINKING_STATUSES.Thinking
              }
              label="Reply"
              multiline
              rows={4}
              value={userQuery}
              variant="filled"
              slotProps={{ input: { className: 'typewriter__input' } }}
              onChange={event => {
                setUserQuery(event.currentTarget.value);
              }}
              onKeyDown={event => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  if (userQuery.trim()) submitChatMessage();
                }
              }}
            />
            <Button
              disabled={
                status !== STATUS.Idle ||
                !userQuery.trim() ||
                aiUser.status === AI_USER_THINKING_STATUSES.Thinking
              }
              variant="contained"
              onClick={submitChatMessage}
            >
              Send
            </Button>
          </>
        ) : null}
      </Stack>
    </Grid>
  );
}

export default Reply;
