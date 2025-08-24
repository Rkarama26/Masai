import { Box, Grid } from '@chakra-ui/react';
import { useContext } from 'react';

import { ThemeContext } from './dashboardComponents/ThemeContextProvider';
import Navbar from './dashboardComponents/Navbar';
import Sidebar from './dashboardComponents/Sidebar';
import MainContent from './dashboardComponents/MainContent';
import Footer from './dashboardComponents/Footer';
import { useMediaQuery } from '@chakra-ui/react';


function App() {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const { theme } = useContext(ThemeContext);

  // Dynamic colors based on theme
  const appBg = theme === 'light' ? 'gray.50' : 'gray.900';
  const cardBg = theme === 'light' ? 'gray.200' : 'gray.600';
  const footerBg = theme === 'light' ? 'gray.300' : 'gray.700';
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    <Box bg={appBg} color={textColor} minH="100vh">
      <Navbar />

      <Box display="flex" flex="1">
        {isLargerThan768 && <Sidebar />}
        <Box flex="1">
          <MainContent />
        </Box>
      </Box>


      <Footer />


    </Box>
  );
}

export default App;
