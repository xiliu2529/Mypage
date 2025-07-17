import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import BookmarkManager from "./components/layout/BookmarkManager";
import About from "./pages/About/About";
import HomePage from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header /> {/* 所有页面都显示 */}
        <BookmarkManager /> {/* 所有页面都显示 */}
        <div className="glass-panel">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
