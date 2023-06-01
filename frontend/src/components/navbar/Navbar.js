import { Box, Flex, Spacer, Button, Text,  Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import PopUp from '../auth/popUp.js';
import { useNavigate } from "react-router-dom";
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";
import { useDispatch, useSelector } from 'react-redux';
const Navbar = () => {
  const userDetails = useSelector(state => state.user);
  console.log(userDetails.email);
  const navigate = useNavigate();
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg="transparent"
      >
        {/* Logo */}
        <Text fontSize="xl" fontWeight="bold">
        <a href="/">Lockspot</a>
        </Text>
  
        {/* Centered Menu Buttons */}
        <Flex justify="center"  align="center">
          <Button colorScheme="teal" mr={2} onClick={() => navigate("/venues")}>
             Venues
          </Button>
          <Button colorScheme="teal" mr={2} onClick={() => navigate("/events")}>
            Events
          </Button>
          <Button colorScheme="teal" mr={2} onClick={() => navigate("/accessories")}>
          Accessories
          </Button>
        </Flex>
  
        {/* Spacer */}
        {/* <Spacer /> */}
  
        {/* Login Button */}
        {userDetails.loginState?<div><Text fontSize="xl" fontWeight="bold">
          Welcome, {userDetails.email}
        </Text>
        {/* <Button colorScheme="red">Account</Button> */}
        <Menu>
        <MenuButton as={Button} colorScheme="red">
          Account
        </MenuButton>
        <MenuList >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuList>
      </Menu>
        </div>:<PopUp/>}
      </Flex>
    );
  };
  
export default Navbar;
