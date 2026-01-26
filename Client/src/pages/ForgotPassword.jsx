import { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // frontend only for now
        if (!email) {
            setError("Please enter your email");
            return;
        }

        setMessage("If an account exists with this email, you will receive reset instructions.");
    };

    return (
        <div className="forgot-password">
            <h1>Forgot Password</h1>
            <p>Please enter your email and we’ll send you instructions to reset your password</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">Send reset link</button>
            </form>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}