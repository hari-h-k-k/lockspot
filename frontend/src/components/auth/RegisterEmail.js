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
import { useDispatch, useSelector } from 'react-redux';
import { showLogIn } from "../../redux/dispatchers/DialogDispatcher.js";
import { DIALOG_SIGN_IN_EMAIL, DIALOG_REGISTER_EMAIL, DIALOG_DEFAULT } from '../../constants/strings/Strings.js';
import axiosInstance from '../../Interceptor.js';
import UserDispatch from "../../redux/dispatchers/UserDispatcher.js";
const RegEmail = ({userType,handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      password: password,
      confirmPassword: confirmPassword,
      userType: userType
    };
    console.log(payload);
    axiosInstance({
      method: 'post',
      url: '/registerEmail',
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    }).then(function (responseData) {
      const response = responseData;
      console.log(response);
      if (response.statusText) {
        dispatch(UserDispatch(response.data, 'edit'));
        showToast(response.data.message);
        // toast(response.data.message, {
        //   // Custom options
        //   position: 'top-center',
        //   autoClose: 2000,
        //   hideProgressBar: true,
        //   closeOnClick: false,
        //   // pauseOnHover: true,
        //   // draggable: true,
        //   // progress: undefined,
        //   // Add your own custom className for styling

        // });
        console.log('Registration successful:', response.data);
      } else {
        console.log('Request failed with status:', response.status);
      }
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      dispatch(showLogIn(DIALOG_DEFAULT));
      handleClose();
    }).catch(function (error) {
      console.error(error);
    });
  };

  return (
    <ModalContent>
      <ModalHeader>Sign Up</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Stack spacing={4}>
          <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <Input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="red" mr={3} onClick={handleGoBack}>
          Back
        </Button>
        <Button colorScheme="teal" onClick={handleSubmit}>Register</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default RegEmail;
