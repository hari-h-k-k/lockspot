import './HomeStyle.css';
import '../navigation/Navbar.css'
import Navbar from '../navigation/Navbar.js';
import BgImg from '../../assets/images/HomeBackground.jpg';
import Searchbar from '../search/Searchbar';
import react, {useState} from "react";
import TurfSpace from "../search/TurfSpace";

function Home() {
    const [location, setLocation] = useState("");

    return (
        <div>
            <div className="homepage">
                <Navbar className="navbar"/>
                <Searchbar setLocation={setLocation}/>
            </div>
            {location &&
                <TurfSpace turfLocation={location} />
            }
        </div>
    );
}

export default Home;