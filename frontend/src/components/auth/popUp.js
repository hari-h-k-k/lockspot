import { ChakraProvider, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Radio, RadioGroup, HStack } from "@chakra-ui/react";
import RegisterEmail from './RegisterEmail.js';
import SignInEmail from './SignInEmail.js';
import { showLogIn } from "../../redux/dispatchers/DialogDispatcher.js";
import { DIALOG_SIGN_IN_EMAIL, DIALOG_REGISTER_EMAIL, DIALOG_DEFAULT } from '../../constants/strings/Strings.js';
function PopUp() {
    const [activeTab, setActiveTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const dialogSelector = useSelector(state => state.dialogSelector);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(showLogIn(DIALOG_DEFAULT));
        setIsOpen(false);
    };

    return (
        <>
            <Button colorScheme="red" onClick={() => setIsOpen(true)}>Login</Button>
            <Modal isOpen={isOpen} onClose={handleClose} size="xl">
                <ModalOverlay />
                {dialogSelector === DIALOG_DEFAULT ? (
                    <ModalContent>
                        <ModalHeader>Log In</ModalHeader>
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
                                            <Button variant="solid" colorScheme="gray" mb={2}>
                                                SignIn with Google
                                            </Button>
                                            <Button variant="solid" colorScheme="blue" mb={2} onClick={() => { dispatch(showLogIn(DIALOG_SIGN_IN_EMAIL)) }}>
                                                SigIn with Email
                                            </Button>
                                        </Box>
                                    </TabPanel>

                                    <TabPanel>
                                        <Box mt={4} display="flex" flexDirection="column">
                                            <Button variant="solid" colorScheme="gray" mb={2}>
                                                SignUp with Google
                                            </Button>
                                            <Button variant="solid" colorScheme="green" mb={2} onClick={() => { dispatch(showLogIn(DIALOG_REGISTER_EMAIL)) }}>
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


                ) : dialogSelector === DIALOG_SIGN_IN_EMAIL ? (
                    <SignInEmail />
                ) : dialogSelector === DIALOG_REGISTER_EMAIL ? (
                    <RegisterEmail />
                    // <RegisterEmail userType={userType} setUserType={setUserType}/>
                ) : null}
            </Modal>
        </>

    );

}

export default PopUp;
