import { useState, useRef, useEffect } from "react";

export default function TopNav({
    onMenuToggle,
    searchQuery,
    onSearchChange,
    searchActive,
    onSearchOpen,
    onSearchClose,
    user,
    onOpenAuth,
    onOpenProfile,
    onOpenSettings,
    onLogout
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const label = user?.displayName || user?.email || "";
    const initial = label ? label.charAt(0).toUpperCase() : "";

    return (
        <div className="top-nav">
            <div className="prev-btn">
                <button className="menu-toggle" aria-label="Toggle menu" onClick={onMenuToggle}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <button className="nav-arrow"><i className="fa-solid fa-chevron-left"></i></button>
                <button className="nav-arrow"><i className="fa-solid fa-chevron-right"></i></button>
            </div>

            <div className={`search-bar ${searchActive ? "active" : ""}`}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    placeholder="What do you want to play?"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={onSearchOpen}
                />
                <i
                    className={`fa-solid fa-xmark search-clear-icon ${searchQuery ? "show" : ""}`}
                    onClick={() => {
                        onSearchChange("");
                        onSearchClose();
                    }}
                ></i>
            </div>

            {!user && (
                <div className="login-btn">
                    <button className="sign-up" onClick={() => onOpenAuth("signup")}>Sign-Up</button>
                    <button className="login" onClick={() => onOpenAuth("login")}>Login</button>
                </div>
            )}

            {user && (
                <div className="user-menu" ref={wrapperRef}>
                    <div className="user-avatar-wrapper" onClick={() => setDropdownOpen((v) => !v)}>
                        <span className="user-avatar" title={label}>{initial}</span>
                        <div className={`user-dropdown ${dropdownOpen ? "show" : ""}`}>
                            <div
                                className="user-dropdown-item"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    onOpenProfile();
                                }}
                            >
                                <i className="fa-solid fa-user"></i> Profile
                            </div>
                            <div
                                className="user-dropdown-item"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    onOpenSettings();
                                }}
                            >
                                <i className="fa-solid fa-gear"></i> Settings
                            </div>
                            <div className="user-dropdown-divider"></div>
                            <div
                                className="user-dropdown-item"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    onLogout();
                                }}
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
