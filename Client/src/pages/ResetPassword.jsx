import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";
export default function ResetPassword() {
    // grabs token from URL
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:8080/users/reset-password/${token}`,
                { password }
            );

            setMessage(res.data.message || "Password reset successful!");
            setTimeout(() => {
                // redirect to login after 2 seconds
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "Failed to reset password. Try again."
            );
        }
    };

    return (
        <div className="reset-password-page">
            <h1>Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}
