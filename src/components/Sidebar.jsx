export default function Sidebar({ open, onClose, onSearchOpen, onSearchClose }) {
    return (
        <>
            <div className={`sidebar-overlay ${open ? "show" : ""}`} onClick={onClose} />
            <div className={`sidebar ${open ? "open" : ""}`}>
                <div className="sidebar-nav">
                    <div className="logo">
                        <a href="/">
                            <img src="/images/logo-new.png" alt="" />
                        </a>
                    </div>
                    <ul>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); onSearchClose(); }}>
                                <span><i className="fa-solid fa-house"></i></span>
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); onSearchOpen(); }}>
                                <span><i className="fa-solid fa-magnifying-glass"></i></span>
                                <span>Search</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-nav box2">
                    <ul>
                        <li>
                            <a href="#">
                                <span><i className="fa-solid fa-book"></i></span>
                                <span className="library">Your Library</span>
                            </a>
                        </li>
                        <li>
                            <div className="sidebar-scroll">
                                <div className="create-playlist">
                                    <h4>Create your first playlist</h4>
                                    <p>It's easy, we'll help you</p>
                                    <button>create-playlist</button>
                                </div>
                                <div className="create-playlist">
                                    <h4>Let's find some podcasts to follow</h4>
                                    <p>We'll keep you updated on new episodes</p>
                                    <button>Browse podcasts</button>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="privacy">
                        <ul>
                            <li>
                                <a href="#">Legal</a>
                                <a href="#">Safety & Privacy</a>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Cookies</a>
                                <a href="#">About Us</a>
                                <a href="#">Accessibility</a>
                            </li>
                        </ul>
                    </div>

                    <div className="eng-btn">
                        <button>English</button>
                    </div>
                </div>
            </div>
        </>
    );
}