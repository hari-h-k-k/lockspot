import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/home/Home.js';
import Profile from './components/profile/Profile.js';
import TurfOverview from "./components/turf/TurfOverview";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/venues" element={<div>Venues page</div>}/>
                    <Route path="/events" element={<div>Events page</div>}/>
                    <Route path="/accessories" element={<div>Accessories page</div>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/turfOverview" element={<TurfOverview/>}/>
                </Routes>
            </BrowserRouter>
            {/* <ChatGPT/>  */}
        </>
    );
}

export default App;
