import { Box, Grid } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContextProvider';

const MainContent = () => {
  const { theme } = useContext(ThemeContext);

  const cardBg = theme === 'light' ? 'gray.200' : 'gray.600';
  const textColor = theme === 'light' ? 'black' : 'white';

  const products = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
    'Product 5',
    'Product 6',
  ];

  return (
    <Box p="4" color={textColor}>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap="4">
        {products.map((product) => (
          <Box key={product} p="4" shadow="md" bg={cardBg} borderRadius="md">
            {product}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default MainContent;
