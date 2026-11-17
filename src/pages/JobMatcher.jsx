import { useState } from "react";
import { Link } from "react-router-dom";
import { analyzeJob, softSkills } from "../utils/matching";
import { saveJob } from "../utils/storage";
import MatchResults from "../components/MatchResults";
import "../styles/JobMatcher.css";

function JobMatcher() {
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    function addSkill() {
        const newSkill = skillInput.trim().toLowerCase();

        // Ignore empty input and duplicates
        if (newSkill === "" || skills.includes(newSkill)) {
            setSkillInput("");
            return;
        }

        setSkills([...skills, newSkill]);
        setSkillInput("");
    }

    function removeSkill(skillToRemove) {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    }

    function handleSkillKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault(); // stops the page from reloading or submitting
            addSkill();
        }
    }

    function handleAnalyze() {
        if (skills.length === 0) {
            setError("Please add at least one skill.");
            setResult(null);
            return;
        }

        if (jobDescription.trim() === "") {
            setError("Please paste a job description.");
            setResult(null);
            return;
        }

        setError("");
        setIsSaved(false);
        setResult(null); // hide the old result while loading
        setIsAnalyzing(true);

        // Short delay so the user can see the loader
        setTimeout(() => {
            setResult(analyzeJob(skills, jobDescription));
            setIsAnalyzing(false);
        }, 700);
    }

    function handleSaveJob() {
        saveJob({
            jobTitle: jobTitle.trim() || "Untitled Job",
            company: company.trim(),
            jobDescription,
            matchPercent: result.matchPercent,
            matchedSkills: result.matchedSkills,
            missingSkills: result.missingSkills,
            softMatched: result.softMatched || [],
            softMissing: result.softMissing || [],
        });
        setIsSaved(true);
    }

    // Popular skills the user has not added yet
    const suggestions = [
        "html", "css", "javascript", "react", "java", "sql", "git", "python",
    ].filter((skill) => !skills.includes(skill));

    function addSuggestedSkill(skill) {
        setSkills([...skills, skill]);
    }

    // Select or unselect a soft skill chip
    function toggleSoftSkill(skill) {
        if (skills.includes(skill)) {
            removeSkill(skill);
        } else {
            setSkills([...skills, skill]);
        }
    }

    return (
        <div className="container py-4">
            <div className="jm-hero">
                <h2 className="mb-1">Job Matcher</h2>
                <p>Paste a job description and see how well your skills match.</p>
            </div>

            <div className="row g-4">
                {/* Left column: job details */}
                <div className="col-lg-7">
                    <div className="jm-card p-4 h-100">
                        <h5 className="mb-3">
                            <span className="jm-step">1</span>Job details
                        </h5>

                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label htmlFor="jobTitle" className="form-label">
                                    Job Title
                                </label>
                                <input
                                    id="jobTitle"
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Frontend Developer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="company" className="form-label">
                                    Company (optional)
                                </label>
                                <input
                                    id="company"
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Infosys"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>
                        </div>

                        <label htmlFor="jobDescription" className="form-label">
                            Job Description
                        </label>
                        <textarea
                            id="jobDescription"
                            className="form-control"
                            rows="10"
                            placeholder="Paste the job description here"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <div className="text-muted small mt-1 text-end">
                            {jobDescription.length} characters
                        </div>
                    </div>
                </div>

                {/* Right column: skills */}
                <div className="col-lg-5">
                    <div className="jm-card p-4 h-100">
                        <h5 className="mb-3">
                            <span className="jm-step">2</span>Your skills
                        </h5>

                        <label htmlFor="skillInput" className="form-label">
                            Add a skill
                        </label>
                        <div className="input-group">
                            <input
                                id="skillInput"
                                type="text"
                                className="form-control"
                                placeholder="Type a skill and press Enter"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={addSkill}
                            >
                                Add
                            </button>
                        </div>

                        {skills.length === 0 ? (
                            <p className="text-muted small mt-3 mb-0">No skills added yet.</p>
                        ) : (
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {skills.map((skill) => (
                                    <span key={skill} className="skill-chip">
                                        {skill}
                                        <button
                                            type="button"
                                            aria-label={`Remove ${skill}`}
                                            onClick={() => removeSkill(skill)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {suggestions.length > 0 && (
                            <div className="mt-4">
                                <p className="text-muted small mb-2">Quick add</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {suggestions.map((skill) => (
                                        <button
                                            key={skill}
                                            type="button"
                                            className="skill-chip skill-chip-suggest"
                                            onClick={() => addSuggestedSkill(skill)}
                                        >
                                            + {skill}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Soft skills: click to select or unselect */}
                        <div className="mt-4">
                            <p className="text-muted small mb-2">
                                Soft skills (click to select)
                            </p>
                            <div className="d-flex flex-wrap gap-2">
                                {softSkills.map((skill) => (
                                    <button
                                        key={skill}
                                        type="button"
                                        className={`skill-chip skill-chip-suggest ${
                                            skills.includes(skill) ? "skill-chip-active" : ""
                                        }`}
                                        aria-pressed={skills.includes(skill)}
                                        onClick={() => toggleSoftSkill(skill)}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              {/* Error and Analyze button */}
            <div className="mt-4">
                {error && (
                    <div className="alert alert-danger py-2" role="alert">
                        {error}
                    </div>
                )}
                <button
                    type="button"
                    className="jm-btn-primary"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    aria-busy={isAnalyzing}
                >
                    {isAnalyzing ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            ></span>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-lightning-charge-fill me-2"></i>
                            Analyze Match
                        </>
                    )}
                </button>
            </div>

            {/* Results and action bar */}
            {result && (
                <>
                    <MatchResults result={result} jobTitle={jobTitle} company={company} />

                    <div className="jm-actions">
                        <button
                            type="button"
                            className={isSaved ? "jm-btn-saved" : "jm-btn-save"}
                            onClick={handleSaveJob}
                            disabled={isSaved}
                        >
                            {isSaved ? (
                                <>
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Saved
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-bookmark-plus me-2"></i>
                                    Save this job
                                </>
                            )}
                        </button>

                        {isSaved && (
                            <Link to="/saved-jobs" className="jm-link">
                                View saved jobs <i className="bi bi-arrow-right"></i>
                            </Link>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default JobMatcher;