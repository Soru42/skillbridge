import { Link } from "react-router-dom";
import "../styles/RecentJobs.css";

function RecentJobs({ jobs }) {
  const latestJobs = jobs.slice(0, 3);

  return (
    <div className="recent-card card-box">
      <div className="recent-head">
        <div>
          <h3>Recently Analyzed Jobs</h3>
          <p className="recent-sub">Your latest skill compatibility reports</p>
        </div>
        {jobs.length > 0 && (
          <Link to="/saved-jobs" className="recent-all">
            View all jobs <i className="bi bi-arrow-right"></i>
          </Link>
        )}
      </div>

      {jobs.length === 0 ? (
        <p className="recent-empty">
          No jobs analyzed yet. Your analyzed jobs will appear here.
        </p>
      ) : (
        <div className="recent-scroll">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Match Score</th>
                <th>Date Analyzed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {latestJobs.map((job) => {
                const title = job.jobTitle || "Untitled job";
                const badgeClass =
                  job.matchPercent >= 70 ? "score-badge good" : "score-badge low";

                return (
                  <tr key={job.id}>
                    <td>
                      <div className="job-title-cell">
                        <span className="job-letter">{title.charAt(0).toUpperCase()}</span>
                        <span>{title}</span>
                      </div>
                    </td>
                    <td>{job.company || "-"}</td>
                    <td>
                      <span className={badgeClass}>{job.matchPercent}%</span>
                    </td>
                    <td>
                      {new Date(job.dateAnalyzed).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <Link to="/saved-jobs" className="view-btn">View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentJobs;