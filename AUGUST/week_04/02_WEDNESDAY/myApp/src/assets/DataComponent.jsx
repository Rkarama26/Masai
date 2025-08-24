import React, { useContext } from 'react';
import { DataContext } from './DataProvider';
import { Box, Button, Flex } from '@chakra-ui/react';


const DataComponent = () => {
    const { state, fetchData } = useContext(DataContext);

    return (
        <div>
            <Button
                onClick={fetchData}
            >FetchData</Button>
            {state.loading && <p>loading...</p>}

            <Flex align="center">
                <Box p="4" bg="gray.200">Box 1</Box>
                <Box p="4" color="white">Box 2</Box>
            </Flex>




        </div>
    );
}

export default DataComponent;
