import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">

            <h3 className="sidebar-logo">Skill<b style={{color:"#14B8A6"}}>Bridge</b></h3>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className="sidebar-link">
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/job-matcher" className="sidebar-link">
                    <i className="bi bi-bullseye"></i>
                    <span>Job Matcher</span>
                </NavLink>

                <NavLink to="/roadmap" className="sidebar-link">
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>Learning Roadmap</span>
                </NavLink>

                <NavLink to="/saved-jobs" className="sidebar-link">
                    <i className="bi bi-briefcase"></i>
                    <span>Saved Jobs</span>
                </NavLink>

                <NavLink to="/resume-builder" className="sidebar-link">
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Resume Builder</span>
                </NavLink>
            </nav>


            <div className="sidebar-bottom">
                <NavLink to="/profile" className="sidebar-link">
                    <i className="bi bi-person"></i>
                    <span>User Profile</span>
                </NavLink>

                <NavLink to="/settings" className="sidebar-link">
                    <i className="bi bi-gear"></i>
                    <span>Settings</span>
                </NavLink>

                <NavLink to="/login" className="sidebar-link">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;