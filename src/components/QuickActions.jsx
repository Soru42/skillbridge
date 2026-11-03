import { Link } from "react-router-dom";
import "../styles/QuickActions.css";

const actions = [
    {
        title: "Job Matcher",
        text: "Analyze a job description and identify skill gaps.",
        link: "/job-matcher",
        linkText: "Open matcher",
        icon: "bi-bullseye",
        tone: "indigo",
    },
    {
        title: "Learning Roadmap",
        text: "Improve missing skills and track your learning.",
        link: "/roadmap",
        linkText: "View roadmap",
        icon: "bi-graph-up-arrow",
        tone: "green",
    },
    {
        title: "Resume Builder",
        text: "Build, preview and download a professional resume.",
        link: "/resume-builder",
        linkText: "Build resume",
        icon: "bi-file-earmark-text",
        tone: "blue",
    },
];

function QuickActions() {
    return (
        <div className="qa-section">
            <h3>Quick Actions</h3>
            <p className="qa-sub">Move your career plan forward</p>

            <div className="qa-grid">
                {actions.map((item) => (
                    <div key={item.title} className="qa-card card-box">
                        <div className={`qa-icon tone-${item.tone}`}>
                            <i className={`bi ${item.icon}`}></i>
                        </div>
                        <h4 className="qa-title">{item.title}</h4>
                        <p className="qa-text">{item.text}</p>
                        <Link to={item.link} className="qa-link">
                            {item.linkText} <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuickActions;