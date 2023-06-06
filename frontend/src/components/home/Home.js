import './HomeStyle.css';
import '../navigation/Navbar.css'
import Navbar from '../navigation/Navbar.js';
import Searchbar from '../search/Searchbar';
import {useState} from "react";
import TurfSpace from "../turf/TurfSpace";

function Home() {
    const [location, setLocation] = useState("");

    return (
        <div>
            <div className="homepage">
                <Navbar className="navbar"/>
                <Searchbar setLocation={setLocation}/>
            </div>
            {
                <TurfSpace turfLocation={location} />
            }
        </div>
    );
}

export default Home;