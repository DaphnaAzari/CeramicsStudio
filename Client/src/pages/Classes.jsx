
import { useEffect, useState } from 'react';
import './Classes.css';

export default function Classes() {
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        // Fetch data from express backend
        fetch('http://localhost:3000/classes') // 
            .then((res) => res.json())
            .then((data) => setWorkshops(data))
            .catch((err) => console.error('Error fetching workshops:', err));
    }, []);

    return (
        <div>
            <section className="classes">
                <h1> Classes & Workshops</h1>
                <p>
                    Please join us in a variety of Throwing & Handbuilding classes. If you
                    have any questions please do not hesitate to contact us!
                </p>

                <p className="cancellations">
                    Cancellations made at least 48 hours prior to the start of a class or
                    workshop are eligible for a full refund. Unfortunately, we are unable
                    to offer refunds for cancellations made less than 48 hours in advance.
                </p>

                {workshops.length > 0 ? (
                    <>
                        <h2>Available Workshops</h2>
                        {workshops.map((w) => (
                            <div className="workshopFlex" key={w._id}>
                                <div className="workshopDiv">
                                    <h2 className="workshopName"><b>{w.workshopName}</b></h2>
                                    <p><strong>Instructor:</strong> {w.instructor}</p>
                                    {/* You can add more details here, like price, date, etc */}
                                    <p><strong>Price:</strong> ${w.price}</p>
                                    <p><strong>Date & Time:</strong> {w.dateAndTime}</p>
                                    <p><strong>Location:</strong> {w.location}</p>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No workshops found.</p>
                )}
            </section>
        </div>
    );
}




// import './Classes.css';
// export default function Classes() {
//     return (<div>

//         <section className="classes">
//             <h1> Classes & Workshops</h1>
//             <p>
//                 Please join us in a variety of Throwing & Handbuilding classes. If you have any questions please do not hesitate to contact us!
//             </p>

//             <p className="cancellations">Cancellations made at least 48 hours prior to the start of a class or workshop are eligible for a full refund.
//                 Unfortunately, we are unable to offer refunds for cancellations made less than 48 hours in advance</p>
//         </section>
//     </div>)
// }