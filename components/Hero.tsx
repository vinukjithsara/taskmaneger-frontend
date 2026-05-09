import heroImg from "../assets/hero.png";
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
