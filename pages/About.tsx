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
          <img src="/src/assets/logo.jpg" alt="Worktrack logo" />
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
                YOU’RE ALREADY ON YOUR JOURNEY.
              </span>{" "}
              <span className="highlight">
                WORKTRACK HELPS YOU STAY CONSISTENT,
              </span>{" "}
              <span className="white">
                FOCUS ON SMALL WINS, AND BUILD REAL PROGRESS EVERY DAY.
              </span>
            </p>

            <div className="welcome-banner">
              <span className="welcome-icon">🚀</span>
              <span>Let’s keep building momentum.</span>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default About;

