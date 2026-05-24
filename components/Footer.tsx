import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

type FooterProps = {
  isLoggedIn: boolean;
};

const Footer = ({ isLoggedIn }: FooterProps) => {
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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/task">Task</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-action-btn">
                Login
              </NavLink>
              <NavLink to="/signup" className="nav-action-btn">
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>

      <div className="footer-bottom">
        © 2026 WorkTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
