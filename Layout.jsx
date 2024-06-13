import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import ProjectSlogan from "./src/views/ProjectEslogan.jsx";
import AboutUs from "./src/views/AboutUs.jsx";
import {PlayerLab} from "./src/views/Customization&Players/PlayerLab.jsx";
import Navbar from "./src/components/Navbar.jsx";
import Human from "./src/views/Customization&Players/Human.jsx";
import Cyborg from "./src/views/Customization&Players/Cyborg.jsx";
import Reptile from "./src/views/Customization&Players/Reptile.jsx";
import Signup from "./src/views/SignUp&LogIn_Profile/SignUp.jsx";
import InjectContext, {Context} from "./src/store/AppContext.jsx";
import SignIn from "./src/views/SignUp&LogIn_Profile/SignIn.jsx";
import User_Profile from "./src/views/SignUp&LogIn_Profile/User_Profile.jsx";
import PhaserConfig from "./src/src_Phaser/GameConfig/PhaserConfig.jsx";
//Navigate


// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    //const {store} = useContext(Context);
    // console.log('isAuthenticated', store.isAuthenticated);
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

    // eslint-disable-next-line react/prop-types
    // const PrivateRoute = ({component: Component, ...restOfComponents}) => {
    //     const {store} = useContext(Context);
    //     console.log('isAuthenticated', store.isAuthenticated);
    //     return store.isAuthenticated ? <Component {...restOfComponents} /> : <Navigate to='/' />;
    //
    // }
    return (
        <BrowserRouter>
            <Navbar isVisible={isVisible} toggleNavbar={toggleNavbar} />
            <Routes>
                <Route path='/' element={<ProjectSlogan />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/sign-up' element={<Signup />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/player-lab-create' element={ <PlayerLab />} />
                <Route path='/player-info-human' element={<Human/>}/>
                <Route path='/player-info-cyborg' element={<Cyborg />}/>
                <Route path='/player-info-reptile' element={<Reptile />} />
                <Route path='/user-profile' element={<User_Profile />}/>
                <Route path='/game' element={<PhaserConfig />} />
            </Routes>
        </BrowserRouter>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default InjectContext(Layout);