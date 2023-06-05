// import './HomeStyle.css';
import { Box, Flex, Spacer, Button, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";
import { useDispatch, useSelector } from 'react-redux';
import BgImg from '../../assets/images/ProfileBg.jpg';

function Profile() {
    const userDetails = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div style={
            {
            // backgroundImage: `url(${BgImg})`,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${BgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            overflow: 'auto',
            maxHeight: '100vh',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '2rem',
           }
          }>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding={4}
                bg="rgba(0, 0, 0, 0.3)"
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