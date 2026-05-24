import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/Task";

type PageTransitionProps = {
  children: ReactNode;
};

type AnimatedRoutesProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const pageTransition = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.main
    className="page-transition"
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.main>
);

const AnimatedRoutes = ({
  isLoggedIn,
  setIsLoggedIn,
}: AnimatedRoutesProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Home isLoggedIn={isLoggedIn} />
            </PageTransition>
          }
        />

        <Route
          path="/about"
          element={
            <PageTransition>
              <About isLoggedIn={isLoggedIn} />
            </PageTransition>
          }
        />

        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact isLoggedIn={isLoggedIn} />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <PageTransition>
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                />
              </PageTransition>
            )
          }
        />

        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <PageTransition>
                <Dashboard />
              </PageTransition>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/task"
          element={
            isLoggedIn ? (
              <PageTransition>
                <TaskPage />
              </PageTransition>
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
    </AnimatePresence>
  );
};

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

      <AnimatedRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
