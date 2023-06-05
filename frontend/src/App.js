import './App.css';
import { Button, Center,Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/home/Home.js';
import ChatGPT from './chatGPT.js';
import Profile from './components/profile/Profile.js';
import { useSelector } from 'react-redux';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/venues" element={<div>Venues page</div>} />
                    <Route path="/events" element={<div>Events page</div>} />
                    <Route path="/accessories" element={<div>Accessories page</div>} />
                    <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                </Routes>
            </BrowserRouter>
            {/* <ChatGPT/>  */}
        </>
    );
};

function PrivateRoute({ component: Component }) {
    const userDetails = useSelector(state => state.user);
    const isAuthenticated = userDetails.loginState;
    const navigate = useNavigate();
    return (
        isAuthenticated ? (
            <Component />
        ) : (
            <>
                <h1>Invalid URL.Try logging in.</h1>
                <Flex
                    height="100vh"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Center>
                        <Button colorScheme="teal" mr={2} onClick={() => navigate("/")}>
                            Return to Home page
                        </Button>
                    </Center>
                </Flex>
            </>
        )
    );
};

export default App;
