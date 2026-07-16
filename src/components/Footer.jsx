export default function Footer() {
    return (
        <div className="footer-section">
            <div className="footer">
                <div className="footer-links">
                    <div className="footer-column">
                        <div>Company</div>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Jobs</a></li>
                            <li><a href="#">For the Record</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <div>Communities</div>
                        <ul>
                            <li><a href="#">For Artists</a></li>
                            <li><a href="#">Developers</a></li>
                            <li><a href="#">Advertising</a></li>
                            <li><a href="#">Investors</a></li>
                            <li><a href="#">Vendors</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <div>Useful links</div>
                        <ul>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Free Mobile App</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <div>Spotify Plans</div>
                        <ul>
                            <li><a href="#">Premium Individual</a></li>
                            <li><a href="#">Premium duo</a></li>
                            <li><a href="#">Premium family</a></li>
                            <li><a href="#">Premium Student</a></li>
                            <li><a href="#">Spotify Free</a></li>
                        </ul>
                    </div>
                </div>

                <div className="social-links">
                    <div>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-x-twitter"></i>
                    </div>
                </div>
            </div>

            <hr />

            <div>
                <p className="copyright">© 2025 Spotify AB</p>
            </div>
        </div>
    );
}
