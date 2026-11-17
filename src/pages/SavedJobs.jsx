import { useState } from "react";
import { Link } from "react-router-dom";
import MatchResults from "../components/MatchResults.jsx";
import { getSavedJobs, deleteJob } from "../utils/storage.js";
import "../styles/SavedJobs.css";

// "2026-11-17" ko "17 Nov 2026" banata hai
function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString || "Unknown date";
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

// Match percent se badge ka level nikalo
function getLevelClass(percent) {
    if (percent >= 70) return "sj-badge-high";
    if (percent >= 40) return "sj-badge-mid";
    return "sj-badge-low";
}

function SavedJobs() {
    const [jobs, setJobs] = useState(() => getSavedJobs());
    const [openJobId, setOpenJobId] = useState(null);

    function handleReopen(id) {
        // Agar wahi job pehle se khuli hai to band kar do, warna kholo
        setOpenJobId(openJobId === id ? null : id);
    }

    function handleDelete(id) {
        const sure = window.confirm("Delete this saved job?");
        if (!sure) return;

        deleteJob(id); // localStorage se hatao
        setJobs(getSavedJobs()); // state refresh karo, tabhi screen update hogi
        if (openJobId === id) {
            setOpenJobId(null); // agar wahi job khuli thi to band kar do
        }
    }

    return (
        <div className="container py-4">
            {/* Page header */}
            <div className="sj-header">
                <div>
                    <h2 className="sj-title">Saved Jobs</h2>
                    <p className="sj-sub">
                        {jobs.length === 0
                            ? "Jobs you save from the Job Matcher will appear here"
                            : `${jobs.length} saved ${jobs.length === 1 ? "job" : "jobs"}, reopen any report or remove it`}
                    </p>
                </div>
                <Link to="/job-matcher" className="sj-new-btn">
                    <i className="bi bi-plus-lg"></i> Analyze new job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <div className="sj-empty">
                    <div className="sj-empty-icon">
                        <i className="bi bi-briefcase"></i>
                    </div>
                    <h5>No saved jobs yet</h5>
                    <p>Analyze a job in the Job Matcher and save it to track your progress.</p>
                    <Link to="/job-matcher" className="sj-new-btn">
                        Open Job Matcher
                    </Link>
                </div>
            ) : (
                <div className="sj-list">
                    {jobs.map((job) => {
                        const title = job.jobTitle || "Untitled job";
                        const matchedCount = (job.matchedSkills || []).length;
                        const missingCount = (job.missingSkills || []).length;
                        const isOpen = openJobId === job.id;

                        return (
                            <div key={job.id}>
                                <div className="sj-card">
                                    <div className="sj-avatar">
                                        {title.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="sj-info">
                                        <h5 className="sj-job-title">{title}</h5>
                                        <p className="sj-company">
                                            {job.company || "Company not provided"}
                                        </p>
                                        <p className="sj-meta">
                                            <span>
                                                <i className="bi bi-calendar3"></i>{" "}
                                                {formatDate(job.dateAnalyzed)}
                                            </span>
                                            <span>
                                                <i className="bi bi-check-circle"></i> {matchedCount} matched
                                            </span>
                                            <span>
                                                <i className="bi bi-exclamation-circle"></i> {missingCount} to develop
                                            </span>
                                        </p>
                                    </div>

                                    <div className="sj-side">
                                        <span className={`sj-badge ${getLevelClass(job.matchPercent)}`}>
                                            {job.matchPercent}% match
                                        </span>
                                        <div className="sj-actions">
                                            <button
                                                type="button"
                                                className="sj-btn-open"
                                                onClick={() => handleReopen(job.id)}
                                            >
                                                {isOpen ? "Hide details" : "Reopen"}
                                            </button>
                                            <button
                                                type="button"
                                                className="sj-btn-delete"
                                                onClick={() => handleDelete(job.id)}
                                            >
                                                <i className="bi bi-trash3"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {isOpen && (
                                    <MatchResults
                                        result={{
                                            matchPercent: job.matchPercent,
                                            matchedSkills: job.matchedSkills || [],
                                            missingSkills: job.missingSkills || [],
                                            softMatched: job.softMatched || [],
                                            softMissing: job.softMissing || [],
                                        }}
                                        jobTitle={job.jobTitle || ""}
                                        company={job.company || ""}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SavedJobs;