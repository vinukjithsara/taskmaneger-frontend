import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/Task";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ================= CHECK LOGIN ON REFRESH ================= */
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} />}
        />

        <Route
          path="/about"
          element={<About isLoggedIn={isLoggedIn} />}
        />

        <Route
          path="/contact"
          element={<Contact isLoggedIn={isLoggedIn} />}
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/task"
          element={
            isLoggedIn ? (
              <TaskPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* UNKNOWN ROUTE */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;