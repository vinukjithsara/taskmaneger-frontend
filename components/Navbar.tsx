import logo from '/src/assets/logo.png'
import { Link, NavLink, useNavigate } from "react-router-dom";


type NavbarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ isLoggedIn, setIsLoggedIn }: NavbarProps) => {
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container">

        {/* LOGO */}
        <div className="logo-pill">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* TOGGLER */}
        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* OFFCANVAS */}
        <div className="offcanvas offcanvas-start text-bg-dark worktrack-offcanvas" id="offcanvasNavbar">
          <div className="offcanvas-header border-bottom">
            <div className="offcanvas-brand">
              <div className="logo-pill">
                <img src={logo} alt="WorkTrack logo" />
              </div>
              <h5 className="offcanvas-title">WORKTRACK</h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            />
          </div>

          <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
            <ul className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1">

              <li className="nav-item mx-2">
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
              </li>

              <li className="nav-item mx-2">
                <NavLink to="/about" className={navLinkClass}>About</NavLink>
              </li>

              <li className="nav-item mx-2">
                <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
              </li>

              {isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                  </li>

                  <li className="nav-item mx-2">
                    <NavLink to="/task" className={navLinkClass}>Task</NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* AUTH BUTTONS */}
            <div className="d-flex align-items-center gap-3 nav-auth-actions">
              {!isLoggedIn ? (
                <>
                  <button
                    className="btn px-3 py-1 rounded-3 nav-action-btn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>

                  <button
                    className="btn px-3 py-1 rounded-3 nav-action-btn"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  className="btn px-3 py-1 rounded-3 nav-action-btn logout"
                  onClick={() => {
                    setIsLoggedIn(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
