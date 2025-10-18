import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { STATUS } from '~/constants/status';
import useAppState from '~/context/app-state/useAppState';
import type { Flows } from '~/types/flow';

const STATUS_MODE: Record<
  string,
  {
    label: string;
    color: 'default' | 'info' | 'success' | 'warning' | 'error';
    pulse?: boolean;
  }
> = {
  [STATUS.Idle]: { label: 'Idle', color: 'info' },
  [STATUS.Init1]: {
    label: 'Initializing',
    color: 'warning',
    pulse: true,
  },
  [STATUS.Init2]: {
    label: 'Preparing',
    color: 'warning',
    pulse: true,
  },
  [STATUS.InProgress]: { label: 'Working', color: 'info', pulse: true },
};

function CustomAppBar() {
  const {
    currentFlowId,
    flows,
    flowsInfo,
    handleReset,
    setCurrentFlowId,
    status,
  } = useAppState();
  const theme = useTheme();

  const flowIds: string[] = flows ? Object.keys(flows as Flows) : [];

  const meta = STATUS_MODE[status] ?? { label: status, color: 'default' };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(120deg, ${alpha(theme.palette.primary.dark, 0.85)} 0%, ${alpha(
          theme.palette.primary.main,
          0.85
        )} 35%, ${alpha(theme.palette.primary.light, 0.85)} 100%)`,
        backdropFilter: 'blur(10px) saturate(160%)',
        borderBottom: `1px solid ${alpha(theme.palette.primary.light, 0.3)}`,
        boxShadow: `0 2px 12px -2px ${alpha(theme.palette.common.black, 0.4)}`,
      }}
    >
      <Container disableGutters sx={{ px: 2 }}>
        <Toolbar variant="dense" sx={{ gap: 2, minHeight: 56 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flexGrow: 1, minWidth: 0 }}
          >
            <Avatar
              variant="rounded"
              src="/favicon.png"
              alt="Qb 25"
              sx={{
                width: 36,
                height: 36,
                fontSize: 0,
                bgcolor: theme.palette.secondary.main, // fallback bg if image fails
                img: {
                  objectFit: 'contain',
                  padding: 0,
                },
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  lineHeight: 1.15,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  background: 'linear-gradient(90deg,#fff,#e0f2ff)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                AI-Powered Conversational Flows
              </Typography>
              <Fade in timeout={1600}>
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.85,
                    letterSpacing: 0.5,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Quickbase Hackathon
                  2025&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Team Pathway
                </Typography>
              </Fade>
            </Box>
          </Stack>

          {flowIds.length ? (
            currentFlowId ? (
              <Box
                sx={{
                  minWidth: 230,
                  maxWidth: 600,
                  display: 'flex',
                  alignItems: 'center',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1,
                }}
              >
                <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: 'uppercase',
                      fontSize: 10,
                      letterSpacing: 1,
                      opacity: 0.7,
                      lineHeight: 1,
                    }}
                  >
                    Flow
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.1,
                      maxWidth: 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={currentFlowId}
                  >
                    {flowsInfo?.find(f => f.identifier === currentFlowId)
                      ?.identifier || currentFlowId}
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Box sx={{ minWidth: 240, width: 360, maxWidth: 720 }}>
                <Autocomplete
                  size="small"
                  disableClearable
                  blurOnSelect
                  fullWidth
                  options={flowIds}
                  value={currentFlowId ?? ''}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={currentFlowId ? 'Flow' : 'Select Flow'}
                      placeholder="Search flows..."
                      variant="outlined"
                    />
                  )}
                  sx={{
                    '& .MuiInputBase-root': {
                      backdropFilter: 'blur(6px)',
                    },
                  }}
                  onChange={(_, value) => {
                    handleReset();
                    setCurrentFlowId(value || null);
                  }}
                />
              </Box>
            )
          ) : null}

          {currentFlowId ? (
            <Button
              color="error"
              variant="contained"
              size="small"
              startIcon={<RestartAltIcon fontSize="small" />}
              disabled={status !== STATUS.Idle}
              sx={{
                ml: 1,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px -2px rgba(0,0,0,.4)',
                transition: 'all .25s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px -2px rgba(0,0,0,.55)',
                },
                '&:disabled': {
                  opacity: 0.55,
                  transform: 'none',
                  boxShadow: 'none',
                },
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          ) : null}

          <Grow in timeout={1600}>
            <Chip
              label={meta.label}
              color={meta.color}
              size="small"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                ...(meta.pulse && {
                  animation: 'pulse 2.2s ease-in-out infinite',
                }),
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: `0 0 0 0 ${alpha(theme.palette.info.main, 0.75)}`,
                  },
                  '70%': {
                    boxShadow: `0 0 0 16px ${alpha(theme.palette.info.main, 0)}`,
                  },
                  '100%': {
                    boxShadow: `0 0 0 0 ${alpha(theme.palette.info.main, 0)}`,
                  },
                },
              }}
            />
          </Grow>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;
