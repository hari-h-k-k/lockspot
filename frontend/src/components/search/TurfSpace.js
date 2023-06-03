import react, {useEffect, useState} from "react";
import axiosInstance from '../../Interceptor.js';
import TurfCard from "./TurfCard";
import {Box, Card, Grid, GridItem} from "@chakra-ui/react";

function TurfSpace({turfLocation}) {

    const [turfList, setTurfList] = useState({});


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

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Grid templateColumns="repeat(3, 1fr)" gap={40} marginTop="50px">
                {turfList &&
                    Object.keys(turfList).map((key, index) => {
                        const turf = turfList[key];
                        const { name, sports, location } = turf;
                        return (
                            <Box key={index} w="300px" className="unitTurf">
                                <TurfCard name={name} sports={sports} location={location}/>
                            </Box>
                        );
                    })}
            </Grid>
        </div>
    );
}

export default TurfSpace;