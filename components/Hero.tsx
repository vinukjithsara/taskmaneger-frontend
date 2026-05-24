import heroImg from "../assets/hero.png";
import featureImg from "../assets/2hero.png";
import { useNavigate } from "react-router-dom";

type HeroProps = {
  isLoggedIn: boolean;
};

const Hero = ({ isLoggedIn }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* TOP STRIP */}
      <div className="home-strip">
        <h1>Home</h1>
      </div>

      {/* HERO MAIN CONTAINER */}
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <h2 className="hero-title">
            Why use <span>Worktrack</span>?
          </h2>

          <p className="hero-desc">
            Beat procrastination with short, focused sessions.
            Turn big goals into small actions and track your progress
            consistently.
          </p>

          {/* CTA ONLY WHEN LOGGED OUT */}
          {!isLoggedIn && (
            <button
              className="hero-cta"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right">
          <img
            src={heroImg}
            alt="Worktrack illustration"
            className="hero-img"
          />
        </div>
      </div>

      <div className="home-feature-section">
        <div className="home-feature-image">
          <img src={featureImg} alt="WorkTrack task board preview" />
        </div>

        <div className="home-feature-copy">
          <h2>A task management solution</h2>
          <p>
            WorkTrack keeps your tasks, deadlines, and progress in one clear
            workspace so you can focus on what matters next.
          </p>
          <p>
            Create tasks, update their status, and <strong>track completed and
            pending work</strong> from a simple dashboard built for everyday
            productivity.
          </p>
        </div>
      </div>

      <div className="home-benefits-section">
        <h2>WorkTrack and its benefits</h2>

        <div className="benefits-grid">
          <article className="benefit-item">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 11h8" />
                <path d="M8 15h5" />
                <path d="M6 3h12a2 2 0 0 1 2 2v14l-4-3H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
              </svg>
            </span>
            <h3>Clear task planning</h3>
            <p>
              Keep every task, note, and deadline organized so your next action
              is always easy to find.
            </p>
          </article>

          <article className="benefit-item">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 21a8 8 0 1 0-8-8" />
                <path d="M3 13h4v4" />
                <path d="M12 7v6l4 2" />
              </svg>
            </span>
            <h3>Better consistency</h3>
            <p>
              Build momentum with small focused sessions and turn large goals
              into manageable daily progress.
            </p>
          </article>

          <article className="benefit-item">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
              </svg>
            </span>
            <h3>Fast workflow</h3>
            <p>
              Add, edit, complete, and review tasks quickly without wasting time
              on repeated manual tracking.
            </p>
          </article>

          <article className="benefit-item">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m4 7 2 2 4-4" />
                <path d="M13 7h7" />
                <path d="m4 14 2 2 4-4" />
                <path d="M13 14h7" />
                <path d="M5 21h15" />
              </svg>
            </span>
            <h3>Progress control</h3>
            <p>
              See completed and pending work clearly, helping you make better
              decisions about your day.
            </p>
          </article>
        </div>
      </div>

      {/* WELCOME MESSAGE AFTER LOGIN */}
      {isLoggedIn && (
        <div className="welcome-banner">
          <span className="welcome-icon">👋</span>
          <span>Welcome back. Let’s continue your progress.</span>
        </div>
      )}
    </section>
  );
};

export default Hero;
