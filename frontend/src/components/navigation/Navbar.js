import {Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import PopUp from '../auth/PopUp.js';
import {useNavigate} from "react-router-dom";
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";
import {useDispatch, useSelector} from 'react-redux';

const Navbar = () => {
    const userDetails = useSelector(state => state.user);
    // const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log("userdetails=" + JSON.stringify(userDetails))
    return (
        <Flex {...styles.navFlex}>
            {/* Logo */}
            <Text fontSize="xl" fontWeight="bold">
                <a href="/">LockSpot</a>
            </Text>

            {/* Centered Menu Buttons */}
            <Flex justify="center" align="center">
                <Button {...styles.menuButton} onClick={() => navigate("/venues")}>
                    Venues
                </Button>
                <Button {...styles.menuButton} onClick={() => navigate("/events")}>
                    Events
                </Button>
                <Button {...styles.menuButton} onClick={() => navigate("/accessories")}>
                    Accessories
                </Button>
            </Flex>

            {/* Spacer */}
            {/* <Spacer /> */}

            {/* Login Button */}
            {userDetails.token ?
                <div>
                    {/* <Button colorScheme="red">Account</Button> */}
                    <Menu>
                        <MenuButton as={Button} colorScheme="red">
                            {userDetails.email}
                        </MenuButton>
                        <MenuList minW="150px" p={2} color="black">
                            <MenuItem fontSize="sm" _hover={{bg: "teal.100"}} onClick={() => navigate("/profile")}>My
                                Account</MenuItem>
                            <MenuItem fontSize="sm" _hover={{bg: "teal.100"}}
                                      onClick={() => {
                                          dispatch(UserDispatch("", 'clear'));
                                      }}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                : <PopUp/>}
        </Flex>
    );
};

export default Navbar;

const styles = {
    navFlex: {
        // position:"fixed",
        width:"100%",
        height:"10vh",
        as: "nav",
        align: "center",
        justify: "space-between",
        wrap: "wrap",
        padding: 4,
        bg: "rgba(0, 0, 0, 0.4)",
        // _hover:{{ bg: "rgba(0, 0, 0, 0.4)" }},
        // bg:"transparent"
    },
    menuButton: {
        colorScheme: 'teal',
        mr: 2,
        _hover: {bg: 'black', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'},
    },
};
