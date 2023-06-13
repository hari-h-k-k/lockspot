import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import NavBar from '../navigation/Navbar.js';
import MapImg from "../../assets/images/Gmap.png";
import BgImg from '../../assets/images/ProfileBg.jpg';

import {Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react';

const TurfOverview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const turfKey = location.state?.turfKey; // Access the turfKey from location.state
    return (
        <div style={detailStyles.detailsDiv}>

            <NavBar/>

            <Box
                height="20vh"
                width="20vh"
                backgroundColor="red"
                position="absolute"
                top="25vh"
                left="10%"
                backgroundSize="cover"
                overflow="auto"
            >

            </Box>
            <div style={detailStyles.mapDiv}>
                {/* Your div content */}

                <Flex justifyContent="flex-end" alignItems="flex-end" mt={10}>
                    <Button {...detailStyles.mapButton}>Show on Map</Button>
                    <Button {...detailStyles.mapButton} onClick={() => navigate('/turfBooking', {state: {turfKey}})}>Book
                        Now</Button>
                </Flex>
            </div>

            <Box p={4} sx={{width: "70%", float: "right"}}>
                <Text mr={4} mt={4} sx={{textAlignLast: "center"}}>
                    Venue Name
                </Text>

                <Tabs isLazy isFitted variant="enclosed" mt={4}>
                    <TabList justifyContent="center">
                        <Tab>Gallery</Tab>
                        <Tab>Reviews</Tab>
                    </TabList>

                    <TabPanels>
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
        </div>
    );

};

export default TurfOverview;

const detailStyles = {
    detailsDiv: {
        // backgroundImage: `url(${BgImg})`,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${BgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'auto',
        maxHeight: '100vh',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '2rem',
    },
    mapDiv: {
        backgroundImage: `url(${MapImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'auto',
        height: '25vh',
        width: "100%",
    },
    mapButton: {
        colorScheme: "orange",
        mr: 4,
        rounded: "full",
        borderWidth: "3px",
        borderColor: "black",
        boxShadow: "md",
    },
    menuButton: {
        colorScheme: 'teal',
        mr: 2,
        _hover: {bg: 'black', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'},
    }
};