import logo from "../assets/logo.jpg";


type ContactProps = {
  isLoggedIn: boolean;
};

const Contact = ({ isLoggedIn }: ContactProps) => {
  return (
    <section className="contact-page">

      {/* TOP STRIP */}
      <div className="home-strip">
        <h1>Contact</h1>
      </div>

      {/* CONTENT */}
      <div className="contact-content">

        <div className="contact-logo-pill">
          <img src={logo} alt="Worktrack logo" />
        </div>

        {/* BEFORE LOGIN */}
        {!isLoggedIn && (
          <>
            <p className="contact-text">
              Have questions, feedback, or ideas?
              <span className="highlight"> We’d love to hear from you.</span>
              <br />
              Reach out and let’s build better focus together.
            </p>

            <div className="contact-info">
              <div>
                <span className="label">Email</span>
                <span className="value">support@worktrack.app</span>
              </div>

              <div>
                <span className="label">Phone</span>
                <span className="value">+94 77 707 8080</span>
              </div>
            </div>
          </>
        )}

        {/* AFTER LOGIN */}
        {isLoggedIn && (
          <>
            <p className="contact-text">
              You’re already part of <span className="highlight">Worktrack</span>.
              <br />
              If you need help, have feedback, or suggestions,
              we’re always here for you.
            </p>

            <div className="welcome-banner">
              <span className="welcome-icon">📩</span>
              <span>We usually respond within 24 hours.</span>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default Contact;

