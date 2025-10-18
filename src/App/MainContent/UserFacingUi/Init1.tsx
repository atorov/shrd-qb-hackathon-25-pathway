import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Init1() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        position: 'relative',
        overflow: 'hidden',
        '::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Stack spacing={3} alignItems="center" sx={{ position: 'relative' }}>
        <Stack spacing={1} alignItems="center" sx={{ maxWidth: 520 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.5,
              background: '#90caf9',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Initializing AI Workspace
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.75,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Loading tools, conversational flows & session context. This only
            happens once per session.
          </Typography>
        </Stack>
        <Box sx={{ width: 260 }}>
          <LinearProgress
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.15)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg,#42a5f5,#90caf9)',
              },
            }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{ opacity: 0.5, letterSpacing: 1, fontSize: 11 }}
        >
          This may take some time depending on your network speed and AI
          processing capabilities.
        </Typography>
      </Stack>
    </Box>
  );
}

export default Init1;
