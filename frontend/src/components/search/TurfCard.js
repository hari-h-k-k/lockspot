import React from "react";
import { Box, Card, CardBody, Grid, Heading } from "@chakra-ui/react";
import { Flex, Image, Text } from "@chakra-ui/react";
import "./Search.css";
import dummyImg from "../../assets/images/Thumbnail1.avif";

function TurfCard({ name, sports, location }) {
    return (

        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Flex>
                <Image src={dummyImg} alt="Image" boxSize="40%" objectFit="contain" />
                <Box p="4">
                    <Text fontSize="xl" fontWeight="bold">{name}</Text>
                    <Text fontSize="md" color="gray.500">{location}</Text>
                    <Text fontSize="md" color="gray.500">Rating: 4.5</Text>
                </Box>
            </Flex>
        </Box>
        // <Box>
        //     <Image src="../../assets/images/Thumbanil1.avif" />
        //     <Text>TURF</Text>
        //     <Heading>{name}</Heading>
        //     <Text>{location}</Text>
        //     {sports.map((sport, index) => (
        //         <Text key={index}>{sport}</Text>
        //     ))}
        // </Box>
    );
}


export default TurfCard;