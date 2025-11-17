import React, { useContext, useEffect, useState } from 'react';
//importing useEfect to  fetch user data when components load
import { useParams } from 'react-router-dom';
// useParams lets us grab dynamic values from the URL.
import { useNavigate } from "react-router-dom";
//useNavigate lets me redirect users after login/logout/reg
//used for frontend validation:
import { AuthContext } from "../../src/context/AuthContext.jsx";
import getUserById from '../../src/api/getUserById';
import './UserProfile.css';

export default function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate(); // for redirecting after logout
    const { user: loggedInUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //user: holds the user data we get from the backend.

    //loading: shows a loading state while fetching data.

    //error: captures any error if the request fails.

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch (err) {
                setError('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);


    const handleLogout = () => {
        localStorage.removeItem('token'); // clears JWT
        navigate('/login'); // redirect to login
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-profile">
            <div className="profile-header">
                <h1>{user.userName}</h1>
            </div>

            {user.image && user.image.url && (
                <div className="image-preview">
                    <img src={user.image.url} alt={`${user.userName}'s profile`} />
                </div>
            )}

            <div className="contact-details">
                <h2>{user.firstName} {user.lastName}'s Contact Info:</h2>
                <p>{user.email}</p>

                {user.socials && (
                    <div className="user-socials">
                        {user.socials.instagram && (
                            <p>
                                <a
                                    href={user.socials.instagram.startsWith('http')
                                        ? user.socials.instagram
                                        : `https://${user.socials.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Instagram
                                </a>
                            </p>
                        )}

                        {user.socials.website && (
                            <p>
                                <a
                                    href={user.socials.website.startsWith('http')
                                        ? user.socials.website
                                        : `https://${user.socials.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Website
                                </a>
                            </p>
                        )}
                    </div>
                )}
            </div>

            {loggedInUser && loggedInUser._id === id && (
                <button
                    className="add-product-btn"
                    onClick={() => navigate("/products/new")}
                >
                    Add New Product
                </button>
            )}
        </div>  
    );
}

//     return (

//         <div className="user-profile">
//             <div className="profile-header">
//                 <h1>{user.userName}</h1>

//             </div>
//             {user.image && user.image.url && (
//                 <div className="image-preview">
//                     <img src={user.image.url} alt={`${user.userName}'s profile`} />

//                 </div>
//             )}
//             <div className="contact-details">
//                 <h2>{user.firstName} {user.lastName}'s Contact Info:</h2>

//                 <p> {user.email}</p>
               

//                 {user.socials && (
//                     <div className="user-socials">
//                         {user.socials.instagram && (
//                             <p>
//                                 <a
//                                     href={user.socials.instagram.startsWith('http')
//                                         ? user.socials.instagram
//                                         : `https://${user.socials.instagram}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     Instagram
//                                 </a>
//                             </p>
//                         )}

//                         {user.socials.website && (
//                             <p>
//                                 <a
//                                     href={user.socials.website.startsWith('http')
//                                         ? user.socials.website
//                                         : `https://${user.socials.website}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     Website
//                                 </a>
//                             </p>
//                         )}
//                     </div>
//                 )}
//             </div>
//             {loggedInUser && loggedInUser._id === id && (
//                 <button
//                     className="add-product-btn"
//                     onClick={() => navigate("/products/new")}
//                 >
//                     Add New Product
//                 </button>
//             )}

//         </div>  
//         </div>

//     );
// }
