import React from "react";
import {Box, Flex, Image, Text,} from "@chakra-ui/react";

import "./Turf.css"
import dummyImg from "../../assets/images/Thumbnail1.avif";

function TurfCard({name, sports, location, handleCardClick}) {

    const handleClick = () => {

        handleCardClick();
    };

    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={handleClick}>
            <Flex>
                <Image src={dummyImg} alt="Image" boxSize="40%" objectFit="contain"/>
                <Box p="4">
                    <Text fontSize="xl" fontWeight="bold">{name}</Text>
                    <Text fontSize="md" color="gray.500">{location}</Text>
                    <Text fontSize="md" color="gray.500">Rating: 4.5</Text>
                    {sports.map((sport, index) => (
                        <Text key={index}>{sport}</Text>
                    ))}
                </Box>
            </Flex>
        </Box>
    );
}


export default TurfCard;