import { Box,Text, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function MyMenu() {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
      <Text fontSize="xl" fontWeight="bold" mr={4}>
        Welcome, email
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="red"
          size="sm"
          variant="outline"
          _hover={{ bg: "red.500", color: "white" }}
        >
          Account
        </MenuButton>
        <MenuList minW="150px" p={2} color="black">
          <MenuItem _hover={{ bg: "teal.100" }}>Item 1</MenuItem>
          <MenuItem _hover={{ bg: "teal.100" }}>Item 2</MenuItem>
          <MenuItem _hover={{ bg: "teal.100" }}>Item 3</MenuItem>
        </MenuList>
      </Menu>
    </div>
    );
  }

export default MyMenu;