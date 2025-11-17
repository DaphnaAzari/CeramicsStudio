import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
// import { AuthContext } from "../../src/context/AuthContext.jsx";
import { AuthContext } from "../../src/context/AuthContext.jsx";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


export default function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1589);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // const token = localStorage.getItem('token');
    // const userId = localStorage.getItem('userId');

    const { token, user } = useContext(AuthContext);
    const userId = user?._id;

    const toggleMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1589);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <nav className="nav">
            <a href="/" className="site-title">The Ceramics Studio Co-op</a>

            <button className="menu-toggle" onClick={toggleMenu}>
                <DensityMediumIcon />
            </button>

            <ul className={`navMenu ${isMobileMenuOpen ? 'active' : ''}`}>
                <li onClick={closeMenu}><a href="/about">About Us</a></li>
                <li onClick={closeMenu}><a href="/classes">Classes & Workshops</a></li>
                <li onClick={closeMenu}><a href="/artists">Our Artists</a></li>
                <li onClick={closeMenu}><a href="/shop">Shop</a></li>
                <li onClick={closeMenu}><a href="/events">Events</a></li>
                <li onClick={closeMenu}><a href="/contact">Contact us</a></li>


                {!token && (
                    <>
                        <li onClick={() => { closeMenu(); handleLogin(); }}><a>Login</a></li>
                        <li onClick={closeMenu}><a href="/create-user">Register</a></li>
                    </>
                )}
                {token && userId && (
                    <>
                        {!isMobile && (
                            // desktop version:
                            <li className="dropdown">
                                <a href={`/user/${userId}`} className="profile-link">
                                    My Profile
                                </a>

                                <ul className="dropdown-content">
                                    <li onClick={closeMenu}>
                                        <a href={`/edit/${userId}`}>Edit</a>
                                    </li>

                                    <li
                                        onClick={(e) => {
                                            e.preventDefault();
                                            closeMenu();
                                            handleLogout();
                                        }}
                                    >
                                        <a href="#">Logout</a>
                                    </li>
                                </ul>
                            </li>
                        )}

                        {isMobile && (
                            // phone & tablet:
                            <>
                                <li onClick={closeMenu}>
                                    <a href={`/user/${userId}`}>My Profile</a>
                                </li>

                                <li onClick={closeMenu}>
                                    <a href={`/edit/${userId}`}>Edit Profile</a>
                                </li>

                                <li
                                    onClick={(e) => {
                                        e.preventDefault();
                                        closeMenu();
                                        handleLogout();
                                    }}
                                >
                                    <a href="#">Logout</a>
                                </li>
                            </>
                        )}
                    </>
                )}
                {/* {token && userId && (
                    <li className="dropdown">
                        <a href={`/user/${userId}`} className="profile-link">
                            My Profile
                        </a>

                        <ul className="dropdown-content">
                            <li onClick={closeMenu}>
                                <a href={`/edit/${userId}`}>Edit</a>
                            </li>

                            <li onClick={() => { closeMenu(); handleLogout(); }}>
                                <a href="#">Logout</a>
                            </li>
                        </ul>
                    </li>
                )} */}


            </ul>
        </nav>
    );
}


