import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'

// data for feature cards
const features = [
  {
    icon: '🎯',
    title: 'Smart Job Matcher',
    text: 'Compare your skills with any job description and get an instant match percentage.',
  },
  {
    icon: '🗺️',
    title: 'Learning Roadmap',
    text: 'Turn your skill gaps into a clear checklist and track your progress step by step.',
  },
  {
    icon: '💾',
    title: 'Saved Jobs',
    text: 'Save the jobs you have analyzed and come back to them whenever you need.',
  },
  {
    icon: '📄',
    title: 'Resume Builder',
    text: 'Build a clean, job-ready resume with a live preview and export it as a PDF.',
  },
]

// data for how it works
const steps = [
  {
    number: 1,
    title: 'Add your skills',
    text: 'Enter your skills and paste the job description you are targeting.',
  },
  {
    number: 2,
    title: 'Get your match report',
    text: 'See your match percentage, matched skills, and the skills you still need.',
  },
  {
    number: 3,
    title: 'Learn and apply',
    text: 'Follow your roadmap, save the job, and build a resume that shows your strengths.',
  },
]

function LandingPage() {
  return (
    <div className="landing">

      {/* hero */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6 text-center text-lg-start">
              <span className="pill">Built for students & freshers</span>

              <h1 className="hero-heading">
                Bridge the gap between your skills and your{' '}
                <span className="green-text">dream job</span>
              </h1>

              <p className="hero-para">
                Match your skills against real job descriptions, find out what
                you are missing, follow a learning plan, and build a
                professional resume, all in one place.
              </p>

              <div className="button-row">
                <Link to="/signup" className="btn btn-main">
                  Get Started
                </Link>
                <a href="#features" className="btn btn-border">
                  Explore Features
                </a>
              </div>
            </div>

           
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="sample-card card-box">
                <span className="sample-tag">Sample preview</span>

                <h5 className="job-name">Frontend Developer</h5>

                <div className="match-row">
                  <span className="match-text">Skill Match</span>
                  <span className="match-number">72%</span>
                </div>

                <div className="bar">
                  <div className="bar-fill" style={{ width: '72%' }}></div>
                </div>

                <p className="small-heading">Matched skills</p>
                <div className="chips">
                  <span className="chip chip-green">HTML</span>
                  <span className="chip chip-green">CSS</span>
                  <span className="chip chip-green">JavaScript</span>
                  <span className="chip chip-green">React</span>
                </div>

                <p className="small-heading">Skills to learn</p>
                <div className="chips">
                  <span className="chip chip-grey">Git</span>
                  <span className="chip chip-grey">Node.js</span>
                  <span className="chip chip-grey">TypeScript</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="page-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Everything you need to become job-ready</h2>
            <p className="section-subtitle">
              Four focused tools that work together on a single platform.
            </p>
          </div>

          <div className="row g-4">
            {features.map((item) => (
              <div className="col-md-6 col-lg-3" key={item.title}>
                <div className="feature-card card-box">
                  <div className="feature-icon">{item.icon}</div>
                  <h5 className="feature-title">{item.title}</h5>
                  <p className="feature-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how-it-works" className="page-section how-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">How SkillBridge works</h2>
            <p className="section-subtitle">
              From skill gap to job-ready in three simple steps.
            </p>
          </div>

          <div className="row">
            {steps.map((step) => (
              <div className="col-md-4" key={step.number}>
                <div className="step-card">
                  <div className="step-number">{step.number}</div>
                  <h5 className="step-title">{step.title}</h5>
                  <p className="step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* call to action */}
      <section className="page-section">
        <div className="container">
          <div className="cta-box">
            <div className="row align-items-center g-5">

              <div className="col-lg-7 text-center text-lg-start">
                <span className="pill">Start your preparation today</span>

                <h2 className="cta-heading">
                  Ready to bridge your <span className="green-text">skill gap</span>?
                </h2>

                <p className="cta-para">
                  Analyze your first job description in minutes, see exactly
                  what you are missing, and follow a clear plan to become
                  job-ready.
                </p>

                <div className="button-row">
                  <Link to="/signup" className="btn btn-main">
                    Get Started
                  </Link>
                  <a href="#features" className="btn btn-border">
                    Explore Features
                  </a>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="cta-right">
                  <h5 className="cta-right-title">What you get</h5>
                  <ul className="cta-list">
                    <li><span className="tick">✓</span> An instant skill-match report for any job</li>
                    <li><span className="tick">✓</span> A personalized learning checklist</li>
                    <li><span className="tick">✓</span> A professional resume with PDF export</li>
                    <li><span className="tick">✓</span> Saved jobs to track your preparation</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LandingPage