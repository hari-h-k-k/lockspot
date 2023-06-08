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
    Image, VStack

} from "@chakra-ui/react";
import { Select, Tag, TagLabel, TagCloseButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import {
    Input,
    Stack,
    useToast
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

function VenueModal({ setIsOpen }) {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [overview, setOverview] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
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

    const [selectedSports, setSelectedSports] = useState([]);
    const [availableOptions, setAvailableOptions] = useState(['Football', 'Basketball', 'Tennis', 'Cricket']);
    const handleSportSelect = (option) => {
        if (!selectedSports.includes(option)) {
            setSelectedSports([...selectedSports, option]);

        }
        setAvailableOptions(availableOptions.filter((item) => item !== option));

    };

    const handleRemoveOption = (option) => {
        const updatedSelectedSports = selectedSports.filter((sport) => sport !== option);
        setSelectedSports(updatedSelectedSports);
        setAvailableOptions([...availableOptions, option]);
    };




    return (
        <>

            <ModalHeader>Add Venue</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <Stack spacing={4}>
                    <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <Input placeholder="Overview" value={overview} onChange={(e) => setOverview(e.target.value)} />
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
                            {availableOptions.map((option) => (
                                <MenuItem
                                    key={option}
                                    onClick={() => handleSportSelect(option)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    {selectedSports.length > 0 && (
                        <Box>
                            {selectedSports.map((sport) => (
                                <Tag key={sport} size="md" variant="subtle" colorScheme="blue">
                                    <TagLabel>{sport}</TagLabel>
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
                <Button colorScheme="teal" onClick={handleClose}>Submit</Button>
            </ModalFooter>
        </>

    );

}

export default VenueModal;
