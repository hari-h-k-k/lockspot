import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './components/home/Home.js';
import ChatGPT from './chatGPT.js';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/venues" element={<div>Venues page</div>}/>
            <Route path="/events" element={<div>Events page</div>}/>
            <Route path="/accessories" element={<div>Accessories page</div>}/>
            <Route path="/profile" element={<div>Profile page</div>}/>
        </Routes>
        </BrowserRouter>
      {/* <ChatGPT/>  */}
    </>
  );
}

export default App;
