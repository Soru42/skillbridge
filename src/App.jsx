import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout.jsx";
import AppLayout from "./components/AppLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import JobMatcher from "./pages/JobMatcher.jsx";
import SavedJobs from "./pages/SavedJobs.jsx";
import LearningRoadmap from "./pages/LearningRoadmap.jsx";
import ResumeBuilder from "./features/ResumeBuilder/ResumeBuilder.jsx";

function App() {
  return (
    <Routes>
      {/* Website pages: Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* App pages: Sidebar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job-matcher" element={<JobMatcher />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/roadmap" element={<LearningRoadmap/>} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
      </Route>
    </Routes>
  );
}

export default App;