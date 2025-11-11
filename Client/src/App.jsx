import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar/navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Classes from './pages/Classes';
import OurArtists from './pages/OurArtists';
import Shop from './pages/Shop';
import Events from './pages/Events';
import Contact from './pages/Contact';
import RegisterForm from '../Components/RegisterForm/RegisterForm';
import UserProfile from '../Components/UserProfile/UserProfile';



function App() {
  const location = useLocation();
  const isHome = location.pathname === '/home' || location.pathname === '/';

  return (
    <>
      <Navbar />
      <div className={isHome ? '' : 'section'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/artists" element={<OurArtists />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-user" element={<RegisterForm />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </div>
      <footer className="footer">
        <div className="container">
          <span>
            &copy; {new Date().getFullYear()} The Community Ceramics Studio Co-op
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;