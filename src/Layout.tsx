import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ProjectSlogan from "./views/ProjectEslogan.tsx";
import AboutUs from "./views/AboutUs.tsx";
import Navbar from "./components/Navbar.tsx";
import Human from "./views/Customization&Players/Human.tsx";
import Cyborg from "./views/Customization&Players/Cyborg.tsx";
import Reptile from "./views/Customization&Players/Reptile.tsx";
import Signup from "./views/LogIn/SignUp.jsx";
import InjectContext from './store/GENERAL_CONTEXT/AppContext.jsx';
import SignIn from "./views/LogIn/SignIn.jsx";
import User_Profile from "./views/Profile/User_Profile.tsx";
import PhaserConfig from "./Phaser/GameConfig/PhaserConfig.jsx";
import { AuthContext, AuthProvider } from "./store/GENERAL_CONTEXT/AuthContext.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { ReactComponentLike } from "prop-types";
import { useLoading } from "./store/GENERAL_CONTEXT/LoadingContext.tsx";
import { Loader } from "./components/Loader.tsx";

interface PrivateRouteTypes {
    component: ReactComponentLike;
}

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {
    const { loading } = useLoading();
    const [isVisible, setIsVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleAuth = localStorage.getItem('token');

    const PrivateRoute = ({ component: Component, ...restOfComponents }: PrivateRouteTypes) => {
        const { isAuthenticated } = useContext(AuthContext);
        return isAuthenticated ? <Component {...restOfComponents} /> : <Navigate to='/' />;
    }

    const toggleNavbar = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth <= 768) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [windowWidth]);

    return (
        <>
            <BrowserRouter>
                <Navbar toggleNavbar={toggleNavbar} isVisible={isVisible} />
                {loading && <Loader />}
                <AuthProvider>
                    {handleAuth ? (
                        <Routes>
                            <Route path='/about' element={<AboutUs />} />
                            <Route path='/player-info-human' element={<PrivateRoute component={Human} />} />
                            <Route path='/player-info-cyborg' element={<PrivateRoute component={Cyborg} />} />
                            <Route path='/player-info-reptile' element={<PrivateRoute component={Reptile} />} />
                            <Route path='/user-profile' element={<PrivateRoute component={User_Profile} />} />
                            <Route path='/game' element={<PrivateRoute component={PhaserConfig} />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path='/' element={<ProjectSlogan />} />
                            <Route path='/sign-up' element={<Signup />} />
                            <Route path='/sign-in' element={<SignIn />} />
                        </Routes>
                    )}
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default InjectContext(Layout);
