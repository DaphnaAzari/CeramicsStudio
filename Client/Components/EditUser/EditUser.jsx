import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './EditUser.css';

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        instagram: "",
        website: "",
        imageFile: null,
    });
    //Fetch the existing user:
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/users/${id}`);
                const user = res.data;

                setFormData({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    userName: user.userName || "",
                    email: user.email || "",
                    instagram: user.socials?.instagram || "",
                    website: user.socials?.website || "",
                    imageFile: null,
                });
            } catch (err) {
                console.error("Error fetching user:", err);
                alert("Could not load user details");
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setFormData((prev) => ({ ...prev, imageFile: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "imageFile" && !value) return;
                data.append(key, value);
            });
            data.append(
                "socials",
                JSON.stringify({
                    instagram: formData.instagram,
                    website: formData.website,
                })
            );

            const token = localStorage.getItem("token");

            //testing to see why backend is not updating:
            console.log("Submitting update data:", Object.fromEntries(data.entries()));


            await axios.put(`http://localhost:3000/users/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Profile updated successfully!");
            navigate(`/user/${id}`);
        } catch (err) {
            console.error("Error updating user:", err);
            alert("Failed to update user");
        }
    };

    // delete user 
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this account?"
        );
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:3000/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            alert("Your account has been deleted.");
            navigate("/");
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete account");
        }
    };

    return (
        <div className="register-form">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Instagram:</label>
                    <input
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Website:</label>
                    <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Profile Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="form-actions">
                    <button className="btn-submit" type="submit">
                        Save Changes
                    </button>
                    {localStorage.getItem("token") && (
                        <button type="button" onClick={handleDelete} className="btn-delete">
                            Delete Account
                        </button>
                    )}
                </div>
            </form>
        </div>
    );


}



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import './EditUser.css'

// export default function EditUser() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         userName: "",
//         email: "",
//         password: "",
//         instagram: "",
//         website: "",
//         imageFile: null,
//     });
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/users/${id}`);
//                 const user = res.data;

//                 setFormData({
//                     firstName: user.firstName || "",
//                     lastName: user.lastName || "",
//                     userName: user.userName || "",
//                     email: user.email || "",
//                     password: "", 
//                     instagram: user.socials?.instagram || "",
//                     website: user.socials?.website || "",
//                     imageFile: null,
//                 });
//             } catch (err) {
//                 console.error("Error fetching user:", err);
//                 alert("Could not load user details");
//             }
//         };

//         fetchUser();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) setFormData((prev) => ({ ...prev, imageFile: file }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const data = new FormData();
//             Object.entries(formData).forEach(([key, value]) => {
//                 if (key === "imageFile" && !value) return;
//                 if (key === "socials") return; // handled below
//                 data.append(key, value);
//             });

//             data.append(
//                 "socials",
//                 JSON.stringify({
//                     instagram: formData.instagram || "",
//                     website: formData.website || "",
//                 })
//             );

//             await axios.put(`http://localhost:5000/users/${id}`, data, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });

//             alert("User updated successfully!");
//             navigate(`/user/${id}`);
//         } catch (err) {
//             console.error("Error updating user:", err);
//             alert("Failed to update user");
//         }
//     };

//     const handleDelete = async () => {
//         if (
//             window.confirm(
//                 "Are you sure you want to delete your account? This cannot be undone."
//             )
//         ) {
//             try {
//                 const response = await fetch(
//                     `http://localhost:5000/users/${id}`,
//                     {
//                         method: "DELETE",
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     }
//                 );

//                 if (response.ok) {
//                     alert("Account deleted successfully.");
//                     localStorage.removeItem("token");
//                     navigate("/");
//                 } else {
//                     alert("Failed to delete account.");
//                 }
//             } catch (error) {
//                 console.error("Error deleting user:", error);
//                 alert("An error occurred.");
//             }
//         }
//     };

//     return (
//         <div className="register-form">
//             <h1>Edit User</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="container">
//                     <div className="form-row">
//                         <div className="form-group">
//                             <label>First Name:</label>
//                             <input
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Last Name:</label>
//                             <input
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="form-row">
//                         <div className="form-group">
//                             <label>Username:</label>
//                             <input
//                                 name="userName"
//                                 value={formData.userName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Email:</label>
//                             <input
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label>Instagram:</label>
//                         <input
//                             name="instagram"
//                             value={formData.instagram}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Website:</label>
//                         <input
//                             name="website"
//                             value={formData.website}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Profile Image:</label>
//                         <input type="file" accept="image/*" onChange={handleImageChange} />
//                     </div>

//                     {formData.imageFile && (
//                         <div className="image-preview">
//                             <img
//                                 src={URL.createObjectURL(formData.imageFile)}
//                                 alt="Preview"
//                             />
//                         </div>
//                     )}
//                 </div>

//                 <div className="form-actions">
//                     <button className="btn-submit" type="submit">
//                         Save Changes
//                     </button>

//                     {localStorage.getItem("token") && (
//                         <button type="button" onClick={handleDelete} className="btn-delete">
//                             Delete My Account
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// }
