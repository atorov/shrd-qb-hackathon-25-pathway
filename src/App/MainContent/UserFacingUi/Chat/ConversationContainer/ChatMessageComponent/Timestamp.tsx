import Typography from '@mui/material/Typography';

type TimestampProps = {
  timestamp: number;
};

function Timestamp({ timestamp }: TimestampProps) {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Typography
      variant="caption"
      sx={{
        mt: 0.5,
        color: 'text.secondary',
      }}
    >
      {time}
    </Typography>
  );
}

export default Timestamp;
