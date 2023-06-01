import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './components/home/Home.js';
import ChatGPT from './chatGPT.js';
import Profile from './components/profile/Profile.js';
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
        </Routes>
        </BrowserRouter>
      {/* <ChatGPT/>  */}
    </>
  );
}

export default App;
