import React, {useState} from "react";
import {Box, Container, Grid, Heading} from "@chakra-ui/react";
import BgImg from "../../assets/images/ProfileBg.jpg";
import NavBar from "../navigation/Navbar";
import "./Turf.css"

function TurfBooking() {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentDayIndex = today.getDay();
    const displayedDays = daysOfWeek.slice(currentDayIndex).concat(daysOfWeek.slice(0, currentDayIndex));


    const hours = Array.from({length: 7}, (_, index) => index + 18);

    const [selectedDay, setSelectedDay] = useState(displayedDays[0]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const gridLayout = {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
    };


    return (
        <>
            <div style={detailStyles.detailsDiv}>
                <NavBar/>
                <Box style={detailStyles.thumbnail}>
                </Box>
                <div style={detailStyles.headingDiv}>
                </div>
                <div style={detailStyles.days}>
                    {displayedDays.map((day, index) => (
                        <div
                            key={index}
                            className={`tab ${day === selectedDay ? 'selected' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : day}
                        </div>
                    ))}
                </div>

                <Container sx={{width: "70%", float: "right"}} maxW="container.xl" p="2rem">
                    <Heading sx={{textAlign: "center", marginBottom: "30px"}}>Timings</Heading>

                    <Grid {...gridLayout}>
                        {selectedDay && (
                            hours.map((hour, hourIndex) => (
                                <div key={hourIndex}>{hour}:00 - {hour + 1}:00</div>
                            ))
                        )}
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