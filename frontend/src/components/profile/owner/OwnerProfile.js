import React, { useState } from 'react';
import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

import MyVenues from "./MyVenues.js";
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

export default OwnerProfile;