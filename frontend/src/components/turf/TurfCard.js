import React, {useState} from "react";
import {Box, Image, Text,} from "@chakra-ui/react";
import "./Turf.css"
import dummyImg from "../../assets/images/Thumbnail1.avif";
import {shuffle} from 'lodash';
import {FaSwimmer} from "react-icons/fa";
import {IoMdFootball} from "react-icons/io";
import {GiBasketballBasket, GiPoolTableCorner, GiShuttlecock, GiTennisRacket} from "react-icons/gi";
import {MdSportsCricket} from "react-icons/md";
import {Icon} from "@chakra-ui/icons";

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
                 onClick={() => handleClick(venue.id)}
                 transform={isHovered ? 'rotateY(180deg)' : 'none'}
                 transition="transform 0.5s ease"
                 _hover={{cursor: 'pointer'}}
            >
                <Box className="frontDisplayBox">

                    <Image src={venue.coverImage ? `data:image/jpeg;base64,${venue.coverImage}` : dummyImg}
                           alt="Image"
                           className="turfCardThumbnail"
                           boxSize="40%" objectFit="contain"/>

                    <div style={{paddingInline: "5%"}}>
                        <Text fontSize="xl" fontWeight="bold">
                            {venue.name}
                        </Text>

                        <Text fontSize="md" color="#e8eeee">
                            {venue.location}
                        </Text>

                    </div>

                    <Text style={{textAlign: "center", marginBlock: "15px"}} fontSize="sm">
                        Click to see more...
                    </Text>

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {shuffle(venue.sports)
                            .slice(0, 3)
                            .map((sport, index) => {
                                let sportIcon;

                                if (sport === 'Football') {
                                    sportIcon = <Icon as={IoMdFootball} style={{height: "50px", width: "50px"}}/>;
                                } else if (sport === 'Basketball') {
                                    sportIcon = <Icon as={GiBasketballBasket} style={{height: "50px", width: "50px"}}/>;
                                } else if (sport === 'Tennis') {
                                    sportIcon = <Icon as={GiTennisRacket} style={{height: "50px", width: "50px"}}/>;
                                } else if (sport === 'Swimming') {
                                    sportIcon = <Icon as={FaSwimmer} style={{height: "50px", width: "50px"}}/>;
                                } else if (sport === 'Cricket') {
                                    sportIcon = <Icon as={MdSportsCricket} style={{height: "50px", width: "50px"}}/>;
                                } else if (sport === 'Badminton') {
                                    sportIcon = <Icon as={GiShuttlecock} style={{height: "50px", width: "50px"}}/>;
                                } else if (sport === 'Snooker') {
                                    sportIcon = <Icon as={GiPoolTableCorner} style={{height: "50px", width: "50px"}}/>;
                                } else {
                                    sportIcon = <Text>{sport}</Text>;
                                }

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: '0.5rem',
                                            flex: '1',
                                            flexBasis: '33%',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div>
                                            {sportIcon}
                                        </div>
                                        <div>{sport}</div>
                                    </div>
                                );
                            })}
                    </div>
                </Box>

                {isHovered && (
                    <Box className="backDisplayBox"
                         transform="rotateY(180deg)"
                    >
                        <Text fontSize="lg" fontWeight="bold" textAlign="center">
                            Back Side
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            Additional Information
                        </Text>
                    </Box>)
                }
            </Box>
        </div>
    );
}


export default TurfCard;