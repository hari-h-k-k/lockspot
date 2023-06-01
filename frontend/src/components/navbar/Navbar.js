import { Box, Flex, Spacer, Button, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import PopUp from '../auth/popUp.js';
import { useNavigate } from "react-router-dom";
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";
import { useDispatch, useSelector } from 'react-redux';
const Navbar = () => {
  const userDetails = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("userdetails="+userDetails.email)
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
      <Flex justify="center" align="center">
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
      {userDetails.loginState ?
        <div>
          {/* <Button colorScheme="red">Account</Button> */}
          <Menu>
            <MenuButton as={Button} colorScheme="red">
            {userDetails.email}
            </MenuButton>
            <MenuList minW="150px" p={2} color="black">
              <MenuItem fontSize="sm" _hover={{ bg: "teal.100" }} onClick={() => navigate("/profile")}>My Account</MenuItem>
              <MenuItem fontSize="sm" _hover={{ bg: "teal.100" }} onClick={() => dispatch(UserDispatch("", 'clear'))}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
        : <PopUp />}
    </Flex>
  );
};

export default Navbar;
