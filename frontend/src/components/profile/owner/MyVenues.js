import React, { useState } from 'react';
import {
    Box,
    Container,
    Flex,
    Grid,
    Image,
    Modal,
    ModalContent,
    ModalOverlay,
    Text,
    Skeleton
} from '@chakra-ui/react';
import VenueModal from "./VenueModal.js";
import dummyImg from "../../../assets/images/Thumbnail1.avif";
import { AddIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import axiosInstance from '../../../Interceptor.js';
import { useSelector } from 'react-redux';

function MyVenues() {
    const userDetails = useSelector(state => state.user);
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

        return response.data;
    };

    const {
        isLoading: isOwnerVenuesLoad,
        error: ownerVenuesError,
        data: ownerVenues,
    } = useQuery(['getOwnerVenues',isOpen], getOwnerVenues);

    return (
        <>
            <Container maxW="container.xl" p="2rem">
                <Modal isOpen={isOpen} onClose={handleClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <VenueModal setIsOpen={setIsOpen} />
                    </ModalContent>
                </Modal>
                {isOwnerVenuesLoad ?
                    (<Grid {...styles.gridLayout}>
                        <Skeleton  {...styles.skeletonCard} />
                        <Skeleton  {...styles.skeletonCard} />
                        <Skeleton  {...styles.skeletonCard} />
                    </Grid>)
                    : (<Grid {...styles.gridLayout}>
                        {ownerVenues &&
                            ownerVenues.map((item) => (
                                <VenueCard venue={item} />
                            ))}

                        <Box
                            {...styles.addCard}
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
                    </Grid>)}
            </Container>
        </>
    )
};

function VenueCard({ venue }) {
    return (
        <>
            <Box
                {...styles.venueCard}
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
            </Box>
        </>
    )
};

export default MyVenues;

const styles = {
    gridLayout :{
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
    },
    venueCard: {
        width: "300px",
        height: "500px",
        borderWidth: "1px",
        borderRadius: "lg",
        overflow: "hidden",
        boxShadow: "md",
        margin: "20px",
    },
    addCard: {
        width: "300px",
        height: "500px",
        borderWidth: "1px",
        borderRadius: "lg",
        overflow: "hidden",
        boxShadow: "md",
        border: "dashed",
        margin: "20px",
    },
    skeletonCard: {
        height: '500px',
        width: '300px',
        fadeDuration: 4,
        boxShadow: "md",
        speed: 0.5,
        borderRadius: "lg",
    }
};