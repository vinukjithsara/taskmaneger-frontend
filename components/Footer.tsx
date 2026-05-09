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
        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Updates</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Worktrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
