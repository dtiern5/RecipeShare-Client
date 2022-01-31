import { Box, Button, Center, Heading, List, ListItem, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import { GrRestaurant } from "react-icons/gr";
import { GiKnifeFork } from "react-icons/gi";
import { useUser } from "./Auth/useUser";
import { useState } from "react";

const Sidebar = () => {
    const user = useUser();

    return (
        <Box pr={4}>
            <List>
                <ListItem>
                    <Link to={"/recipes"}>
                        <Box mt={2}
                            p={4}
                            d='flex'
                            alignItems='center'
                            borderRadius='lg'
                            bg={window.location.pathname == '/recipes'
                            ?  'blue.400'
                            :  null }
                            _hover={{
                                bg: useColorModeValue('blue.100', 'gray.900'),
                                cursor: 'pointer'
                            }}>
                            <Box mr={3}><GiKnifeFork /></Box>
                            <Heading size='md'>All Recipes</Heading>
                        </Box>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to={"/myrecipes"}>
                        <Box mt={2}
                            p={4}
                            d='flex'
                            alignItems='center'
                            borderRadius='lg'
                            bg={window.location.pathname == '/myrecipes'
                            ?  'blue.400'
                            :  null }
                            _hover={{
                                bg: useColorModeValue('blue.100', 'gray.900'),
                                cursor: 'pointer'
                            }}>
                            <Box mr={3}><GrRestaurant /></Box>
                            <Heading size='md'>My Recipes</Heading>
                        </Box>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to={"/profile"}>
                        <Box mt={2}
                            p={4}
                            d='flex'
                            alignItems='center'
                            borderRadius='lg'
                            bg={window.location.pathname == '/profile'
                            ?  'blue.400'
                            :  null }
                            _hover={{
                                bg: useColorModeValue('blue.100', 'gray.900'),
                                cursor: 'pointer'
                            }}>
                            <Box mr={3}><IoMdPerson /></Box>
                            <Heading size='md'>Profile</Heading>
                        </Box>
                    </Link>
                </ListItem>

                <Box position='fixed' bottom='10'>
                    <Button w='full' _hover={{bg: 'orange'}} onClick={(e) => {
                        e.preventDefault();
                        Cookies.remove('jwt');
                        Cookies.remove('user-data');
                        window.location = '/';

                    }}>Logout</Button>
                </Box>
            </List>
        </Box>
    );
};

export default Sidebar;
