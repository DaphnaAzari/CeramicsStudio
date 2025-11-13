import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
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
                {/* {!token && <li onClick={() => { closeMenu(); handleLogin(); }}><a>Login</a></li>}
                {token && <li onClick={() => { closeMenu(); handleLogout(); }}><a>Logout</a></li>}
                {!token && <li onClick={closeMenu}><a href="/create-user">Register</a></li>}

                {token && (
                    <>
                        {userId && (
                            <>
                                <li onClick={closeMenu}><a href={`/user/${userId}`}>My Profile</a></li>
                                <li onClick={closeMenu}><a href={`/edit/${userId}`}>Edit Profile</a></li>
                            </>
                        )}
                        <li onClick={() => { closeMenu(); handleLogout(); }}><a>Logout</a></li>
                    </>
                )} */}

                {!token && (
                    <>
                        <li onClick={() => { closeMenu(); handleLogin(); }}><a>Login</a></li>
                        <li onClick={closeMenu}><a href="/create-user">Register</a></li>
                    </>
                )}

                {token && (
                    <>
                        {userId && (
                            <>
                                <li onClick={closeMenu}><a href={`/user/${userId}`}>My Profile</a></li>
                                <li onClick={closeMenu}><a href={`/edit/${userId}`}>Edit Profile</a></li>
                            </>
                        )}
                        <li onClick={() => { closeMenu(); handleLogout(); }}><a>Logout</a></li>
                    </>
                )}

            </ul>
        </nav>
    );
}


