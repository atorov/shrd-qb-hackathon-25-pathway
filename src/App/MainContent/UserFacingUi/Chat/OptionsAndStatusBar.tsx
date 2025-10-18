import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';

import { STATUS } from '~/constants/status';
import useAppState from '~/context/app-state/useAppState';

function OptionsAndStatusBar() {
  const { addNewUserChatMessage, currentStep, setUserQuery, status } =
    useAppState();

  const predefinedAnswers = currentStep?.predefinedAnswers;

  if (status !== STATUS.Idle)
    return (
      <ButtonGroup variant="contained" sx={{ alignSelf: 'center' }}>
        <Button disabled startIcon={<CircularProgress size={16} />}>
          Working ...
        </Button>
      </ButtonGroup>
    );

  return (
    <ButtonGroup variant="contained" sx={{ alignSelf: 'center' }}>
      {predefinedAnswers && predefinedAnswers.length > 0 ? (
        predefinedAnswers.map(answer => (
          <Button
            key={answer}
            onClick={() => {
              addNewUserChatMessage({
                parts: [
                  {
                    type: 'text',
                    content: answer,
                  },
                ],
                timestamp: Date.now(),
                type: 'user',
              });
              setUserQuery('');
            }}
          >
            {answer}
          </Button>
        ))
      ) : (
        <Button disabled>No predefined answers</Button>
      )}
    </ButtonGroup>
  );
}

export default OptionsAndStatusBar;
