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

  // Adhoore data se bachne ke liye safe values
  const matchPercent = job.matchPercent || 0;
  const matchedSkills = job.matchedSkills || [];
  const missingSkills = job.missingSkills || [];

  // Match level, matchPercent se nikalte hain
  let level = "Needs work";
  let levelClass = "level-low";
  if (matchPercent >= 75) {
    level = "Strong match";
    levelClass = "level-high";
  } else if (matchPercent >= 50) {
    level = "Moderate match";
    levelClass = "level-mid";
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
            background: `conic-gradient(var(--primary) ${matchPercent}%, #e2e8f0 0)`,
          }}
        >
          <div className="match-circle-inner">
            <strong>{matchPercent}%</strong>
            <span>Job match</span>
          </div>
        </div>

        {/* Skills */}
        <div className="match-skills">
          <p className="match-label">MATCHED SKILLS</p>
          <div className="chip-row">
            {matchedSkills.length === 0 && <span className="match-empty">None yet</span>}
            {matchedSkills.map((skill) => (
              <span key={skill} className="skill-chip skill-chip-green">{skill}</span>
            ))}
          </div>

          <p className="match-label">SKILLS TO DEVELOP</p>
          <div className="chip-row">
            {missingSkills.length === 0 && <span className="match-empty">None, great job!</span>}
            {missingSkills.map((skill) => (
              <span key={skill} className="skill-chip skill-chip-orange">{skill}</span>
            ))}
          </div>

          <Link to="/job-matcher" className="btn-border">
            Analyze New Job
          </Link>
        </div>

        {/* Latest role info */}
        <div className="match-info">
          <p className="match-label">LATEST ROLE</p>
          <h4 className="match-role">{job.jobTitle || "Untitled role"}</h4>
          <p className="match-company">{job.company || "Company not added"}</p>

          <span className={`level-badge ${levelClass}`}>{level}</span>

          <p className="match-count">
            {matchedSkills.length} matched · {missingSkills.length} to develop
          </p>
        </div>
      </div>
    </div>
  );
}

export default MatchOverview;