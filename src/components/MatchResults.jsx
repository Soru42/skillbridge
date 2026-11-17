function MatchResults({ result, jobTitle, company }) {
    const {
        matchPercent,
        matchedSkills,
        missingSkills,
        softMatched = [],
        softMissing = [],
    } = result;

    // Pick a ring color based on the score
    let ringColor = "#dc2626";
    if (matchPercent >= 70) {
        ringColor = "#16a34a";
    } else if (matchPercent >= 40) {
        ringColor = "#f59e0b";
    }

    // Simple rule: the first 3 missing skills are the priority
    const prioritySkills = missingSkills.slice(0, 3);

    // Build a readable heading
    let heading = "Match Result";
    if (jobTitle.trim() !== "" && company.trim() !== "") {
        heading = `${jobTitle} at ${company}`;
    } else if (jobTitle.trim() !== "") {
        heading = jobTitle;
    }

    // Build a short summary sentence
    const totalSkills = matchedSkills.length + missingSkills.length;
    let summary = "";
    if (totalSkills === 0) {
        summary =
            "No known technical skills were found in this job description. Try pasting a longer description.";
    } else {
        summary = `You match ${matchedSkills.length} of ${totalSkills} technical skills found in this job description.`;
    }

    return (
        <div className="jm-card p-4 mt-4">
            {/* Top: score + heading */}
            <div className="d-flex align-items-center gap-4 flex-wrap mb-4">
                <div
                    className="score-ring"
                    style={{ "--score": matchPercent, "--ring-color": ringColor }}
                    role="img"
                    aria-label={`Match score ${matchPercent} percent`}
                >
                    <span>{matchPercent}%</span>
                </div>
                <div>
                    <h4 className="mb-1">{heading}</h4>
                    <p className="text-muted mb-0">{summary}</p>
                </div>
            </div>

            {/* Matched and missing side by side */}
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <div className="mr-panel mr-panel-matched h-100">
                        <h6 className="mr-panel-title">
                            Matched skills ({matchedSkills.length})
                        </h6>
                        {matchedSkills.length === 0 ? (
                            <p className="text-muted small mb-0">No matching skills found.</p>
                        ) : (
                            <div className="d-flex flex-wrap gap-2">
                                {matchedSkills.map((skill) => (
                                    <span key={skill} className="skill-chip skill-chip-matched">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mr-panel mr-panel-missing h-100">
                        <h6 className="mr-panel-title">
                            Missing skills ({missingSkills.length})
                        </h6>
                        {missingSkills.length === 0 ? (
                            <p className="text-muted small mb-0">No missing skills. Great!</p>
                        ) : (
                            <div className="d-flex flex-wrap gap-2">
                                {missingSkills.map((skill) => (
                                    <span key={skill} className="skill-chip skill-chip-missing">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Soft skills */}
            {softMatched.length + softMissing.length > 0 && (
                <div className="mr-panel mb-3">
                    <h6 className="mr-panel-title">
                        Soft skills{" "}
                        <span className="text-muted fw-normal">(not counted in score)</span>
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                        {softMatched.map((skill) => (
                            <span key={skill} className="skill-chip skill-chip-matched">
                                {skill}
                            </span>
                        ))}
                        {softMissing.map((skill) => (
                            <span key={skill} className="skill-chip skill-chip-missing">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Priority */}
            {prioritySkills.length > 0 && (
                <div className="priority-box">
                    <strong>Skills to prioritize</strong>
                    <ol className="mb-0 mt-2">
                        {prioritySkills.map((skill) => (
                            <li key={skill}>{skill}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

export default MatchResults;