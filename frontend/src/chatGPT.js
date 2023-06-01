import { Box, Flex, Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from "@chakra-ui/react";
import { SearchIcon, MoonIcon, LockIcon } from "@chakra-ui/icons";

function SearchBox() {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box width="400px" bg="orange" borderRadius="full" boxShadow="md" overflow="hidden">
        <Flex>
          <InputGroup flex="1" borderColor="gray.200" borderRightWidth="1px">
            <InputLeftElement pointerEvents="none" children={<MoonIcon color="gray.400" />} />
          </InputGroup>
          <InputGroup flex="3">
            <Input placeholder="Search" />
          </InputGroup>
          <InputGroup flex="1" borderColor="gray.200" borderLeftWidth="1px">
            <InputRightElement pointerEvents="none" children={<LockIcon color="gray.400" />} />
          </InputGroup>
        </Flex>
        <Box height="2px" bg="gray.200" />
        <Flex justifyContent="center" py={2}>
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            colorScheme="teal"
            borderRadius="full"
            boxShadow="md"
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default SearchBox;
