import React from "react";
import {
  BrowserRouter as Router,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./components/layout/Header";
import BookmarkManager from "./components/layout/BookmarkManager";
import StarryBackground from "./components/layout/StarryBackground";
import About from "./pages/About/About";
import HomePage from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Box, Container } from "@mui/material";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeOut",
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => (
  <Router>
    <StarryBackground />
    <BookmarkManager />
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        boxSizing: "border-box",
        height: "100%",
        position: "relative",
      }}
    >
      <Header />
      <Container
        sx={{
          width: "auto",
          mt: 10,
          height: "calc(100vh - 80px)",
        }}
      >
        <AnimatedRoutes />
      </Container>
    </Box>
  </Router>
);

export default App;
