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
  useToast
} from "@chakra-ui/react";
import { useDispatch,useSelector} from 'react-redux';
import {showLogIn} from "../../redux/dispatchers/DialogDispatcher.js";
import {DIALOG_SIGN_IN_EMAIL,DIALOG_REGISTER_EMAIL,DIALOG_DEFAULT} from '../../constants/strings/Strings.js';
import axiosInstance from '../../Interceptor.js';
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";

const SignInEmail = (handleClose) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(showLogIn(DIALOG_DEFAULT));
  };

  const toast = useToast();
  const showToast = (message) => {
    toast({
      title: "Registered",
      description: message,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        axiosInstance({
            method: 'post',
            url: '/signInEmail',
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload
        }).then(function (responseData) {
            const response = responseData;
            console.log(response);
            if (response.statusText) {
                if (response.data["message"] === 'Credentials match!') {
                    dispatch(UserDispatch(response.data, 'edit'))
                    console.log('Credentials match!');
                } else {
                    console.log('Invalid credentials!');
                }
                showToast(response.data.message);
            }
            else {
                console.log('Request failed with status:', response.status);
            }

            setEmail('');
            setPassword('');
            dispatch(showLogIn(DIALOG_DEFAULT));
            handleClose();
        }).catch(function (error) {
            console.error(error);
        });

    };

  return (
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={4}>
              <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleGoBack}>
              Back
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit}>Sign In</Button>
          </ModalFooter>
        </ModalContent>
  );
};

export default SignInEmail;
