import './HomeStyle.css';
import '../navigation/Navbar.css'
import Navbar from '../navigation/Navbar.js';
import Searchbar from '../search/Searchbar';
import {useEffect, useState} from "react";
import TurfSpace from "../turf/TurfSpace";
//
// function Home() {
//     const [location, setLocation] = useState("");
//
//     useEffect(() => {
//         if(location !== "") {
//             sessionStorage.setItem('location', JSON.stringify(location))
//         }
//         if(JSON.parse(sessionStorage.getItem('location')) !== null) {
//             setLocation(JSON.parse(sessionStorage.getItem('location')))
//         }
//     }, [location]);
//
//
//     return (
//         <div>
//             <div className="homepage">
//                 <Navbar className="navbar"/>
//                 <Searchbar setLocation={setLocation}/>
//             </div>
//             {location &&
//                 <TurfSpace turfLocation={location}/>
//             }
//         </div>
//     );
// }
//
// export default Home;


function Home() {
    const [location, setLocation] = useState('');

    useEffect(() => {
        // Clear session storage on refresh
        window.onbeforeunload = () => {
            sessionStorage.removeItem('location');
        };

        // Retrieve location from session storage
        const storedLocation = JSON.parse(sessionStorage.getItem('location'));
        if (storedLocation) {
            setLocation(storedLocation);
        }

        return () => {
            setLocation('');
        };
    }, []);

    return (
        <div>
            <div className="homepage">
                <Navbar className="navbar"/>
                <Searchbar setLocation={setLocation}/>
            </div>
            {location && <TurfSpace turfLocation={location}/>}
        </div>
    );
}

export default Home;