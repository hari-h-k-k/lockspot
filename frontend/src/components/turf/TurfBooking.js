import React, {useEffect, useState} from "react";
import {Box, Button, Container, Grid, Heading, Tab, TabList, Tabs} from "@chakra-ui/react";
import BgImg from "../../assets/images/ProfileBg.jpg";
import NavBar from "../navigation/Navbar";
import "./Turf.css"
import axiosInstance from "../../Interceptor";
import {useQuery} from "react-query";
import {useLocation} from "react-router-dom";

function TurfBooking() {

    const [slots, setSlots] = React.useState(null)
    const [displayData, setDisplayData] = React.useState(null)
    const [selectedSport, setSelectedSport] = React.useState()
    const [selectedDay, setSelectedDay] = React.useState()
    const [selectedSlots, setSelectedSlots] = React.useState()
    const [currentDate] = useState(new Date());

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
        setSlots(response.data)
        return response.data;
    };

    const {
        isLoading: isResponse,
        error: responseError,
        data: responseData,
    } = useQuery(['getTurf', turfKey], getTurfDetails);


    useEffect(() => {
        setSlots(responseData)
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
        if (typeof slots === 'undefined' || slots === null) {
            return;
        }

        const transformedData = {};
        const keys = Object.keys(slots)
        for (let i = 0; i < keys.length; i++) {

            transformedData[keys.at(i)] = {};

            for (let j = 0; j < displayedDays.length; j++) {
                let date = weekDates[j].toLocaleString('en-UK', {day: '2-digit', month: '2-digit'})

                transformedData[keys[i]][`${displayedDays[j]} ${date}`] = {
                    timings: slots[keys[i]]['timings'],
                    slots: {}
                };

                const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
                const formattedDate = weekDates[j].toLocaleDateString('en-CA', options);

                if (slots[keys[i]][formattedDate] !== null) {
                    if (!transformedData[keys[i]][`${displayedDays[j]} ${date}`]) {
                        transformedData[keys[i]][`${displayedDays[j]} ${date}`] = {
                            timings: slots[keys[i]]['timings'],
                            slots: {}
                        };
                    }

                    transformedData[keys[i]][`${displayedDays[j]} ${date}`]['slots'] = {
                        ...slots[keys[i]][formattedDate]
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
    }, [slots]);

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

    const handleButtonClick = (event) => {
        console.log("Clicked")
    }

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
                                const buttonClassName = isSlotValue ? "booked" : "timing";
                                const buttonProps = isSlotValue ? {disabled: true} : {onClick: () => handleButtonClick(timingValue)};

                                return (
                                    <Button key={timingValue} className={buttonClassName} {...buttonProps}>
                                        {timingValue} - {timingValue + 1}
                                    </Button>
                                );
                            })}
                    </Grid>
                </Container>
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