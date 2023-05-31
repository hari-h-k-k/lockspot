import { Box, Flex, Spacer, Button,Text } from "@chakra-ui/react";
import PopUp from '../auth/popUp.js';

const Navbar = () => {
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
          Lockspot
        </Text>
  
        {/* Centered Menu Buttons */}
        <Flex justify="center"  align="center">
          <Button colorScheme="teal" mr={2}>
             Venues
          </Button>
          <Button colorScheme="teal" mr={2}>
            Events
          </Button>
          <Button colorScheme="teal" mr={2}>
          Accessories
          </Button>
        </Flex>
  
        {/* Spacer */}
        {/* <Spacer /> */}
  
        {/* Login Button */}
        <PopUp/>
      </Flex>
    );
  };
  
export default Navbar;
