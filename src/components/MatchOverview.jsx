import { Link } from "react-router-dom";
import "../styles/MatchOverview.css";

function MatchOverview({ job }) {
  // Koi job nahi hai to empty state dikhao
  if (!job) {
    return (
      <div className="match-card card-box">
        <h3>Your Job Match Overview</h3>
        <p className="match-empty">
          Analyze your first job to see how your skills match.
        </p>
        <Link to="/job-matcher" className="btn-main">
          Analyze a Job
        </Link>
      </div>
    );
  }

  return (
    <div className="match-card card-box">
      <h3>Your Job Match Overview</h3>
      <p className="match-sub">Based on your latest analyzed role</p>

      <div className="match-body">
        {/* Circle */}
        <div
          className="match-circle"
          style={{
            background: `conic-gradient(var(--primary) ${job.matchPercent}%, #e2e8f0 0)`,
          }}
        >
          <div className="match-circle-inner">
            <strong>{job.matchPercent}%</strong>
            <span>Job match</span>
          </div>
        </div>

        {/* Skills */}
        <div className="match-skills">
          <p className="match-label">MATCHED SKILLS</p>
          <div className="chip-row">
            {job.matchedSkills.map((skill) => (
              <span key={skill} className="skill-chip skill-chip-green">{skill}</span>
            ))}
          </div>

          <p className="match-label">SKILLS TO DEVELOP</p>
          <div className="chip-row">
            {job.missingSkills.map((skill) => (
              <span key={skill} className="skill-chip skill-chip-orange">{skill}</span>
            ))}
          </div>

          <Link to="/job-matcher" className="btn-border">
            Analyze New Job
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MatchOverview;