import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import useAppState from '~/context/app-state/useAppState';

function SelectFlow() {
  const { flowsInfo, handleReset, setCurrentFlowId } = useAppState();
  const [hoveredFlowId, setHoveredFlowId] = useState<string | undefined>();

  if (!flowsInfo) return null;

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ maxWidth: 840, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Select a flow to begin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose one of the available flows below (or use the dropdown in the
            top bar). Once selected, the assistant will automatically load the
            first step and send the opening message.
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ width: '100%', mt: 1, justifyContent: 'center' }}
        >
          {flowsInfo.map(flow => {
            const hasImage = !!flow.diagramDataUrl;
            const isHovered = hoveredFlowId === flow.identifier;

            return (
              <Grid
                key={flow.identifier}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex' }}
              >
                <Card
                  elevation={3}
                  onMouseEnter={() => setHoveredFlowId(flow.identifier)}
                  onMouseLeave={() =>
                    setHoveredFlowId(id =>
                      id === flow.identifier ? undefined : id
                    )
                  }
                  sx={theme => ({
                    height: '100%',
                    border: '2px solid transparent',
                    transition:
                      'border-color 260ms ease, box-shadow 260ms ease, transform 320ms cubic-bezier(0.4,0,0.2,1)',
                    borderColor: isHovered
                      ? theme.palette.primary.main
                      : 'transparent',
                    boxShadow: isHovered ? theme.shadows[6] : theme.shadows[1],
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                    '@media (prefers-reduced-motion: reduce)': {
                      transition: 'none',
                      transform: 'none',
                    },
                  })}
                >
                  <CardActionArea
                    sx={theme => ({
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      '& .flow-base': {
                        transition: 'opacity 320ms ease',
                        opacity: isHovered ? 0 : 1,
                      },
                      '& .flow-overlay': {
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: theme.palette.background.paper,
                        padding: theme.spacing(1.5, 1.5, 2),
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? 'translateY(0)'
                          : 'translateY(8px)',
                        transition:
                          'opacity 420ms ease, transform 460ms cubic-bezier(0.4,0,0.2,1)',
                        overflow: 'hidden',
                        pointerEvents: isHovered ? 'auto' : 'none',
                        zIndex: 2,
                      },
                      '& .flow-overlay-content': {
                        overflowY: 'auto',
                        WebkitOverflowScrolling: 'touch',
                      },
                      '&:focus-within .flow-overlay': {
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                      },
                      '&:focus-within .flow-base': {
                        opacity: 0,
                      },
                      '@media (prefers-reduced-motion: reduce)': {
                        '& .flow-base': { transition: 'none' },
                        '& .flow-overlay': {
                          transition: 'none',
                          transform: 'none',
                        },
                      },
                    })}
                    onClick={() => {
                      handleReset();
                      setCurrentFlowId(flow.identifier);
                    }}
                  >
                    <Box className="flow-base" sx={{ display: 'contents' }}>
                      {hasImage ? (
                        <CardMedia
                          component="img"
                          image={flow.diagramDataUrl!}
                          alt={flow.identifier}
                          sx={{
                            aspectRatio: '3 / 4',
                            objectFit: 'contain',
                            width: '100%',
                            borderBottom: theme =>
                              `1px solid ${theme.palette.divider}`,
                            backgroundColor: 'background.default',
                            p: 1,
                          }}
                        />
                      ) : (
                        <Box
                          sx={theme => ({
                            aspectRatio: '3 / 4',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            background: theme.palette.action.hover,
                            color: theme.palette.text.disabled,
                            fontSize: 12,
                            letterSpacing: 0.5,
                            p: 1,
                          })}
                        >
                          No Diagram
                        </Box>
                      )}
                      <CardContent sx={{ width: '100%' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                          noWrap
                        >
                          {flow.identifier}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            cursor: 'default',
                          }}
                        >
                          {flow.description || '—'}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box className="flow-overlay" tabIndex={0}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {flow.identifier}
                      </Typography>
                      <Box
                        className="flow-overlay-content"
                        sx={{ fontSize: 11, lineHeight: 1.4, pr: 0.5 }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{ whiteSpace: 'pre-wrap' }}
                        >
                          {flow.description || '—'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}

          {!flowsInfo.length ? (
            <Grid size={12} sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No flows available.
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Box>
  );
}

export default SelectFlow;
