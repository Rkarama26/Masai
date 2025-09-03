import React, { useState } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import {
    Box,
    Flex,
    HStack,
    Link,
    Input,
    InputGroup,
    IconButton,
    Avatar,
    Text,
} from "@chakra-ui/react";

const NavBar = () => {
    const links = ["Dashboard", "Report", "Analytic", "Schedule", "Tracker", "My Task"];
    const [activeLink, setactiveLink] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <>
            <Box position="sticky"
                w={["90%"]}
                margin="auto"
                bg="rgb(234, 239, 243)"
                px={[3, 4, 5]}  // responsive padding
                py={[1, 2]}     // responsive padding
                rounded="50px"
                borderWidth="1px"
                borderColor="white"
                boxShadow="sm"
                mt={8}
            >

                <Flex alignItems="center"
                    justifyContent="space-between"
                >
                    <Box fontWeight="bold" fontSize="2xl" color="#281e51">
                        Tasklyn
                    </Box>

                    {/* Navigation Links - show only on md+ */}
                    <HStack
                        spacing={6}
                        display={["none", "none", "flex"]} // hidden on base & sm, visible md+
                    >
                        {links.map((link) => (
                            <Link
                                key={link}
                                px={4}
                                py={3}
                                borderRadius="50px"
                                bg={activeLink === link ? "#281e51" : "transparent"}
                                color={activeLink === link ? "white" : "black"}
                                onClick={() => setactiveLink(link)}
                                _hover={{ textDecoration: "none", bg: activeLink === link ? "#281e51" : "gray.200" }}
                            >
                                {link}
                            </Link>
                        ))}
                    </HStack>

                    {/* Right section */}
                    <HStack spacing={2}>
                        {/* Collapsible Search */}
                        {isOpen ? (
                            <InputGroup
                                w={["150px", "180px", "200px"]} // responsive width
                                transition="width 0.3s ease"
                            >
                                <Input
                                    placeholder="Search..."
                                    size="sm"
                                    bg="white"
                                    borderRadius="full"
                                    autoFocus
                                    onBlur={() => setIsOpen(false)}
                                    pr="35px"
                                />
                            </InputGroup>
                        ) : (
                            <IconButton aria-label="Search database"
                                bg="transparent"
                                color="black"
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsOpen(true)}
                            >
                                <CiSearch />
                            </IconButton>
                        )}

                        {/* Notification */}
                        <IconButton
                            aria-label="Notifications"
                            bg="transparent"
                            color="black"
                            size="sm"
                            variant="ghost"
                        >
                            <CiBellOn />
                        </IconButton>

                        {/* User profile */}
                        <Flex alignItems="center" gap={2} position="relative">
                            <Avatar.Root
                                size="sm"
                                name="Angie D"
                                src="https://bit.ly/broken-link"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                cursor="pointer"
                            />
                            <Box display={["none", "none", "block"]}>
                                <Text fontSize="sm" fontWeight="bold">Angie D</Text>
                                <Text fontSize="xs" color="gray.500">angied@gmail.com</Text>
                            </Box>

                            {/* Dropdown for small screens */}
                            {isMenuOpen && (
                                <Box
                                    position="absolute"
                                    top="50px"
                                    right="0"
                                    bg="white"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    shadow="md"
                                    display={["block", "block", "none"]} // only on small screens
                                    zIndex={10}
                                >
                                    {links.map((link) => (
                                        <Box
                                            key={link}
                                            px={4}
                                            py={2}
                                            _hover={{ bg: "#281e51", cursor: "pointer" }}
                                            onClick={() => {
                                                setactiveLink(link);
                                                setIsMenuOpen(false);

                                            }}
                                            onBlur={() => setIsMenuOpen(false)}
                                        >
                                            {link}
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Flex>
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}

export default NavBar;
