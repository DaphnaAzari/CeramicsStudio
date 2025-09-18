import { useState } from 'react';
import './navbar.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
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
                <li onClick={closeMenu}><a href="/create-user">Register</a></li>
            </ul>
        </nav>
    );
}


