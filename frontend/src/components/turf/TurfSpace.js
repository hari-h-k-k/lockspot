import {useEffect, useState} from "react";
import axiosInstance from '../../Interceptor.js';
import TurfCard from "./TurfCard";
import {Container, Grid, Heading, useToast} from "@chakra-ui/react";

import "./Turf.css"
import {useSelector} from "react-redux";

function TurfSpace({turfLocation}) {

    const [turfList, setTurfList] = useState({});
    const userDetails = useSelector(state => state.user);
    const toast = useToast();

    useEffect(() => {
        axiosInstance({
            method: 'get',
            url: '/getTurfs',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                location: turfLocation
            }
        }).then(function (responseData) {
            const length = Object.keys(responseData.data).length;
            if (length > 0) {
                setTurfList(responseData.data)
            }
        });
    }, [turfLocation]);

    // useEffect(() => {
    // console.log(turfList)
    // }, [turfList]);

    const handleCardClick = () => {
        if (!userDetails.loginState) {
            toast({
                title: "Log in Status",
                description: "Please log in to view turf details",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } else {
            // Handle turf card click
        }
    };

    const gridLayout = {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
    };

    return (
        <div className="turfPage">
            <Container maxW="container.xl" p="2rem">

                <Heading className="turfHeading">Turf List</Heading>
                <Grid {...gridLayout}>
                    {turfList &&
                        Object.keys(turfList).map((key) => {
                            const turf = turfList[key];
                            const {name, sports, location} = turf;
                            return (
                                <TurfCard name={name} sports={sports} location={location}
                                          handleCardClick={handleCardClick}/>
                            );
                        })}

                </Grid>
            </Container>
        </div>
    );
}

export default TurfSpace;