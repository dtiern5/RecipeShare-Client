import { Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import Header from "./Header";
import Sidebar from "./Sidebar";


// Note: This class is a temporary workaround, since I can't get the
// table in MyRecipes to repopulate on item deleted.
const DeletedComponent = () => {
    let navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate("/myrecipes"), 300)
        navigate("/myrecipes")
    })


    return (
        <div>
            <Header />
            <Flex p={6}>
                <Box w="15%">
                    <Sidebar />
                </Box>
            </Flex>
        </div>

    )
}

export default DeletedComponent;