import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from "../../src/context/AuthContext.jsx";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


export default function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1589);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();



    const { token, user, logout } = useContext(AuthContext);
    const userId = user?._id;

    const toggleMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };


    //use the AuthContext logout:
    const handleLogout = () => {
        logout();
        navigate("/login");
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

                {/* ⭐ login/register (only when NOT logged in) */}
                {!token && (
                    <>
                        <li onClick={() => { closeMenu(); handleLogin(); }}>
                            <a>Login</a>
                        </li>
                        <li onClick={closeMenu}>
                            <a href="/create-user">Register</a>
                        </li>
                    </>
                )}

                {/* profile/ logout (only when logged in) */}
                {token && userId && (
                    <>
                        {!isMobile && (
                            <li className="dropdown">
                                <a href={`/user/${userId}`} className="profile-link">
                                    My Profile
                                </a>

                                <ul className="dropdown-content">
                                    <li onClick={closeMenu}>
                                        <a href={`/edit/${userId}`}>Edit</a>
                                    </li>

                                    <li onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                                        <a href="#">Logout</a>
                                    </li>
                                </ul>
                            </li>
                        )}

                        {isMobile && (
                            <>
                                <li onClick={closeMenu}>
                                    <a href={`/user/${userId}`}>My Profile</a>
                                </li>

                                <li onClick={closeMenu}>
                                    <a href={`/edit/${userId}`}>Edit Profile</a>
                                </li>

                                <li onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                                    <a href="#">Logout</a>
                                </li>
                            </>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
}
