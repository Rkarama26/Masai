import { Box, Text, Button, Flex, useMediaQuery } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContextProvider';
import { ThemeContext } from './ThemeContextProvider';


const Sidebar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarBg = theme === 'light' ? 'gray.100' : 'gray.700';
  const textColor = theme === 'light' ? 'black' : 'white';

  // Toggle collapse
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  if (!isLargerThan768) return null; // hide sidebar on small screens

  return (
    <Box
      w={isCollapsed ? '60px' : '200px'}
      h="100vh"
      bg={sidebarBg}
      color={textColor}
      p="4"
      transition="width 0.3s"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        {!isCollapsed && <Text fontSize="lg" fontWeight="bold">Sidebar</Text>}
        <Button size="sm" onClick={toggleCollapse}>
          {isCollapsed ? '>' : '<'}
        </Button>
      </Flex>

      {isLoggedIn && !isCollapsed && (
        <Text mb="4">Welcome back, User!</Text>
      )}

      {!isCollapsed && (
        <Box>
          <Text mb="2">Menu Item 1</Text>
          <Text mb="2">Menu Item 2</Text>
          <Text mb="2">Menu Item 3</Text>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
