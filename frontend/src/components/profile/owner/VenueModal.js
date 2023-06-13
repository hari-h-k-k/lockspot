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
    Image,
    VStack,
} from "@chakra-ui/react";
import { Select, Tag, TagLabel, TagCloseButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {useQuery} from 'react-query';
import axiosInstance from '../../../Interceptor.js';
import {
    Input,
    Stack,
    useToast
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {useSelector } from 'react-redux';

function VenueModal({ setIsOpen }) {

    const userDetails = useSelector(state => state.user);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [overview, setOverview] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedSports, setSelectedSports] = useState([]);
    const [availableOptions, setAvailableOptions] = useState([]);
    // sportsList?sportsList:[{id:"1",name:"dummy"}]
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };
    const handleRemoveImage = () => {
        setSelectedImage(null);
        fileInputRef.current.value = ''; // Reset the file input value
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const getSportsList = async () => {
          try {
            const response = await axiosInstance({
                method: 'get',
                url: '/getSports',
            });
            setAvailableOptions(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        getSportsList();
      }, []);
    
    const handleSportSelect = (option) => {
        setSelectedSports([...selectedSports, option]);
        setAvailableOptions(availableOptions.filter((item) => item !== option));

    };

    const handleRemoveOption = (option) => {
        setSelectedSports(selectedSports.filter((sport) => sport !== option));
        setAvailableOptions([...availableOptions, option]);
    };

    const toast = useToast();
    const showToast = (message) => {
        toast({
            title: "Submission Status",
            description: message,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const payload = {
            ownerId: userDetails.userId,
            turfName: name,
            location: location,
            sports: JSON.stringify(selectedSports),
            coverImage: selectedImage
        };
        console.log(JSON.stringify(payload));
        axiosInstance({
            method: 'post',
            url: '/addVenue',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: payload
        }).then(function (responseData) {
            const response = responseData;
            console.log(response);
            if (response.statusText) {
                showToast(response.data.message);
            } else {
                console.log('Request failed with status:', response.status);
            }
            handleClose();
        }).catch(function (error) {
            console.error(error);
        });

    };

    return (
        <>

            <ModalHeader>Add Venue</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <Stack spacing={4}>
                    <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    {/* <Input placeholder="Overview" value={overview} onChange={(e) => setOverview(e.target.value)} /> */}
                    {/* <Box>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                        {selectedImage && (
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        )}
                    </Box> */}

                    <Box p={4} borderWidth="1px" borderRadius="md" width="300px">
                        <VStack spacing={4} align="stretch">
                            <label htmlFor="image-input">
                                <Button colorScheme="blue" as="span">
                                    Select Image
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    id="image-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            {selectedImage && (
                                <Box borderWidth="1px" borderRadius="md" overflow="hidden" position="relative">
                                    <Image src={URL.createObjectURL(selectedImage)} alt="Selected" />
                                    <Button
                                        size="sm"
                                        colorScheme="red"
                                        position="absolute"
                                        top="5px"
                                        right="5px"
                                        onClick={handleRemoveImage}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            )}
                        </VStack>
                    </Box>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" >
                            Select Sports
                        </MenuButton>
                        <MenuList>
                            {availableOptions.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    onClick={() => handleSportSelect(item)}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    {selectedSports.length > 0 && (
                        <Box>
                            {selectedSports.map((sport) => (
                                <Tag key={sport.id} size="md" variant="subtle" colorScheme="blue">
                                    <TagLabel>{sport.name}</TagLabel>
                                    <TagCloseButton onClick={() => handleRemoveOption(sport)} />
                                </Tag>
                            ))}
                        </Box>
                    )}
                </Stack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleClose}>
                    Back
                </Button>
                <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
            </ModalFooter>
        </>

    );

}

export default VenueModal;
