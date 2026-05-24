import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ✅ VALIDATIONS (same as your code)
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: username, // 🔥 important mapping
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful ✅");
      navigate("/login");

    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <section className="auth-page">
      <div className="home-strip">
        <h1>Sign Up</h1>
      </div>

      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Worktrack" />
        </div>

        <p className="auth-title">
          SIGN UP TO START <span>WORKING SMARTER</span>
        </p>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="CONFIRM PASSWORD"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleSignup}>
          SIGN UP
        </button>

        <p className="auth-footer">
          ALREADY HAVE AN ACCOUNT?{" "}
          <Link to="/login">LOGIN</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
