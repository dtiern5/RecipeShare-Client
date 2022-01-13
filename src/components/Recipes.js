import { Box, Heading, Flex, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import NewRecipe from "./NewRecipe";

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
import { MakeGET, MakePOST } from "./helper/Request";
import { useUser } from "./Auth/useUser";

const RecipesComponent = () => {
    const currentUser = useUser();
    const [recipes, setRecipes] = useState({});



    useEffect(() => {
        MakeGET("/api/recipes").then(response => {
            const final = {};

            const data = response.data;
            data.map((item) => {
                const recipeData = item.attributes.recipedata;

                final[recipeData.title] = recipeData;
                setRecipes({ ...recipes, ...final });
            })
        })
    }, []);

    return (
        <div>
            <Header />
            <Flex p={6}>
                <Box w="15%">
                    <Sidebar />
                </Box>
                <VStack w="85%">
                    <Heading>All Recipes</Heading>

                    <Table variant='striped' colorScheme='blue'>
                        <Thead>
                            <Tr>
                                <Th>Recipe Link</Th>
                                <Th>Uploaded By</Th>
                                <Th>Time Required</Th>
                                <Th>Notes</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.keys(recipes).map(key => {
                                const recipe = recipes[key];

                                return (
                                    <Tr>
                                        <Td _hover={{ color: '#7B68EE' }}><Heading size='sm'><a href={recipe.url}>{recipe.title}</a></Heading></Td>
                                        <Td>{recipe.username}</Td>
                                        <Td>{recipe.time}</Td>
                                        <Td>{recipe.notes}</Td>
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

export default RecipesComponent;