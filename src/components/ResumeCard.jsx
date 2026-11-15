import { Link } from "react-router-dom";
import "../styles/ResumeCard.css";

function ResumeCard({ progress, missing = [] }) {
  const started = progress > 0;


  return (
    <div className="resume-card">
      <span className="resume-tag">RESUME BUILDER</span>

      <h3 className="resume-title">
        {started ? "Your professional story is taking shape." : "Start building your resume."}
      </h3>
      <p className="resume-text">
        {!started
          ? "Add your details and get a professional, job-ready resume with live preview."
          : missing.length > 0
            ? `Still missing: ${missing.join(", ")}.`
            : "All sections are filled. Review your resume and download it as PDF."}
      </p>

      <div className="resume-progress-top">
        <span>Resume progress</span>
        <strong>{progress}%</strong>

      </div>
      <div className="resume-track">
        <div className="resume-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <Link to="/resume-builder" className="resume-btn">
        {started ? "Continue Building Resume" : "Start Building Resume"}
        <i className="bi bi-arrow-right"></i>
      </Link>
    </div>
  );
}

export default ResumeCard;