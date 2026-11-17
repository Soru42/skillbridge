import { Link } from "react-router-dom";
import "../styles/RoadmapCard.css";

// Ring maths: circumference = 2 * PI * radius
const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function RoadmapCard({ tasks }) {
    // Everything is calculated from the tasks array
    const total = tasks.length;
    const done = tasks.filter((task) => task.completed).length;
    const pending = total - done;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    // The ring is drawn by hiding part of the circle's outline
    const dashOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

    // Only the next 3 pending tasks are shown
    const nextTasks = tasks.filter((task) => !task.completed).slice(0, 3);

    return (
        <section className="rm-card" aria-labelledby="rm-card-title">
            <header className="rm-card-header">
                <div>
                    <h3 id="rm-card-title" className="rm-card-title">
                        Learning Roadmap
                    </h3>
                    <p className="rm-card-sub">
                        {total === 0
                            ? "Turn missing skills into a study plan"
                            : pending === 0
                              ? "Every task is complete"
                              : pending + (pending === 1 ? " task left" : " tasks left")}
                    </p>
                </div>
                <Link to="/roadmap" className="rm-card-link">
                    View all <i className="bi bi-arrow-right"></i>
                </Link>
            </header>

            {total === 0 ? (
                <div className="rm-card-empty">
                    <p className="rm-card-empty-title">No learning tasks yet</p>
                    <p className="rm-card-empty-text">
                        Save a job in the Job Matcher, then add its missing skills as tasks.
                    </p>
                    <Link to="/roadmap" className="rm-card-btn">
                        Start your roadmap
                    </Link>
                </div>
            ) : (
                <>
                    <div className="rm-card-top">
                        <div
                            className="rm-ring"
                            role="progressbar"
                            aria-label="Learning progress"
                            aria-valuenow={percent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            <svg viewBox="0 0 100 100" aria-hidden="true">
                                <circle className="rm-ring-track" cx="50" cy="50" r={RADIUS} />
                                <circle
                                    className="rm-ring-fill"
                                    cx="50"
                                    cy="50"
                                    r={RADIUS}
                                    strokeDasharray={CIRCUMFERENCE}
                                    strokeDashoffset={dashOffset}
                                />
                            </svg>
                            <div className="rm-ring-text">
                                <span className="rm-ring-percent">{percent}%</span>
                                <span className="rm-ring-label">done</span>
                            </div>
                        </div>

                        <dl className="rm-stats">
                            <div className="rm-stat">
                                <dt>Completed</dt>
                                <dd>{done}</dd>
                            </div>
                            <div className="rm-stat">
                                <dt>Pending</dt>
                                <dd>{pending}</dd>
                            </div>
                        </dl>
                    </div>

                    {nextTasks.length === 0 ? (
                        <p className="rm-card-finished">
                            You have finished your roadmap. Save another job to keep growing.
                        </p>
                    ) : (
                        <div className="rm-next">
                            <h4 className="rm-next-title">Up next</h4>
                            <ul className="rm-next-list">
                                {nextTasks.map((task) => (
                                    <li key={task.id} className="rm-next-item">
                                        <span className="rm-next-dot" aria-hidden="true"></span>
                                        <span className="rm-next-text">{task.title}</span>
                                        {task.skill && (
                                            <span className="rm-next-chip">{task.skill}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Link to="/roadmap" className="rm-card-btn rm-card-btn-block">
                        Open roadmap
                    </Link>
                </>
            )}
        </section>
    );
}

export default RoadmapCard;