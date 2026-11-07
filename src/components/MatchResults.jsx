function MatchResults({ result, jobTitle, company }) {
    const { matchPercent, matchedSkills, missingSkills } = result;

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
            "No known skills were found in this job description. Try pasting a longer description.";
    } else {
        summary = `You match ${matchedSkills.length} of ${totalSkills} skills found in this job description.`;
    }

    return (
        <div className="jm-card p-4 mt-4">
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

            <h6>Matched skills</h6>
            {matchedSkills.length === 0 ? (
                <p className="text-muted">No matching skills found.</p>
            ) : (
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {matchedSkills.map((skill) => (
                        <span key={skill} className="skill-chip skill-chip-matched">
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            <h6>Missing skills</h6>
            {missingSkills.length === 0 ? (
                <p className="text-muted">No missing skills. Great!</p>
            ) : (
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {missingSkills.map((skill) => (
                        <span key={skill} className="skill-chip skill-chip-missing">
                            {skill}
                        </span>
                    ))}
                </div>
            )}

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