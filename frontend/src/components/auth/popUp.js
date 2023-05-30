import { ChakraProvider, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { Radio, RadioGroup, HStack } from "@chakra-ui/react";
function PopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <ChakraProvider>
            <Button colorScheme="red" onClick={() => setIsOpen(true)}>Login</Button>

            <Modal isOpen={isOpen} onClose={handleClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal with Tabs</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <RadioGroup defaultValue="user">
                            <HStack spacing={4}>
                                <Radio value="user">User</Radio>
                                <Radio value="owner">Owner</Radio>
                            </HStack>
                        </RadioGroup>
                        <Tabs justifyContent='center' variant="enclosed" index={activeTab} onChange={(index) => setActiveTab(index)}>
                            <TabList>
                                <Tab _selected={{ bg: "blue.500", color: "white" }}>SignIn</Tab>
                                <Tab _selected={{ bg: "green.500", color: "white" }}>SignUp</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Box mt={4} display="flex" flexDirection="column">
                                        <Button variant="solid" colorScheme="blue" mb={2}>
                                            SignIn with Google
                                        </Button>
                                        <Button variant="solid" colorScheme="blue" mb={2}>
                                            SigIn with Email
                                        </Button>
                                    </Box>
                                </TabPanel>

                                <TabPanel>
                                    <Box mt={4} display="flex" flexDirection="column">
                                        <Button variant="solid" colorScheme="green" mb={2}>
                                            SignUp with Google
                                        </Button>
                                        <Button variant="solid" colorScheme="green" mb={2}>
                                            SignUp with Email
                                        </Button>
                                    </Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="ghost">Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );

}

export default PopUp;
