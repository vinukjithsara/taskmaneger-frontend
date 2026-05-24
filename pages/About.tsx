import logo from '/src/assets/logo.jpg'
type AboutProps = {
  isLoggedIn: boolean;
};

const About = ({ isLoggedIn }: AboutProps) => {
  return (
    <section className="about-page">

      {/* TOP STRIP */}
      <div className="home-strip">
        <h1>About Us</h1>
      </div>

      {/* CONTENT */}
      <div className="about-content">

        <div className="about-logo-pill">
         <img src={logo} alt="Worktrack201" />
        </div>

        {!isLoggedIn ? (
          <>
            <p className="about-text">
              <span className="white">
                WORKTRACK HELPS YOU BEAT PROCRASTINATION WITH SHORT,
              </span>{" "}
              <span className="highlight">
                FOCUSED SESSIONS.
              </span>{" "}
              <span className="highlight">
                TURN BIG GOALS INTO SMALL ACTIONS,
              </span>{" "}
              <span className="white">
                TRACK YOUR PROGRESS, AND STAY MOTIVATED BY WORKING
              </span>{" "}
              <span className="highlight">
                FIVE MINUTES AT A TIME, CONSISTENTLY.
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="about-text">
              <span className="white">
                YOU'RE ALREADY ON YOUR JOURNEY.
              </span>{" "}
              <span className="highlight">
                WORKTRACK HELPS YOU STAY CONSISTENT,
              </span>{" "}
              <span className="white">
                FOCUS ON SMALL WINS, AND BUILD REAL PROGRESS EVERY DAY.
              </span>
            </p>

            <div className="welcome-banner">
              <span className="welcome-icon">^</span>
              <span>Let's keep building momentum.</span>
            </div>
          </>
        )}

        <div className="about-feature-grid" aria-label="WorkTrack features">
          <article className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 6v6l4 2" />
                <path d="M21 12a9 9 0 1 1-9-9" />
                <path d="M16 3h5v5" />
              </svg>
            </span>
            <h2>Focused Sessions</h2>
            <p>Break big goals into short work sessions that are easier to start and finish.</p>
          </article>

          <article className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="m3 6 1 1 2-2" />
                <path d="m3 12 1 1 2-2" />
                <path d="m3 18 1 1 2-2" />
              </svg>
            </span>
            <h2>Task Clarity</h2>
            <p>Keep pending, completed, and overdue work visible so nothing important gets lost.</p>
          </article>

          <article className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M8 16v-5" />
                <path d="M12 16V8" />
                <path d="M16 16v-3" />
              </svg>
            </span>
            <h2>Progress Tracking</h2>
            <p>Use your dashboard to see your progress and keep building momentum every day.</p>
          </article>
        </div>

      </div>
    </section>
  );
};

export default About;
