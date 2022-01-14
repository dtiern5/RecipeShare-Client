import { Box, Button, HStack, Input, Select, Stack, Textarea } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";

import * as Icons from 'react-icons/fi';
import { useUser } from "./Auth/useUser";

const IconsList = Object.keys(Icons);

export default ({ onSave }) => {
    const currentUser = useUser();
    const [entry, setEntry] = useState(false);
    const recipeName = useRef();
    const recipeURL = useRef();
    const [recipeTime, setRecipeTime] = useState('');
    const recipeNotes = useRef();



    const Save = () => {
        onSave({
            title: recipeName.current.value,
            url: recipeURL.current.value,
            time: recipeTime,
            notes: recipeNotes.current.value,
            username: currentUser.username
        })
        setEntry(false)
    }

    const handleTimeChange = (e) => {
        console.log(e.currentTarget.value)
        setRecipeTime(e.currentTarget.value)
    }

    return (
        <Box w="50%">
            {
                entry ? (
                    <Stack spacing={2}>
                        <Input placeholder='Recipe Name' ref={recipeName} />
                        <Input placeholder='Recipe URL' ref={recipeURL} />
                        <Select placeholder='Time required' onChange={e => handleTimeChange(e)}>
                            <option value='Quick'>Quick</option>
                            <option value='A Few Hours'>A Few Hours</option>
                            <option value='Full Day'>Full Day</option>
                            <option value='Multiple Days'>Multiple Days</option>
                        </Select>
                        {/* <Input placeholder='Time Required' ref={recipeTime} /> */}
                        <Textarea placeholder='Notes' rows='5' ref={recipeNotes} />

                        <Button colorScheme='blue' onClick={Save}>
                            Save
                        </Button>

                    </Stack>
                ) : null
            }
            <Button
                w='full'
                size='sm'
                colorScheme={entry ? 'red' : 'blue'}
                mt={5}
                onClick={() => setEntry(!entry)}>
                {entry ? 'Cancel' : 'Add Recipe'}
            </Button>
        </Box>
    )
}
