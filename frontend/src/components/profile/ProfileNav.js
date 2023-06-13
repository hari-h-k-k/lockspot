import {Button, Flex, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";
import {useDispatch} from 'react-redux';

function ProfileNav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={4}
            bg="rgba(0, 0, 0, 0.3)"
        >
            <Text fontSize="xl" fontWeight="bold" onClick={() => {
                navigate("/")
            }} _hover={{cursor: 'pointer'}}>
                LockSpot
            </Text>

            <div>
                <Button colorScheme="red" mr={2} onClick={() => {
                    dispatch(UserDispatch("", 'clear'));
                    navigate("/")
                }}>
                    Log Out
                </Button>
            </div>
        </Flex>
    );
}

export default ProfileNav