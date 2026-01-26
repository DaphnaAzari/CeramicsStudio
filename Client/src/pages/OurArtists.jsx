import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OurArtists.css';

export default function OurArtists() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setError(null);


                const res = await axios.get('http://localhost:8080/users');

                if (!Array.isArray(res.data)) {
                    throw new Error('Response is not an array');
                }

                setArtists(res.data);
                console.log('Fetched artists:', res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch artists');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);
    if (loading) return <p>Loading artists...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <section className="artists">
                <h1>Our Artists</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea mollitia nulla consectetur perferendis explicabo quibusdam ducimus suscipit aperiam est, eius consequuntur libero architecto ipsa, voluptatibus voluptas asperiores, placeat optio. Magni?
                </p>

                <div className="artistsFlex">
                    {artists.length > 0 ? (
                        artists.map(artist => (
                            <div key={artist._id} className="artistdiv">
                                {
                                    artist.image?.url && (
                                        <div className="artist-image">
                                            <img
                                                src={artist.image.url}
                                                alt={`${artist.firstName} ${artist.lastName}`}
                                            />
                                        </div>
                                    )
                                }


                                <h2 className="artistName">
                                    <Link to={`/user/${artist._id}`}>{artist.userName}</Link>
                                </h2>
                                <p className="artistUsername">@{artist.userName}</p>


                                {artist.socials && (
                                    <div className="artistSocials">
                                        {artist.socials.instagram && (
                                            <p>
                                                <b>Instagram:</b>{' '}
                                                <a
                                                    href={artist.socials.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="artist-link"
                                                >
                                                    {artist.socials.instagram}
                                                </a>
                                            </p>
                                        )}
                                        {artist.socials.website && (
                                            <p>
                                                <b>Website:</b>{' '}
                                                <a
                                                    href={artist.socials.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="artist-link"
                                                >
                                                    {artist.socials.website}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                )}
                                {/* )} */}
                            </div>
                        ))
                    ) : (
                        <p>No artists found.</p>
                    )
                    }
                </div >
            </section >
        </div >
    );
}


