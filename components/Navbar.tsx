import { Link, useNavigate } from "react-router-dom";

type NavbarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ isLoggedIn, setIsLoggedIn }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container">

        {/* LOGO */}
        <div className="logo-pill">
          <Link to="/">
            <img src="/src/assets/logo.png" alt="logo" />
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
        <div className="offcanvas offcanvas-start text-bg-dark" id="offcanvasNavbar">
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title">WORKTRACK</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            />
          </div>

          <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
            <ul className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1">

              <li className="nav-item mx-2">
                <Link to="/" className="nav-link">Home</Link>
              </li>

              <li className="nav-item mx-2">
                <Link to="/about" className="nav-link">About</Link>
              </li>

              <li className="nav-item mx-2">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>

              {isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </li>

                  <li className="nav-item mx-2">
                    <Link to="/task" className="nav-link">Task</Link>
                  </li>
                </>
              )}
            </ul>

            {/* AUTH BUTTONS */}
            <div className="d-flex align-items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <button
                    className="btn px-3 py-1 rounded-3"
                    style={{ border: "1px solid #00B6B0", color: "#00B6B0" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>

                  <button
                    className="btn px-3 py-1 rounded-3"
                    style={{ border: "1px solid #00B6B0", color: "#00B6B0" }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  className="btn px-3 py-1 rounded-3"
                  style={{ border: "1px solid #ff6b6b", color: "#ff6b6b" }}
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
