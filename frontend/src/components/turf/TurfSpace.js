import { useEffect, useState } from "react";
import axiosInstance from '../../Interceptor.js';
import TurfCard from "./TurfCard";
import { Container, Grid, Heading, useToast } from "@chakra-ui/react";
import { useQuery } from 'react-query';
import "./Turf.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TurfSpace({ turfLocation }) {

    // const [turfList, setTurfList] = useState({});
    // const userDetails = useSelector(state => state.user);
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const toast = useToast();
    const navigate = useNavigate();

    const getTurfList = async () => {
        const response = await axiosInstance({
            method: 'get',
            url: '/getTurfs',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                location: turfLocation
            }
        });
        return response.data;
    };
    
    const {
        isLoading: isTurfList,
        error: turfListError,
        data: turfList,
      } = useQuery(['getTurf', turfLocation,{staleTime: 300000}], getTurfList);

    

    // useEffect(() => {
    //     axiosInstance({
    //         method: 'get',
    //         url: '/getTurfs',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         params: {
    //             location: turfLocation
    //         }
    //     }).then(function (responseData) {
    //         const length = Object.keys(responseData.data).length;
    //         if (length > 0) {
    //             setTurfList(responseData.data)
    //         }
    //     });
    // }, [turfLocation]);

    const handleCardClick = (turfKey) => {
        if (!userDetails.token) {
            toast({
                title: "Log in Status",
                description: "Please log in to view turf details",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } else {
            console.log("Clicked on", turfKey)
            navigate('/turfDetails', { state: { turfKey } });
        }
    };

    const gridLayout = {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
    };
    if(turfList)
    {return (
        <div className="turfPage">
            <Container maxW="container.xl" p="2rem">

                <Heading className="turfHeading">Turf List</Heading>
                <Grid {...gridLayout}>
                    {Object.keys(turfList).map((key) => {
                            const turf = turfList[key];
                            console.log(key)
                            console.log(turfList)
                            const { id, name, sports, location } = turf;
                            return (
                                <TurfCard name={name} sports={sports} location={location}
                                    handleCardClick={handleCardClick} turfKey={id} />
                            );
                        })}

                </Grid>
            </Container>
        </div>
    )}
    else{
        return(
            <div>
                Error loading user list
            </div>
        )
    };
}

export default TurfSpace;