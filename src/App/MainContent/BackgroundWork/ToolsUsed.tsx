import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import useAppState from '~/context/app-state/useAppState';

function ToolsUsed() {
  const { toolsUsed } = useAppState();

  return toolsUsed && toolsUsed.length > 0 ? (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        Tools Used
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {toolsUsed.map((tool, index) => (
          <Paper
            key={`${tool.name}-${index}`}
            variant="outlined"
            sx={{ p: 0.5, bgcolor: '#e3f2fd', lineHeight: 1 }}
          >
            <Typography
              variant="caption"
              sx={{
                lineHeight: 1,
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: '#1976d2',
              }}
            >
              {tool.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                fontSize: '0.7rem',
                lineHeight: 1.2,
                mt: 0.25,
              }}
            >
              {tool.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  ) : null;
}

export default ToolsUsed;
