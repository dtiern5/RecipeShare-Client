import { Box, Heading, Flex, HStack, VStack, Button, useDisclosure, Collapse, FormControl, FormLabel, Textarea, Spacer, Wrap, Checkbox, Center } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import NewRecipe from "./NewRecipe";
import DeletedComponent from "./DeletedComponent";
import { IoIosArrowDown } from "react-icons/io";

import { Input, Select, Stack } from "@chakra-ui/react"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import { MakeGET, MakePOST, MakePOST2, MakeDELETE, MakePUT } from "./helper/Request";
import { useUser } from "./Auth/useUser";
import { useNavigate } from "react-router-dom";


const MyRecipesComponent = () => {
    let navigate = useNavigate();
    const currentUser = useUser();
    const [recipes, setRecipes] = useState({});
    const [modalState, setModalState] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [activeRecipe, setActiveRecipe] = useState({});
    const [responseID, setResponseID] = useState();

    useEffect(() => {
        // Wait for currentUser data

        if (!currentUser) {
            return;
        }
        populateTable();
    }, [currentUser]);

    const populateTable = () => {
        MakeGET("/api/recipes").then(response => {
            const final = {};
            // console.log("response", response)
            const data = response.data;
            data.map((item) => {
                const recipeData = item.attributes.recipedata;

                if (currentUser !== undefined) {
                    if (currentUser.username === recipeData.username) {
                        // final[recipeData.title] = recipeData;
                        final[item.id] = recipeData;
                        setRecipes({ ...recipes, ...final });
                    }
                }


            })
        })
    }

    const handleDelete = (e) => {
        const deleteURL = e.target.name

        MakeDELETE('/api/recipes/' + deleteURL)
            .then(setTimeout(() => {
                navigate("/deleted")
            }, 100))


    };

    const handleModalOpen = (e) => {
        MakeGET('/api/recipes/' + e.target.name).then(response => {
            setResponseID(e.target.name);
            setActiveRecipe(response.data.attributes.recipedata)
        })
        onOpen();
    }

    const update = () => {
        MakePUT('/api/recipes/' + responseID, {
            data: {
                recipedata: {
                    ...activeRecipe
                }
            }
        }).then(setTimeout(() => {
            navigate("/deleted")
        }, 100))
    }

    const handleTimeChange = (e) => {
        setActiveRecipe({ ...activeRecipe, time: e.currentTarget.value });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActiveRecipe({ ...activeRecipe, [name]: value });
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} onChange={setModalState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Recipe</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4} p={4}>
                            <FormControl>
                                <FormLabel htmlFor='title'>Username</FormLabel>
                                <Input id='title' name='title' value={activeRecipe.title} type='text' onChange={e => handleChange(e)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='url'>URL</FormLabel>
                                <Input id='url' name='url' value={activeRecipe.url} type='text' onChange={e => handleChange(e)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='time'>Time Required</FormLabel>
                                <Select id='time' name='time' placeholder='Select option' onChange={e => handleTimeChange(e)}>
                                    <option value='Quick'>Quick</option>
                                    <option value='A Few Hours'>A Few Hours</option>
                                    <option value='Full Day'>Full Day</option>
                                    <option value='Multiple Days'>Multiple Days</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='notes'>Notes</FormLabel>
                                <Textarea id='notes' name='notes' value={activeRecipe.notes} type='text' rows='5' onChange={e => handleChange(e)} />
                            </FormControl>

                            <Button colorScheme='blue' onClick={update}>
                                Save Changes
                            </Button>

                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>



            <Header />
            <Flex p={6}>
                <Box w="15%">
                    <Sidebar />
                </Box>
                <VStack w="85%">
                    <Heading>My Recipes</Heading>
                    <Table variant='striped' colorScheme='blue'>
                        <TableCaption>
                        <Wrap justify='center'>
                            <NewRecipe onSave={(newRecipe) => {
                                MakePOST("/api/recipes", {
                                    data: {
                                        user: currentUser.id,
                                        recipedata: { ...newRecipe }
                                    }
                                }).then((response) => {
                                    setResponseID(response.data.id)
                                    setRecipes({
                                        ...recipes,
                                        [response.data.id]: newRecipe
                                    })
                                })
                            }} />
                            </Wrap>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Recipe Link</Th>
                                <Th>Time Required</Th>
                                <Th>Notes</Th>
                                <Th><Center>Share</Center></Th>
                                <Th><Center>Edit</Center></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.keys(recipes).map((key) => {
                                const recipe = recipes[key];
                                const recipeID = key;

                                console.log(recipeID);

                                return (
                                    <Tr>
                                        <Td _hover={{ color: '#7B68EE' }}><Heading size='sm'><a href={recipe.url} target="_blank">{recipe.title}</a></Heading></Td>
                                        <Td>{recipe.time}</Td>
                                        <Td>{recipe.notes}</Td>
                                        <Td><Center><Checkbox></Checkbox></Center></Td>
                                        <Td>
                                            <Menu>
                                                {({ isOpen }) => (
                                                    <>
                                                        <MenuButton isActive={isOpen} as={Button} rightIcon={<IoIosArrowDown />}>
                                                            {isOpen ? 'Close' : 'Options'}
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem name={recipeID} onClick={event => handleModalOpen(event)}>Edit</MenuItem>
                                                            <MenuItem name={recipeID} _hover={{ color: 'orange' }} onClick={e => handleDelete(e)}>Delete</MenuItem>
                                                        </MenuList>
                                                    </>
                                                )}
                                            </Menu>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </VStack>
            </Flex>
        </div>


    )
}

export default MyRecipesComponent;