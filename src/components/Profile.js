import { Box, Button, Container, Heading, Flex, Input, Stack, FormControl, FormLabel, Center, useToast, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { MakePUT } from "./helper/Request";
import { useUser } from "./Auth/useUser";


const UsersComponent = () => {
    const currentUser = useUser();
    const [newData, setNewData] = useState({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalState, setModalState] = useState();

    useEffect(() => {
        if (currentUser !== 'loading') {
            setNewData(currentUser);
        }

    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    }

    const handleSubmit = () => {
        MakePUT("/api/users/" + newData.id, {
            username: newData.username,
            email: newData.email
        }).then(response => {
            if (response) {
                toast({
                    title: "User Account Updated",
                    duration: 3000,
                    isClosable: true
                })
            }
        }).catch(err => {
            toast({
                status: "error",
                title: "Email already taken",
                duration: 3000,
                isClosable: true
            })
        });
    }

    return (
        <div>
            <Header />
            <Flex p={6}>
                <Box w='15%'>
                    <Sidebar />
                </Box>
                <Box p={12}>
                    <Container borderWidth='1px' borderRadius='lg' p={10} ml={20}>
                        <Center>
                            <Heading>Hello, {currentUser.username}!</Heading>
                        </Center>

                        <Stack spacing={4} mt={4}>
                            <FormControl mt={2}>
                                <FormLabel htmlFor='username'>Username</FormLabel>
                                <Input id='username' name='username' value={newData.username} type='text' onChange={e => handleChange(e)} />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel htmlFor='email'>Email address</FormLabel>
                                <Input id='email' name='email' type='email' value={newData.email} onChange={e => handleChange(e)} />
                            </FormControl>
                                <Center>
                                <Button  _hover={{ bg: 'blue.600' }} onClick={handleSubmit}>Save Changes</Button>
                                </Center>
                        </Stack>
                    </Container>
                </Box>
            </Flex>

        </div>

    )
}

export default UsersComponent;