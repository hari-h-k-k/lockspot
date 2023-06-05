import React from 'react';
import {useLocation} from 'react-router-dom';

const TurfOverview = () => {
    const location = useLocation();
    const turfKey = location.state?.turfKey; // Access the turfKey from location.state

    // Rest of your TurfOverview component code
    // TODO: Complete Turf Overview
    return (
        <div>
            <h1>Turf Overview</h1>
            <p>Turf Key: {JSON.stringify(turfKey)}</p> {/* Convert turfKey to a string */}
            {/* Rest of your component content */}
        </div>
    );
};

export default TurfOverview;
