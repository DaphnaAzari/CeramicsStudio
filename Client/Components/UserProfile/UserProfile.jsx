import React, { useEffect, useState } from 'react';
//importing useEfect to  fetch user data when components load
import { useParams } from 'react-router-dom';
// useParams lets us grab dynamic values from the URL.
import getUserById from '../../src/api/getUserById';
import './UserProfile.css';

export default function UserProfile() {
    const { id } = useParams();
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
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
        </div>
    );
}
