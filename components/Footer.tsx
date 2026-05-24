import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <div className="logo-pill">
            <img src={logo} alt="worktrack logo" />
          </div>
          <p>Plan smarter. Work better.</p>
        </div>

        {/* LINKS */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/task">Task</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        © 2026 WorkTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
