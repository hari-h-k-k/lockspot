// import './HomeStyle.css';
import { Box, Flex, Spacer, Button, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";
import { useDispatch, useSelector } from 'react-redux';
import BgImg from '../../assets/images/HomeBackground.jpg';

function Profile() {
    const userDetails = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className='homepage'>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding={4}
                bg="transparent"
            >
                {/* Logo */}
                <Text fontSize="xl" fontWeight="bold" onClick={() => {navigate("/")}} _hover={{ cursor: 'pointer' }}>
                Lockspot
                    {/* <a href="/">Lockspot</a> */}
                </Text>

                {/* <Spacer /> */}

                {/* Login Button */}
                <div>
                    {/* <Button colorScheme="red">Account</Button> */}
                    <Button colorScheme="red" mr={2} onClick={() => {dispatch(UserDispatch("", 'clear'));
                                                                    navigate("/")
                                                                    }}>
                        Log Out
                    </Button>
                </div>
            </Flex>
        </div>
    );
}

export default Profile;