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
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showLogIn(DIALOG_DEFAULT));
  };

  return (
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={4}>
              <Input placeholder="Username" />
              <Input placeholder="Password" type="password" />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Back
            </Button>
            <Button colorScheme="teal">Sign In</Button>
          </ModalFooter>
        </ModalContent>
  );
};

export default RegEmail;
