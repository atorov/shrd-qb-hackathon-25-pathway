import Box from '@mui/material/Box';

import CustomAppBar from './CustomAppBar';
import MainContent from './MainContent/MainContent';

function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomAppBar />
      <MainContent />
    </Box>
  );
}

export default App;
