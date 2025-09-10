export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">The Community Ceramics Studio Co-op </a>
        <ul className='navMenu'>


            <li className="active"><a href="/about">About Us</a></li>
            <li><a href="/classes">Classes & Workshops</a></li>
            <li><a href="/artists">Our Artists</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/contact">Contact us</a></li>

        </ul>
    </nav>
}



// import React from 'react'
// import "./navbar.css"

// const Navbar = () => {
//     return (
//         <div className='navbar'>
//             <ul className='navMenu'>


//                 <li>Our History</li>
//                 <li>Classes & Workshops</li>
//                 <li>Our Artists</li>
//                 <li>Shop</li>
//                 <li>Events</li>
//                 <li>Contact us</li>

//             </ul>
//         </div>
//     )
// }
// export default Navbar