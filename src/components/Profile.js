import { Box, Heading, Flex, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

const UsersComponent = () => {
    const currentUser = useUser();

    return (
        <div>
            <Header />
            <Flex p={6}>

                <Box w='15%'>
                    <Sidebar />
                </Box>
                <Heading>Users</Heading>
            </Flex>

        </div>

    )
}

export default UsersComponent;