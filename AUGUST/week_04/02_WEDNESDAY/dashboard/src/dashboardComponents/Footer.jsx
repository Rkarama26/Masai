import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContextProvider';

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    const footerBg = theme === 'light' ? 'gray.300' : 'gray.700';
    const textColor = theme === 'light' ? 'black' : 'white';

    return (
        <Box
            as="footer"
            p="4"
            bg={footerBg}
            color={textColor}
            position="fixed"   
            bottom="0"
            width="100%"
            textAlign="center"
            zIndex="1000"     
        >
             2025  Company. All rights reserved.
        </Box>
    );

};

export default Footer;
