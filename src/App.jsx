import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Footer from "./components/Footer.jsx";
import JobMatcher from "./pages/JobMatcher.jsx";

// Ye pages app ke andar ke hain, inpe website ka Navbar nahi dikhana
const appPages = ["/dashboard"];

function App() {
  const location = useLocation();
  const hideNavbar = appPages.includes(location.pathname);

  return (
    <div className="app-shell">
      <main className="app-main">
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job-matcher" element={<JobMatcher/>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;