import { Link } from "react-router-dom";
import "../styles/WelcomeBanner.css";

function WelcomeBanner({ name }) {
  return (
    <div className="welcome-banner card-box">
      <span className="pill">Career command center</span>
      

      <h1 className="welcome-title">Welcome back, {name}!</h1>

      <p className="welcome-text">
        Your career journey is progressing. Let's bridge the gap between your
        skills and your dream job.
      </p>

      <div className="welcome-buttons">
        <Link to="/job-matcher" className="btn-main">
          Analyze a Job
        </Link>
        <Link to="/resume-builder" className="btn-border">
          Build Your Resume
        </Link>
      </div>
    </div>
  );
}

export default WelcomeBanner;