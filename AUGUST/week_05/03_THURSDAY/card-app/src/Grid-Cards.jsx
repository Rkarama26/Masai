import { Avatar, Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const GridCards = () => {
    return (

        <Box>

            <Text mt={5} fontSize="4xl" fontWeight="bold" color="gray.900" textAlign="center">Our Clients Speak</Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.500" textAlign="center">We have been working with clients around the world</Text>

            <Grid
                templateColumns={{ base: "1fr", md: "1fr", lg: "repeat(3, 1fr)" }}
                mt={20}
                color="gray.500"
                gap={6}
                width="70%"
                m="auto"
                position="relative"
                top="10"

            >
                {/* Testimonial Card */}
                <Box>
                    <Box
                        bg="white"
                        shadow="md"
                        rounded="xl"
                        p={6}
                        textAlign="center"
                        position="relative"
                    >
                        <Text fontWeight="bold" fontSize="lg" mb={2} color="gray.800">
                            Efficient Collaborating
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                            neque sed imperdiet nibh lectus feugiat nunc sem.
                        </Text>

                        {/* Triangle pointer */}
                        <Box
                            position="absolute"
                            bottom="-10px"
                            left="50%"
                            transform="translateX(-50%)"
                            width="0"
                            height="0"
                            borderLeft="10px solid transparent"
                            borderRight="10px solid transparent"
                            borderTop="10px solid white"
                        />
                    </Box>

                    <VStack mt={3} spacing={1}>
                        <Avatar.Root size="lg" name="Jane Cooper" >
                            <Avatar.Image src="https://avatar.iran.liara.run/public" />
                        </Avatar.Root>
                        <Text fontWeight="bold" color="gray.800">
                            Jane Cooper
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            CEO at ABC Corporation
                        </Text>
                    </VStack>
                </Box>
                <Box>
                    <Box
                        bg="white"
                        shadow="md"
                        rounded="xl"
                        p={6}
                        textAlign="center"
                        position="relative"
                    >
                        <Text fontWeight="bold" fontSize="lg" mb={2} color="gray.800">
                            Efficient Collaborating
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                            neque sed imperdiet nibh lectus feugiat nunc sem.
                        </Text>

                        <Box
                            position="absolute"
                            bottom="-10px"
                            left="50%"
                            transform="translateX(-50%)"
                            width="0"
                            height="0"
                            borderLeft="10px solid transparent"
                            borderRight="10px solid transparent"
                            borderTop="10px solid white"
                        />
                    </Box>

                    <VStack mt={3} spacing={1}>
                        <Avatar.Root size="lg" name="Jane Cooper" >
                            <Avatar.Image src="https://avatar.iran.liara.run/public" />
                        </Avatar.Root>                    <Text fontWeight="bold" color="gray.800">
                            Jane Cooper
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            CEO at ABC Corporation
                        </Text>
                    </VStack>
                </Box>
                <Box>
                    <Box
                        bg="white"
                        shadow="md"
                        rounded="xl"
                        p={6}
                        textAlign="center"
                        position="relative"
                    >
                        <Text fontWeight="bold" fontSize="lg" mb={2} color="gray.800">
                            Efficient Collaborating
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                            neque sed imperdiet nibh lectus feugiat nunc sem.
                        </Text>

                        {/* Triangle pointer */}
                        <Box
                            position="absolute"
                            bottom="-10px"
                            left="50%"
                            transform="translateX(-50%)"
                            width="0"
                            height="0"
                            borderLeft="10px solid transparent"
                            borderRight="10px solid transparent"
                            borderTop="10px solid white"
                        />
                    </Box>

                    <VStack mt={3} spacing={1}>
                        <Avatar.Root size="lg" name="Jane Cooper" >
                            <Avatar.Image src="https://avatar.iran.liara.run/public" />
                        </Avatar.Root>                    <Text fontWeight="bold" color="gray.800">
                            Jane Cooper
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            CEO at ABC Corporation
                        </Text>
                    </VStack>
                </Box>
            </Grid>
        </Box>

    );
}

export default GridCards;
