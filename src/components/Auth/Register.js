import React from "react";
import { Box, Button, Container, Heading, Input, Stack, useToast } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { MakeGET } from "../helper/Request";


const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const toast = useToast();

    const handleSubmit = async (e) => {
        try {
            await axios.post('http://localhost:1337/api/auth/local/register', userData)
                .then(({ data }) => {
                    if (data.jwt) {
                        Cookies.set('jwt', data.jwt);
                        toast({
                            title: "Registered"
                        })
                        setTimeout(() => window.location = "/recipes", 1200)
                    }
                });
        } catch (err) {
            console.log(err.response)
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
            <Container borderWidth='1px' borderRadius='lg' p={4}>
                <Heading>Register</Heading>
                <Stack spacing={4} mt={4}>
                    <FormControl mt={2}>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input id='username' name='username' type='text' onChange={e => handleChange(e)} />
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input id='email' name='email' type='email' onChange={e => handleChange(e)} />
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' name='password' type='password' onChange={e => handleChange(e)} />
                    </FormControl>
                    <Button onClick={handleSubmit}>Register</Button>
                </Stack>
            </Container>
        </Box>
    )
}


export default Register;