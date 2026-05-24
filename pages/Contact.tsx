import logo from "../assets/logo.jpg";

type ContactProps = {
  isLoggedIn: boolean;
};

const Contact = ({ isLoggedIn }: ContactProps) => {
  return (
    <section className="contact-page">
      <div className="home-strip">
        <h1>Contact</h1>
      </div>

      <div className="contact-content">
        <div className="contact-logo-pill">
          <img src={logo} alt="Worktrack logo" />
        </div>

        <p className="contact-text">
          Have questions, feedback, or ideas?
          <span className="highlight"> We'd love to hear from you.</span>
          <br />
          Reach out anytime and let's build better focus together.
        </p>

        {isLoggedIn && (
          <p className="contact-member-note">
            You're part of WorkTrack already, so our support team can help with
            tasks, dashboards, deadlines, or account questions.
          </p>
        )}

        <div className="contact-info">
          <div>
            <span className="label">Email</span>
            <span className="value">support@worktrack.app</span>
          </div>

          <div>
            <span className="label">Phone</span>
            <span className="value">+94 77 707 8080</span>
          </div>

          <div>
            <span className="label">Response Time</span>
            <span className="value">Within 24 hours</span>
          </div>
        </div>

        <section className="contact-reviews" aria-labelledby="contact-reviews-title">
          <h2 id="contact-reviews-title">Customer Reviews</h2>

          <div className="contact-review-grid">
            <article className="contact-review-card">
              <div className="review-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <p>
                WorkTrack helped me stop forgetting small tasks. The dashboard
                makes my pending work clear every morning.
              </p>
              <span>- Nethmi Perera</span>
            </article>

            <article className="contact-review-card">
              <div className="review-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <p>
                Simple, fast, and easy to use. I like how quickly I can add a
                task and mark it done when I finish.
              </p>
              <span>- Kavindu Silva</span>
            </article>

            <article className="contact-review-card">
              <div className="review-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <p>
                The deadline tracking is exactly what I needed for college work.
                It keeps me more consistent.
              </p>
              <span>- Amani Fernando</span>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contact;
