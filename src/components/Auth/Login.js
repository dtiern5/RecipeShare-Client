import { Box, Button, Container, Heading, Input, Stack, useToast } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { useRef } from "react";
import { useState } from 'react';

import axios from "axios";
import Cookies from "js-cookie";


const RegisterComponent = () => {

    const [userData, setUserData] = useState({
        identifier: '',
        password: ''
    })
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:1337/api/auth/local', userData)
                .then(({ data }) => {
                    if (data.jwt) {
                        Cookies.set('jwt', data.jwt);
                        toast({
                            title: "Successfully Logged In"
                        })
                        setTimeout(() => window.location = "/recipes", 1200)
                    }
                });
        } catch (err) {
            toast({
                status: 'error',
                title: 'An error occurred'
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    return (
        <Box p={12}>
            <Container>
                <Box borderWidth='1px' borderRadius='lg' p={4}>
                    <Heading>Login</Heading>
                    <Stack spacing={4} mt={4}>
                        <FormControl mt={2}>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input id='email' name='identifier' type='email' onChange={e => handleChange(e)} />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                        <FormControl mt={2}>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input id='password' name='password' type='password' onChange={e => handleChange(e)} />
                        </FormControl>
                        <Button _hover={{bg: 'blue.500'}} onClick={handleSubmit}>Login</Button>
                        <Button as='a' href='/register' variant='link'>
                            Don't have an account?
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

export default RegisterComponent;