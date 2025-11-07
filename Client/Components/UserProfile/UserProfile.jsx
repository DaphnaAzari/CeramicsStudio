import React, { useEffect, useState } from 'react';
//importing useEfect to  fetch user data when components load
import { useParams } from 'react-router-dom';
// useParams lets us grab dynamic values from the URL.
import { useNavigate } from "react-router-dom";
//useNavigate lets me redirect users after login/logout/reg
import getUserById from '../../src/api/getUserById';
import './UserProfile.css';

export default function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate(); // for redirecting after logout
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
                <h1>User Profile</h1>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>

            <p className="user-fullname">
                <span className="label">Full Name:</span> {user.firstName} {user.lastName}
            </p>
            <p><span className="label">Username:</span> {user.userName}</p>
            <p><span className="label">Email:</span> {user.email}</p>
            {user.socials && (
                <>
                    <p><span className="label">Instagram:</span> {user.socials.instagram}</p>
                    <p><span className="label">Website:</span> {user.socials.website}</p>
                </>
            )}
            {user.image && user.image.url && (
                <div className="image-preview">
                    <img src={user.image.url} alt={`${user.userName}'s profile`} />
                </div>
            )}
        </div>
    );
}
