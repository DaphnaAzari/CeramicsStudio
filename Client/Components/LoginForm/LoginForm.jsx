import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext.jsx";
import axios from "axios";
import './LoginForm.css';

export default function LoginForm() {
    // holds form-inputs
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();


    // get login() function from AuthContext - authenticating frontend!
    const { login } = useContext(AuthContext);

    // updates form state when user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Send login request to backend
            const res = await axios.post('http://localhost:8080/users/login', formData);

            console.log("Login success:", res.data);



            login(res.data.token, res.data.user);



            // Redirect to the profile page of the logged in user
            navigate(`/user/${res.data.user._id}`);

            // navigate(`/user/${res.data.user._id}`);

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

                <div className="form-actions">
                    <button type="submit" className="btn-submit">Login</button>
                </div>
                <div className="login-help">
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot password
                    </button>
                </div>
            </form>
        </div>
    );
}