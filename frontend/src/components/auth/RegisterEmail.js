import { useState } from "react";
import {
  ChakraProvider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useDispatch,useSelector} from 'react-redux';
import {showLogIn} from "../../redux/dispatchers/DialogDispatcher.js";
import {DIALOG_SIGN_IN_EMAIL,DIALOG_REGISTER_EMAIL,DIALOG_DEFAULT} from '../../constants/strings/Strings.js';

const RegEmail = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showLogIn(DIALOG_DEFAULT));
    setIsOpen(false);
  };

  return (
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={4}>
              <Input placeholder="Username" />
              <Input placeholder="Password" type="password" />
              <Input placeholder="Confirm Password" type="password" />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Back
            </Button>
            <Button colorScheme="teal">Register</Button>
          </ModalFooter>
        </ModalContent>
  );
};

export default RegEmail;
