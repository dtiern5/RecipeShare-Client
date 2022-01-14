import { Box, Button, Heading, Spacer, useColorMode } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';


export default () => {
    const colorMode = useColorMode();
    
    return (
        <Box p={4} shadow="md" d='flex'>
            <Heading ml={2}>Cook Share</Heading>
            <Spacer />
            <Button leftIcon={colorMode == 'dark' ? <FiMoon/> : <FiSun/>} onClick={() => {
                if (colorMode.colorMode == 'dark') {
                    colorMode.setColorMode('light');
                } else {
                    colorMode.setColorMode('dark');
                }
            }}>Dark Mode</Button>
        </Box>
    );
};