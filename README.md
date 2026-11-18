# SkillBridge

**Bridge the gap between your skills and your dream job.**

SkillBridge is a web app that helps students and freshers prepare for jobs. It compares your skills with a job description, shows what you are missing, turns those gaps into a learning plan, and helps you build a clean, ATS-friendly resume.

**Live Demo:** [skillbridge-olive-three.vercel.app](https://skillbridge-olive-three.vercel.app/)

---

## The Problem

Many students and freshers do not know whether their skills match a job, which skills they are missing, or what to learn next. They also struggle to present their strengths in a professional resume. SkillBridge brings all of this into one simple platform.

## Features

- **Dashboard:** Career overview with jobs analyzed, average match, missing skills, learning progress and resume progress. All numbers are calculated from real saved data.
- **Smart Job Matcher:** Add your skills, paste a job description and get a match percentage, matched skills, missing skills and a priority list. Soft skills are shown separately and are not counted in the score.
- **Saved Jobs:** Save analyzed jobs, reopen the full report later, or delete them.
- **Learning Roadmap:** Create study tasks from the missing skills of your saved jobs, add your own tasks, edit or delete them, and track progress.
- **Resume Builder:** Fill in personal details, summary, skills, education, projects, experience and certifications, and see a live preview. Keyword suggestions come from your saved jobs. Export as PDF using the browser's print option.
- **Auto-save:** Everything is stored in the browser using localStorage, so your data stays after a refresh.

> **Note:** Matching uses a transparent keyword-based algorithm written in JavaScript. It does not use AI. AI-based analysis may be added in a future version.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React, Vite, JavaScript |
| Routing | React Router |
| Styling | CSS3, Bootstrap 5, Bootstrap Icons |
| Storage | localStorage |
| PDF export | Browser print |

## Screenshots

| Dashboard | Job Matcher |
| --- | --- |
| ![Dashboard](screenshots/dashboard.png) | ![Job Matcher](screenshots/job-matcher.png) |

| Learning Roadmap | Resume Builder |
| --- | --- |
| ![Learning Roadmap](screenshots/roadmap.png) | ![Resume Builder](screenshots/resume-builder.png) |

## Getting Started

Make sure Node.js is installed, then run:

```bash
git clone https://github.com/Soru42/skillbridge.git
cd skillbridge
npm install
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/   Reusable UI parts (cards, sidebar, results)
├── features/     Resume Builder feature
├── pages/        Main pages (Dashboard, Job Matcher, Saved Jobs, Roadmap)
├── utils/        Matching logic and localStorage helpers
├── styles/       CSS files
├── App.jsx
└── main.jsx
```

## Limitations

- Data is saved in the browser only, so it is not shared between devices.
- The login and signup screens use a local-only profile. There is no real authentication yet.
- Keyword matching looks for exact skill names and does not understand spelling mistakes or synonyms.

## Future Scope

- Backend with Java, Spring Boot and REST APIs
- MongoDB for cloud data storage
- Secure authentication with Spring Security
- User profile and settings pages
- Optional AI-powered job description analysis

## Author

**Sourabh Rathod**
B.Tech CSE student, Jawaharlal Institute of Technology

[LinkedIn](https://www.linkedin.com/in/sourabh1142) | [GitHub](https://github.com/Soru42)