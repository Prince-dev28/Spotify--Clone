import { useState, useEffect } from "react";
import { friendlyAuthError } from "../hooks/useAuth";

export default function AuthModal({ mode, initialMessage, onClose, onModeChange, auth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(initialMessage || "");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setMessage(initialMessage || "");
        setIsError(false);
    }, [initialMessage, mode]);

    const isSignup = mode === "signup";

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (isSignup) {
                await auth.signUp(email, password);
            } else {
                await auth.logIn(email, password);
            }
            onClose();
        } catch (error) {
            setMessage(friendlyAuthError(error));
            setIsError(true);
        }
    }

    async function handleGoogle() {
        try {
            await auth.googleSignIn();
            onClose();
        } catch (error) {
            setMessage(friendlyAuthError(error));
            setIsError(true);
        }
    }

    async function handleForgotPassword() {
        if (!email) {
            setMessage("Enter your email above first, then click 'Forgot your password?' again.");
            setIsError(true);
            return;
        }
        try {
            await auth.resetPassword(email);
            setMessage("Password reset email sent — check your inbox.");
            setIsError(false);
        } catch (error) {
            setMessage(friendlyAuthError(error));
            setIsError(true);
        }
    }

    return (
        <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-box">
                <h3>{isSignup ? "Sign up for Spotify" : "Log in to Spotify"}</h3>

                {message && <p className={isError ? "auth-error" : "auth-success"}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email address"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        minLength={6}
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="modal-actions" style={{ justifyContent: "stretch", marginTop: 4 }}>
                        <button type="submit" className="modal-confirm auth-submit-btn">
                            {isSignup ? "Sign up" : "Log in"}
                        </button>
                    </div>
                </form>

                {!isSignup && (
                    <p className="auth-link" onClick={handleForgotPassword}>Forgot your password?</p>
                )}

                <div className="auth-divider"><span>or</span></div>

                <button type="button" className="auth-google-btn" onClick={handleGoogle}>
                    <i className="fa-brands fa-google"></i> Continue with Google
                </button>

                <p className="auth-switch">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <a href="#" onClick={(e) => { e.preventDefault(); onModeChange(isSignup ? "login" : "signup"); }}>
                        {isSignup ? "Log in" : "Sign up"}
                    </a>
                </p>
            </div>
        </div>
    );
}
