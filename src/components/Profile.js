import { Box, Button, Container, Heading, Flex, Input, Stack, FormControl, FormLabel, Center, HStack, Spacer, useToast, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { MakePUT } from "./helper/Request";
import { useUser } from "./Auth/useUser";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'


const UsersComponent = () => {
    const currentUser = useUser();
    const [newData, setNewData] = useState({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalState, setModalState] = useState();

    const currPass = useRef();
    const repeatCurrPass = useRef();
    const newPass = useRef();

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

    // const onChangePass = () => {
    //     const curr = currPass.current.value;
    //     const repeat = repeatCurrPass.current.value;
    //     const _new = newPass.current.value;
    //     console.log(newData)
    //     if ((curr === repeat) && _new.length > 3) {
    //         console.log(_new, _new.length);
    //     }
    // }

    return (
        <div>
            {/* <Modal isOpen={isOpen} onClose={onClose} onChange={setModalState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4} p={4}>
                            <FormControl>
                                <FormLabel htmlFor='currPass'>Current Password</FormLabel>
                                <Input id='currPass' name='currPass' type='text' ref={currPass} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='repeatCurrPass'>Repeat Current Password</FormLabel>
                                <Input id='repeatCurrPass' name='repeatCurrPass' type='text' ref={repeatCurrPass} />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='newPass'>New Password</FormLabel>
                                <Input id='newPass' name='newPass' type='password' ref={newPass} />
                            </FormControl>
                            

                            <Button colorScheme='blue' onClick={onChangePass}>
                                Save Password
                            </Button>

                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal> */}

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
                            {/* <HStack> */}
                                {/* <Button _hover={{ bg: 'orange.400' }} onClick={onOpen}>Change Password</Button> */}
                                {/* <Spacer /> */}
                                <Center>
                                <Button  _hover={{ bg: 'blue.600' }} onClick={handleSubmit}>Save Changes</Button>
                                </Center>
                                
                            {/* </HStack> */}


                        </Stack>
                    </Container>
                </Box>
            </Flex>

        </div>

    )
}

export default UsersComponent;