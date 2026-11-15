import { useState } from "react";
import { getSavedJobs } from "../../../utils/storage.js";
import { getKeywordSuggestions } from "../utils/keywordSuggestions.js";

function KeywordSuggestions({ resume }) {
  // Saved jobs is page par badalte nahi, isliye sirf ek baar padhte hain
  const [jobs] = useState(() => getSavedJobs());

  // Resume har keystroke par badalta hai, isliye suggestions har baar naye nikalte hain
  const suggestions = getKeywordSuggestions(resume, jobs);

  return (
    <section className="rb-section">
      <h2>Keyword Suggestions</h2>

      {jobs.length === 0 && (
        <p className="rb-hint">
          Analyze and save a job in Job Matcher to see keyword suggestions here.
        </p>
      )}

      {jobs.length > 0 && suggestions.length === 0 && (
        <p className="rb-hint">
          Your resume already covers the missing skills from your saved jobs.
        </p>
      )}

      {suggestions.length > 0 && (
        <>
          <p className="rb-hint">
            These skills appear in your saved jobs but not in your resume. Add
            only the ones you genuinely know.
          </p>
          <ul className="rb-keywords">
            {suggestions.map(({ skill, count }) => (
              <li key={skill}>
                <span>{skill}</span>
                <small>
                  {count} job{count > 1 ? "s" : ""}
                </small>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default KeywordSuggestions;