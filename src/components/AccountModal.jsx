import { useState } from "react";
import { friendlyAuthError } from "../hooks/useAuth";

export default function AccountModal({ mode, user, auth, onClose }) {
    if (mode === "profile") return <ProfileForm user={user} auth={auth} onClose={onClose} />;
    if (mode === "settings") return <SettingsForm user={user} auth={auth} onClose={onClose} />;
    return null;
}

function Shell({ children, onClose }) {
    return (
        <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-box">{children}</div>
        </div>
    );
}

function ProfileForm({ user, auth, onClose }) {
    const [name, setName] = useState(user?.displayName || "");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    async function handleSave() {
        try {
            await auth.changeDisplayName(name.trim());
            onClose();
        } catch (error) {
            setMessage(friendlyAuthError(error));
            setIsError(true);
        }
    }

    return (
        <Shell onClose={onClose}>
            <h3>Your profile</h3>
            {message && <p className={isError ? "auth-error" : "auth-success"}>{message}</p>}

            <label className="form-label">Display name</label>
            <input
                type="text"
                placeholder="Add a display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="form-label">Email</label>
            <input type="email" value={user?.email || ""} disabled />

            <div className="modal-actions">
                <button className="modal-cancel" onClick={onClose}>Cancel</button>
                <button className="modal-confirm" onClick={handleSave}>Save</button>
            </div>
        </Shell>
    );
}

function SettingsForm({ user, auth, onClose }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    async function handleChangePassword() {
        if (!currentPassword || newPassword.length < 6) {
            setMessage("Enter your current password and a new password of at least 6 characters.");
            setIsError(true);
            return;
        }
        try {
            await auth.changePassword(currentPassword, newPassword);
            setMessage("Password updated successfully.");
            setIsError(false);
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            setMessage(friendlyAuthError(error));
            setIsError(true);
        }
    }

    async function handleDeleteAccount() {
        if (!currentPassword) {
            setMessage("Enter your current password above first to confirm account deletion.");
            setIsError(true);
            return;
        }
        if (!window.confirm("This permanently deletes your account. Are you sure?")) return;
        try {
            await auth.deleteAccount(currentPassword);
            onClose();
        } catch (error) {
            setMessage(friendlyAuthError(error));
            setIsError(true);
        }
    }

    return (
        <Shell onClose={onClose}>
            <h3>Settings</h3>
            {message && <p className={isError ? "auth-error" : "auth-success"}>{message}</p>}

            <label className="form-label">Change password</label>
            <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="New password"
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="modal-actions">
                <button className="modal-cancel" onClick={onClose}>Cancel</button>
                <button className="modal-confirm" onClick={handleChangePassword}>Update password</button>
            </div>

            <div className="danger-zone">
                <p className="danger-zone-label">Danger zone</p>
                <button type="button" className="auth-danger-btn" onClick={handleDeleteAccount}>
                    Delete account
                </button>
            </div>
        </Shell>
    );
}
