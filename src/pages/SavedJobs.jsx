import { useState } from "react";
import MatchResults from "../components/MatchResults.jsx";
import { getSavedJobs, deleteJob } from "../utils/storage.js";

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

        deleteJob(id);              // localStorage se hatao
        setJobs(getSavedJobs());    // state refresh karo, tabhi screen update hogi
        if (openJobId === id) {
            setOpenJobId(null);     // agar wahi job khuli thi to band kar do
        }
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Saved Jobs</h2>

            {jobs.length === 0 ? (
                <p className="text-muted">
                    No saved jobs yet. Analyze a job in Job Matcher and save it.
                </p>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {jobs.map((job) => (
                        <div key={job.id}>
                            <div className="card p-3">
                                <h5 className="mb-1">{job.jobTitle || "Untitled job"}</h5>
                                <p className="text-muted mb-1">
                                    {job.company || "Company not provided"}
                                </p>
                                <p className="mb-2">
                                    Match: {job.matchPercent}% | Analyzed on {job.dateAnalyzed}
                                </p>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleReopen(job.id)}
                                    >
                                        {openJobId === job.id ? "Hide details" : "Reopen"}
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDelete(job.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {openJobId === job.id && (
                                <MatchResults
                                    result={{
                                        matchPercent: job.matchPercent,
                                        matchedSkills: job.matchedSkills,
                                        missingSkills: job.missingSkills,
                                    }}
                                    jobTitle={job.jobTitle || ""}
                                    company={job.company || ""}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedJobs;