import React, {useState} from "react";
import {Box, Image, Text,} from "@chakra-ui/react";
import "./Turf.css"
import dummyImg from "../../assets/images/Thumbnail1.avif";

function TurfCard({venue, handleCardClick}) {
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
        <div onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
             className="turfCard"
        >
            <Box className="frontBox"
                 maxW="md"
                 borderWidth="1px"
                 borderRadius="lg"
                 overflow="hidden"
                 onClick={() => handleClick(venue.id)}
                 position="relative"
                 transform={isHovered ? 'rotateY(180deg)' : 'none'}
                 transition="transform 0.5s ease"
                 _hover={{cursor: 'pointer'}}
            >
                <Box backgroundColor="yellow.500" p="4" width="100%" height="100%">
                    <div>
                        <Image src={venue.coverImage ? `data:image/jpeg;base64,${venue.coverImage}` : dummyImg}
                               alt="Image"
                               boxSize="40%" objectFit="contain"/>
                    </div>
                    <Text fontSize="xl" fontWeight="bold">
                        {venue.name}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                        {venue.location}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                        Rating: 4.5
                    </Text>
                    {venue.sports.map((sport, index) => (
                        <Text key={index}>{sport}</Text>
                    ))}
                </Box>

                {isHovered && (
                    <Box className="backBox"
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
        </div>
    );
}


export default TurfCard;