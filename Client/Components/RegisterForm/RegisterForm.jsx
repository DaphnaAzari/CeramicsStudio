import { useState } from "react";
import { useNavigate } from "react-router-dom"; // this is inorder to navigate to different pages after

import axios from 'axios';
import '../../src/App.css';
import './RegisterForm.css';
// import createUser from '../../src/api/createUser';


export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        instagram: '',
        website: '',
        imageFile: null,
    });

    //intiallizing the navigation:
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevData => ({
                ...prevData,
                imageFile: file
            }));
        }
    };
    //password validation 
    const validatePassword = (password) => {
        // Must have at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };



    const submitForm = async (e) => {
        e.preventDefault();
        console.log('Submitted Formdata:', formData);

        if (!validatePassword(formData.password)) {
            alert("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
            return;
        }

        try {
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("userName", formData.userName);
            data.append("email", formData.email);
            data.append("password", formData.password);
            // data.append("socials[instagram]", formData.instagram || "");
            // data.append("socials[website]", formData.website || "");
            data.append("socials", JSON.stringify({
                instagram: formData.instagram || "",
                website: formData.website || ""
            }));
            // formData.append('socials', JSON.stringify({ instagram, website }));

            // formData.append('imageFile', file);
            if (formData.imageFile) {
                data.append("imageFile", formData.imageFile);
            }

            // FIXED: axios call stays the same
            const res = await axios.post('http://localhost:3000/users', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log("Created user:", res.data);

            // Save token for future authenticated requests
            localStorage.setItem('token', res.data.token);

            // Navigate to the user's profile page

            navigate(`/user/${res.data._id}`);
        } catch (err) {
            console.error("Error creating user:", err);
            alert("Error creating user!");
        }
    };



    //_____________________________________
    // const submitForm = async (e) => {
    //     e.preventDefault();
    //     console.log('Submitted Formdata:', formData);

    //     // frontend password check before sending to backend
    //     if (!validatePassword(formData.password)) {
    //         alert("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
    //         return; // stop form submission
    //     }

    //     try {
    //         const data = new FormData();
    //         data.append("firstName", formData.firstName);
    //         data.append("lastName", formData.lastName);
    //         data.append("userName", formData.userName);
    //         data.append("email", formData.email);
    //         data.append("password", formData.password);
    //         data.append("socials[instagram]", formData.instagram || "");
    //         data.append("socials[website]", formData.website || "");
    //         // data.append("instagram", formData.instagram);
    //         // data.append("website", formData.website);

    //         if (formData.imageFile) {
    //             data.append("imageFile", formData.imageFile); // append file properly
    //         }

    //         // const createdUser = await createUser(data); // send FormData
    //         // console.log("Created user:", createdUser);
    //         // navigate(`/user/${createdUser._id}`);
    //         //     } catch (err) {
    //         //         console.error("Error creating user:", err);
    //         //         alert("Error creating user!");
    //         //     }
    //         // };


    //         // Use axios directly to send form data
    //         const res = await axios.post('http://localhost:3000/user', data, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         });

    //         console.log("Created user:", res.data);
    //         navigate(`/user/${res.data._id}`);


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
                    <div className="form-group">
                        <label className="label">Password:</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Add your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="password-hint">
                        Password must be at least 8 characters and contain a capital letter, number, and a symbol.
                    </span>
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
                {/* <div className="form-row">
                    <div className="form-group">
                        <label className="label">Website:</label>
                        <input
                            name="website"
                            placeholder="Add your website"
                            value={formData.website}
                            onChange={handleChange} />
                    </div>
                </div> */}

                <div className="form-row single">
                    <div className="form-group">
                        <label className="label">Website:</label>
                        <input
                            name="website"
                            placeholder="Add your website"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="label">Profile Image (optional):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }))}
                    />
                </div>

                {formData.imageFile && (
                    <div className="image-preview">
                        <img
                            src={URL.createObjectURL(formData.imageFile)}
                            alt="Preview"
                        />
                    </div>
                )}

                <div className="form-actions">
                    <button className="btn-submit" type="submit">Submit</button>
                </div>
                {/* </div> */}
            </form >
        </div >
    );
}