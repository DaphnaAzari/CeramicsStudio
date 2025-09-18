import { useState } from "react";
import axios from 'axios';
import '../../src/App.css';
import './RegisterForm.css';
import createUser from '../../src/api/createUser';


export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        instagram: '',
        website: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault()
        console.log('Submitted Formdata:', formData)
        await createUser(formData)
        console.log("after the create")

    }


    return (
        <div className="register-form">
            <h1 className="h1">Register New User</h1>
            <form onSubmit={submitForm}>
                <div className="container">

                    {/* row1  */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">First Name:</label>
                            <input
                                name="firstName"
                                placeholder="Add your first name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Last Name:</label>
                            <input
                                name="lastName"
                                placeholder="Add your last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* row2 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Username:</label>
                            <input
                                name="userName"
                                placeholder="Add your username"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Email:</label>
                            <input
                                name="email"
                                placeholder="Add your email"
                                value={formData.email}
                                onChange={handleChange} />
                        </div>
                    </div>

                    {/* row3 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Password:</label>
                            <input
                                name="password"
                                placeholder="Add your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Instagram:</label>
                            <input
                                name="instagram"
                                placeholder="Add your Instagram"
                                value={formData.instagram}
                                onChange={handleChange} />
                        </div>
                    </div>

                    {/* row4  */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Website:</label>
                            <input
                                name="website"
                                placeholder="Add your website"
                                value={formData.website}
                                onChange={handleChange} />
                        </div>
                    </div>


                    <div className="form-actions">
                        <button className="btn-submit" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}