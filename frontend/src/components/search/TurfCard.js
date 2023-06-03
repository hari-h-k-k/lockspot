import React from "react";
import {Box, Card, CardBody, Grid, Heading} from "@chakra-ui/react";
import {Image, Text} from "@chakra-ui/react";
import "./Search.css"


function TurfCard({ name, sports, location }) {
    return (
        <Box>
            <Image src="../../assets/images/Thumbanil1.avif" />
            <Text>TURF</Text>
            <Heading>{name}</Heading>
            <Text>{location}</Text>
            {sports.map((sport, index) => (
                <Text key={index}>{sport}</Text>
            ))}
        </Box>
    );
}


export default TurfCard;