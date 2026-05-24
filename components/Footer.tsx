import logo from "../assets/logo.png";
import type { ReactNode } from "react";

const FooterIcon = ({ children }: { children: ReactNode }) => (
  <span className="footer-icon" aria-hidden="true">
    {children}
  </span>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-brand" aria-label="WorkTrack">
          <div className="logo-pill footer-logo">
            <img src={logo} alt="WorkTrack logo" />
          </div>
          <p>Plan smarter. Work better.</p>
        </section>

        <section className="footer-list" aria-label="Features">
          <p>
            <FooterIcon>
              <svg viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
                <path d="M8 4v4M16 10v4M11 16v4" />
              </svg>
            </FooterIcon>
            Task management
          </p>
          <p>
            <FooterIcon>
              <svg viewBox="0 0 24 24">
                <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
              </svg>
            </FooterIcon>
            Productivity tracking
          </p>
          <p>
            <FooterIcon>
              <svg viewBox="0 0 24 24">
                <path d="M8 12h8M12 8v8" />
                <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
              </svg>
            </FooterIcon>
            Dashboard insights
          </p>
        </section>

        <section className="footer-contact" aria-label="Contact">
          <h2>Contact</h2>
          <p>
            <FooterIcon>
              <svg viewBox="0 0 24 24">
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </FooterIcon>
            hello@worktrack.com
          </p>
          <p>
            <FooterIcon>
              <svg viewBox="0 0 24 24">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.5a2 2 0 0 1-.5 1.8L8 9.1a16 16 0 0 0 6.9 6.9l1.1-1.1a2 2 0 0 1 1.8-.5l2.5.5a2 2 0 0 1 1.7 2Z" />
              </svg>
            </FooterIcon>
            +94 77 123 4567
          </p>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://facebook.com" aria-label="Facebook">f</a>
            <a href="https://x.com" aria-label="X">X</a>
            <a href="https://instagram.com" aria-label="Instagram">IG</a>
            <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <a href="/">Legal Notice</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Cookie Policy</a>
        </div>
        <p>&copy; 2026 WorkTrack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
