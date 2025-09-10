import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import Navbar from '../Components/Navbar/navbar';
import AboutUs from './pages/AboutUs';
import Classes from './pages/Classes';
import OurArtists from './pages/OurArtists';
import Shop from './pages/Shop';
import Events from './pages/Events';
import Contact from './pages/Contact';


function App() {

  let component
  switch (window.location.pathname) {
    case "/":
      component = null
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

  };
  return (
    <>
      <Navbar />
      {component}

      <footer className="footer">
        <div className="container">
          <span>&copy; <script>document.write(new Date().getFullYear())</script> The Community Ceramics Studio Co-op</span>
        </div>
      </footer>
    </>
  );
}

export default App;