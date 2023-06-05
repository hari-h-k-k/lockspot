import React, {useState} from "react";
import {Box, Image, Text,} from "@chakra-ui/react";
import "./Turf.css"
import dummyImg from "../../assets/images/Thumbnail1.avif";

function TurfCard({name, sports, location, handleCardClick, turfKey}) {
    const [isHovered, setIsHovered] = useState(false);
    const handleClick = (turfKey) => {
        handleCardClick(turfKey);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Box
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={() => handleClick(turfKey)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            position="relative"
            transform={isHovered ? 'rotateY(180deg)' : 'none'}
            transition="transform 0.5s ease"
            _hover={{cursor: 'pointer'}}
        >
            <Box backgroundColor="yellow.500" p="4" width="100%" height="100%">
                <Image src={dummyImg} alt="Image" boxSize="40%" objectFit="contain"/>
                <Text fontSize="xl" fontWeight="bold">
                    {name}
                </Text>
                <Text fontSize="md" color="gray.500">
                    {location}
                </Text>
                <Text fontSize="md" color="gray.500">
                    Rating: 4.5
                </Text>
                {sports.map((sport, index) => (
                    <Text key={index}>{sport}</Text>
                ))}
            </Box>

            {isHovered && (
                <Box
                    p="4"
                    backgroundColor="blue.500"
                    color="white"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    transform="rotateY(180deg)"
                >
                    <Text fontSize="lg" fontWeight="bold" textAlign="center">
                        Back Side
                    </Text>
                    <Text fontSize="md" textAlign="center">
                        Additional Information
                    </Text>
                </Box>
            )}
        </Box>
    );
}


export default TurfCard;