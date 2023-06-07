import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import RegisterEmail from './RegisterEmail.js';
import SignInEmail from './SignInEmail.js';
import {showLogIn} from "../../redux/dispatchers/DialogDispatcher.js";
import "./PopUp.css"
import {DIALOG_DEFAULT, DIALOG_REGISTER_EMAIL, DIALOG_SIGN_IN_EMAIL} from '../../constants/strings/Strings.js';

function PopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
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
                <ModalOverlay/>
                <ModalContent>   {/* need fixing   ==> class="dialogContent dialogBackground"*/}
                    {dialogSelector === DIALOG_DEFAULT ? (
                        <>
                            <ModalHeader>Log In</ModalHeader>
                            <ModalCloseButton/>

                            <ModalBody>

                                <Tabs variant="enclosed" index={activeTab} onChange={(index) => setActiveTab(index)}>
                                    <TabList justifyContent='center'>
                                        <Tab _selected={{bg: "blue.500", color: "white"}}>SignIn</Tab>
                                        <Tab _selected={{bg: "green.500", color: "white"}}>SignUp</Tab>
                                    </TabList>

                                    <TabPanels>
                                        <TabPanel>
                                            <Box mt={4} display="flex" flexDirection="column">
                                                <Button variant="solid" colorScheme="gray" mb={2}>
                                                    SignIn with Google
                                                </Button>
                                                <Button variant="solid" colorScheme="blue" mb={2} onClick={() => {
                                                    dispatch(showLogIn(DIALOG_SIGN_IN_EMAIL))
                                                }}>
                                                    SigIn with Email
                                                </Button>
                                            </Box>
                                        </TabPanel>

                                        <TabPanel>
                                            <Box mt={4} display="flex" flexDirection="column">
                                                <Button variant="solid" colorScheme="gray" mb={2}>
                                                    SignUp with Google
                                                </Button>
                                                <Button variant="solid" colorScheme="green" mb={2} onClick={() => {
                                                    dispatch(showLogIn(DIALOG_REGISTER_EMAIL))
                                                }}>
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
                            </ModalFooter>
                        </>

                    ) : dialogSelector === DIALOG_SIGN_IN_EMAIL ? (
                        <SignInEmail handleClose={handleClose}/>
                    ) : dialogSelector === DIALOG_REGISTER_EMAIL ? (
                        <RegisterEmail handleClose={handleClose}/>
                    ) : null}
                </ModalContent>
            </Modal>
        </>

    );

}

export default PopUp;
