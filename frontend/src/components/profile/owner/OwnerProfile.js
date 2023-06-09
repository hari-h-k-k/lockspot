import React, { useState } from 'react';
import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import dummyImg from "../../../assets/images/Thumbnail1.avif";
import { AddIcon } from '@chakra-ui/icons';
import VenueModal from "./VenueModal.js";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,

} from "@chakra-ui/react";
import {useQuery} from 'react-query';
import axiosInstance from '../../../Interceptor.js';
import {useSelector} from 'react-redux';

function OwnerProfile() {
    const navigate = useNavigate();
    return (
        <Box p={4}>
            <Text mr={4} mt={4}>
                Owner Name
            </Text>

            <Tabs isLazy isFitted variant="enclosed">
                <TabList justifyContent="center">
                    <Tab>My Venues</Tab>
                    <Tab>Events</Tab>
                    <Tab>Payment History</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <MyVenues />
                    </TabPanel>
                    <TabPanel>
                        <Box mt={4} mx="auto" maxW="80%">
                            {/* Content for Tab 2 */}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box mt={4} mx="auto" maxW="80%">
                            {/* Content for Tab 3 */}
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

function MyVenues() {
    const userDetails = useSelector(state => state.user);
    console.log("userid="+userDetails.userId);
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };

    const getOwnerVenues = async () => {
        const response = await axiosInstance({
            method: 'get',
            url: '/getOwnerVenues',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                ownerId: userDetails.userId 
              },
            
        });
        console.log(response);
        
        return response.data;
    };

    const {
        isLoading: isOwnerVenuesLoad,
        error: ownerVenuesError,
        data: ownerVenues,
    } = useQuery(['getOwnerVenues'], getOwnerVenues);

    return (
        <>
            <Box mt={4} mx="auto" maxW="90%">
                <Modal isOpen={isOpen} onClose={handleClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <VenueModal setIsOpen={setIsOpen}/>
                    </ModalContent>
                </Modal>
                <Flex>
                {/* <VenueCard /> */}
                    {ownerVenues?ownerVenues.map((item) => 
                            (<VenueCard venue={item}/>)
                        ):<></>}
                    <Box
                        width="300px"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        border="dashed"
                        margin="20px"
                        _hover={{ cursor: 'pointer' }}
                        onClick={() => setIsOpen(true)}
                    >
                        <Flex justify="center" align="center" height="100%">
                            <AddIcon
                                boxSize={10}
                                strokeWidth="2px"
                            />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    )
};

function VenueCard({venue}) {
    return (
        <>
            <Box
                maxW="300px"
                maxH="600px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                margin="20px"
                _hover={{ cursor: 'pointer' }}
            >
                <Image src={dummyImg} alt="Card Image" />

                <Box p="4">
                    <Text fontWeight="bold" fontSize="xl">
                        {venue.name}
                    </Text>
                    <Text mt="2" color="gray.500">
                        {venue.location}
                    </Text>

                    <Flex mt="4" align="center">
                        <Text mr="2">Rating:</Text>
                        <Text fontWeight="bold">4.5</Text>
                    </Flex>
                </Box>
            </Box></>
    )
};


export default OwnerProfile;