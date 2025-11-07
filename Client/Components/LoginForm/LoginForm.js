import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginForm.css';

export default function LoginForm() {
    // holds form-inputs
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // updates form state when user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setError('');
        try {
            // Sends login request to backend
            const res = await axios.post('http://localhost:3000/user/login', formData);

            console.log("Login success:", res.data);

            // Save JWT token in storage
            localStorage.setItem('token', res.data.token);

            // redirects to user profile page using ID
            navigate(`/user/${res.data._id}`);
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };


    return (
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}