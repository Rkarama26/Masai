import { Flex, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './AuthContextProvider';
import { ThemeContext } from './ThemeContextProvider';


const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const textColor = theme === 'light' ? 'black' : 'white';
  const buttonColor = isLoggedIn ? 'green.400' : 'red.400';
  const navBg = theme === 'light' ? 'gray.100' : 'gray.700';

  return (
    <Flex
      as="nav"
      p="4"
      bg={navBg}
      color={textColor}
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Login  */}
      <Button
        onClick={toggleAuth}
        bg={buttonColor}
        color="white"
        _hover={{ bg: isLoggedIn ? 'green.500' : 'red.500' }}
      >
        {isLoggedIn ? 'Logged In' : 'Logged Out'}
      </Button>

      {/* Theme  */}
      <Button
        onClick={toggleTheme}
        bg={theme === 'light' ? 'purple.400' : 'yellow.400'}
        color="white"
        _hover={{ bg: theme === 'light' ? 'purple.500' : 'yellow.500' }}
      >
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </Flex>
  );
};

export default Navbar;
