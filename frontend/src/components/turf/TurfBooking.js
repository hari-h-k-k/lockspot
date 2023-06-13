import React, {useEffect, useRef} from "react";
import {
    Box,
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Grid,
    Heading,
    Tab,
    TabList,
    Tabs,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import BgImg from "../../assets/images/ProfileBg.jpg";
import NavBar from "../navigation/Navbar";
import "./Turf.css"
import axiosInstance from "../../Interceptor";
import {useQuery} from "react-query";
import {useLocation} from "react-router-dom";

function TurfBooking() {

    const [collectedData, setCollectedData] = React.useState(null)
    const [displayData, setDisplayData] = React.useState(null)
    const [selectedSport, setSelectedSport] = React.useState()
    const [selectedDay, setSelectedDay] = React.useState()
    const UIRef = useRef(null);
    const {onClose} = useDisclosure()

    const location = useLocation();
    const turfKey = location.state?.turfKey;
    const getTurfDetails = async () => {
        const response = await axiosInstance({
            method: 'get',
            url: '/getTurfDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                venueId: turfKey
            }
        });
        return response.data;
    };

    const {
        isLoading: isResponse,
        error: responseError,
        data: responseData,
    } = useQuery(['getTurf', turfKey], getTurfDetails);


    useEffect(() => {
        setCollectedData(responseData)
    }, [responseData]);

    const getWeekDates = () => {
        const weekDates = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentYear, currentMonth, currentDate.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    };

    const weekDates = getWeekDates();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date();
    const currentDayIndex = today.getDay();
    const displayedDays = days.slice(currentDayIndex).concat(days.slice(0, currentDayIndex));

    useEffect(() => {
        if (typeof collectedData === 'undefined' || collectedData === null) {
            return;
        }

        const transformedData = {};
        const keys = Object.keys(collectedData)
        for (let i = 0; i < keys.length; i++) {

            transformedData[keys.at(i)] = {};

            for (let j = 0; j < displayedDays.length; j++) {
                let date = weekDates[j].toLocaleString('en-UK', {day: '2-digit', month: '2-digit'})

                transformedData[keys[i]][`${displayedDays[j]} ${date}`] = {
                    timings: collectedData[keys[i]]['timings'],
                    slots: {}
                };

                const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
                const formattedDate = weekDates[j].toLocaleDateString('en-CA', options);

                if (collectedData[keys[i]][formattedDate] !== null) {
                    if (!transformedData[keys[i]][`${displayedDays[j]} ${date}`]) {
                        transformedData[keys[i]][`${displayedDays[j]} ${date}`] = {
                            timings: collectedData[keys[i]]['timings'],
                            slots: {}
                        };
                    }

                    transformedData[keys[i]][`${displayedDays[j]} ${date}`]['slots'] = {
                        ...collectedData[keys[i]][formattedDate]
                    };
                }
            }
        }

        const selectedTab = displayedDays[0];
        const date = weekDates[0].toLocaleString('en-UK', {day: '2-digit', month: '2-digit'})

        setDisplayData(transformedData)
        console.log(transformedData)
        setSelectedSport(keys[0])
        setSelectedDay(`${selectedTab} ${date}`)
    }, [collectedData]);

    const gridLayout = {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
    };

    const handleTabChange = (index) => {
        const selectedTab = displayedDays[index];
        const date = selectedTab === 'Today' ? '' : weekDates[index].toLocaleString('en-UK', {
            day: '2-digit',
            month: '2-digit'
        });
        const formattedDate = `${selectedTab} ${date}`;
        setSelectedDay(formattedDate);
    };

    const [selectedSlots, setSelectedSlots] = React.useState(null)
    const handleButtonClick = (timingValue, selectedDay, selectedSport) => {

        const selectedDayFirstWord = selectedDay.split(' ')[0];
        const selectedIndex = displayedDays.findIndex((day) => day.startsWith(selectedDayFirstWord));
        const fullDate = weekDates[selectedIndex].toLocaleString('en-UK', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        console.log(selectedSport, timingValue, fullDate);

        setSelectedSlots((prevSelectedSlots) => {
            const newSelectedSlots = {...prevSelectedSlots};

            if (!newSelectedSlots[selectedSport]) {
                newSelectedSlots[selectedSport] = {};
            }

            if (!newSelectedSlots[selectedSport][fullDate]) {
                newSelectedSlots[selectedSport][fullDate] = [];
            }

            newSelectedSlots[selectedSport][fullDate].push(timingValue);

            return newSelectedSlots;
        });
    };

    const onOpen = () => {
        UIRef.current.focus();
    };

    const handleRemoveSlot = (selectedSport, fullDate, timingValue) => {
        setSelectedSlots((prevSelectedSlots) => {
            const newSelectedSlots = {...prevSelectedSlots};

            if (
                newSelectedSlots[selectedSport] &&
                newSelectedSlots[selectedSport][fullDate]
            ) {
                const timingValues = newSelectedSlots[selectedSport][fullDate];
                const index = timingValues.indexOf(timingValue);

                if (index !== -1) {
                    timingValues.splice(index, 1);

                    if (timingValues.length === 0) {
                        delete newSelectedSlots[selectedSport][fullDate];

                        if (Object.keys(newSelectedSlots[selectedSport]).length === 0) {
                            delete newSelectedSlots[selectedSport];
                        }
                    }
                }
            }

            return Object.keys(newSelectedSlots).length > 0 ? newSelectedSlots : null;
        });
    };

    return (
        <>
            <div style={detailStyles.detailsDiv}>
                <NavBar/>
                <Box style={detailStyles.thumbnail}></Box>
                <div style={detailStyles.headingDiv}></div>

                <Tabs isLazy isFitted variant="enclosed" onChange={handleTabChange}>
                    <TabList className="daysTab" justifyContent="left">
                        {displayedDays.map((day, index) => {
                            const isToday = index === 0;
                            const date = isToday ? '' : weekDates[index].toLocaleString('en-UK', {
                                day: '2-digit',
                                month: '2-digit'
                            });
                            return (
                                <Tab
                                    key={index}
                                    className={`${displayedDays[index] === selectedDay ? 'selected ' : 'dayTab'}`}
                                    style={{fontSize: selectedDay === displayedDays[index] ? '1.2em' : '1em'}}
                                >
                                    {isToday ? 'Today' : `${day} ${date}`}
                                </Tab>
                            );
                        })}
                    </TabList>

                </Tabs>

                <Container sx={{width: "70%", float: "right", height: "60vh"}} maxW="container.xl" p="2rem">
                    <Heading sx={{textAlign: "center", marginBottom: "30px"}}>Timings</Heading>

                    <Grid sx={gridLayout}>
                        {displayData &&
                            displayData[selectedSport][selectedDay].timings.map(timingValue => {
                                const isSlotValue = Object.values(displayData[selectedSport][selectedDay].slots).includes(timingValue);
                                if (isSlotValue) {
                                    return (
                                        <Button key={timingValue} className="booked" disabled={true}>
                                            {timingValue} - {timingValue + 1}
                                        </Button>
                                    );
                                } else {
                                    return (
                                        <Button key={timingValue} className="timing"
                                                onClick={() => handleButtonClick(timingValue, selectedDay, selectedSport)}>
                                            {timingValue} - {timingValue + 1}
                                        </Button>
                                    );
                                }
                            })}
                    </Grid>
                </Container>
                <Drawer placement="bottom" onClose={onClose} isOpen={selectedSlots !== null} trapFocus={false}
                        finalFocusRef={UIRef} onOpen={onOpen}>
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
                        <DrawerBody>
                            {selectedSlots &&
                                Object.entries(selectedSlots).map(([selectedSport, sportData]) => (
                                    Object.entries(sportData).map(([fullDate, timingValues]) => (
                                        timingValues.map((timingValue, index) => (
                                            <Flex key={index} alignItems="center" justifyContent="space-between"
                                                  marginBottom="1rem">
                                                <Box>
                                                    <Text>{selectedSport}</Text>
                                                    <Text>{fullDate}</Text>
                                                    <Text>{timingValue}</Text>
                                                </Box>
                                                <Button
                                                    onClick={() => handleRemoveSlot(selectedSport, fullDate, timingValue)}>
                                                    Remove
                                                </Button>
                                            </Flex>
                                        ))
                                    ))
                                ))}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}

export default TurfBooking;

const detailStyles = {
    detailsDiv: {
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
        position: 'relative'
    },
    thumbnail: {
        height: '20vh',
        width: '20vh',
        position: 'absolute',
        backgroundColor: 'red',
        top: '25vh',
        left: '10%',
        overflow: 'auto'
    },
    days: {
        position: 'absolute',
        top: '50vh',
        left: '10%',
        overflow: 'auto'
    },
    headingDiv: {
        backgroundColor: 'cyan',
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