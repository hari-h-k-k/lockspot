import { Box, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function MyMenu() {
    return (
      <Menu>
        <MenuButton as={Button} colorScheme="teal">
          Open Menu
        </MenuButton>
        <MenuList>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuList>
      </Menu>
    );
  }

export default MyMenu;