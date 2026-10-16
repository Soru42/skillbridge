import { Link } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="sbf">
      <div className="container">
        <div className="row g-5">

          {/* Brand */}
          <div className="col-lg-5">
            <h5 className="sbf-brand">
              Skill<span>Bridge</span>
            </h5>
            <p className="sbf-about">
              Bridge the gap between your skills and your dream job. Match your
              skills with job descriptions, follow a learning roadmap, and
              build a professional resume, all in one place.
            </p>
            <a
              href="https://www.linkedin.com/in/sourabh1142"
              target="_blank"
              rel="noreferrer"
              className="sbf-social"
            >
              Connect on LinkedIn
            </a>
          </div>

          {/* Product */}
          <div className="col-6 col-lg-3 offset-lg-1">
            <h6 className="sbf-heading">Product</h6>
            <ul className="sbf-links">
              <li>Job Matcher</li>
              <li>Learning Roadmap</li>
              <li>Saved Jobs</li>
              <li>Resume Builder</li>
            </ul>
          </div>

          {/* Get started */}
          <div className="col-6 col-lg-3">
            <h6 className="sbf-heading">Get started</h6>
            <ul className="sbf-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </ul>
          </div>

        </div>

        <div className="sbf-bottom">
          <span>© {new Date().getFullYear()} SkillBridge. All rights reserved.</span>
          <span>
            Designed & developed by <strong>Sourabh Rathod</strong>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer