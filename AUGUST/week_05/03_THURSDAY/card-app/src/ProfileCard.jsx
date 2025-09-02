import { Avatar, Box, Button, Circle, HStack, Float, Tag, Text } from '@chakra-ui/react';
import React from 'react';

const data = {
  name: "Lindsey James",
  username: "@lindsey_jam3s",
  avatar:
    "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.0&auto=format&fit=crop&w=200&q=80",
  bio: "Actress, musician, songwriter and artist. DM for work inquires or",
  link: "#tag",
  tags: ["#ART", "#PHOTOGRAPHY", "#MUSIC"],
};

const ProfileCard = () => {
  return (
    <Box
      spaceY="8"
      maxW="sm"
      w="full"
      bg="white"
      boxShadow="lg"
      rounded="2xl"
      p={6}
      textAlign="center"
      _dark={{ bg: "gray.800" }}
      position="relative"
      top={40}
      m="auto"

    >
      <Avatar.Root size="2xl" colorPalette="green" variant="subtle">
        <Avatar.Image src={data.avatar} />
        <Float placement="bottom-end" offsetX="2" offsetY="2">
          <Circle
            bg="green.500"
            size="10px"
            outline="0.2em solid"
            outlineColor="bg"
          />
        </Float>
      </Avatar.Root>

      <Box >
        <Text
          color="black"
          fontSize="2xl"
          fontWeight="bold"
        >
          {data.name}
        </Text>
        <Text
          color="gray.400"
          fontSize="md"
          fontWeight="bold"
        >
          {data.username}
        </Text>
      </Box>

      <Text mt={10}
        fontSize="sm"
        color="gray.500"
        px={4}
        mb={4}
      >
        {data.bio}
        <Text as="span"
          color="blue.400"
          fontWeight="semibold">
          #tag
        </Text>{" "}
        me in your posts
      </Text>

      <HStack
        spacing={3}
        justify="center"
        mb={4}>
        <Tag.Root
          borderWidth="1px"
          borderColor="gray.100"
          rounded="lg"
          bg="gray.50"
        >#ART</Tag.Root>

        <Tag.Root
          borderWidth="1px"
          borderColor="gray.100"
          rounded="lg"
          bg="gray.50"
        >#PHOTOTGRAPHY</Tag.Root>

        <Tag.Root
          borderWidth="1px"
          borderColor="gray.100"
          rounded="lg"
          bg="gray.50"
        >#MUSIC</Tag.Root>

      </HStack>

      <HStack
        justify="center"
        gap="10"
      >
        <Button
          bg="blue.600" variant="solid"
          _hover={{ bg: "white", transform: "scale(1.05)", color: "blue.600" }}
        >
          Message
        </Button>
        <Button bg="blue.600" variant="solid"
          _hover={{ bg: "white", transform: "scale(1.05)", color: "blue.600" }}
        >
          Follow
        </Button>
      </HStack>




    </Box>
  );
}

export default ProfileCard;
