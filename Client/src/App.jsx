import './App.css';
import { useEffect, useState } from 'react';
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



function App() {

  const path = window.location.pathname;

  let component
  switch (window.location.pathname) {
    case "/home":
      component = <Home />
      break
    case "/about":
      component = <AboutUs />
      break
    case "/classes":
      component = <Classes />
      break
    case "/artists":
      component = <OurArtists />
      break
    case "/shop":
      component = <Shop />
      break
    case "/contact":
      component = <Contact />
      break
    case "/events":
      component = <Events />
      break
    case "/create-user":
      component = <RegisterForm />
      break
    default:
    case "/":
      component = null;
      break;
  };

  const isHome = path === '/home' || path === '/';

  return (
    <>
      <Navbar />
      <div className={isHome ? '' : 'section'}>
        {component}
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

