import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

type LoginProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SAVE USER ID
      localStorage.setItem("userId", data.user.id);

      console.log("LOGIN SUCCESS:", data);

      setIsLoggedIn(true);
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <section className="auth-page">
      <div className="home-strip">
        <h1>Login</h1>
      </div>

      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Worktrack" />
        </div>

        <p className="auth-title">
          WELCOME TO <span>WORKTRACK</span>
        </p>
        <p className="auth-subtitle">
          PLEASE LOGIN TO CONTINUE
        </p>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          LOGIN
        </button>

        <p className="auth-footer">
          DON’T HAVE AN ACCOUNT?{" "}
          <Link to="/signup">SIGN UP</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;