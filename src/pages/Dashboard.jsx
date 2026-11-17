import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import MatchOverview from "../components/MatchOverview";
import RecentJobs from "../components/RecentJobs";
import QuickActions from "../components/QuickActions";
import ResumeCard from "../components/ResumeCard";
import RoadmapCard from "../components/RoadmapCard";
import { getUser, getSavedJobs, getRoadmapTasks, getResume } from "../utils/storage";
import { getResumeProgress, getMissingSections } from "../utils/resumeProgress";
import "../styles/Dashboard.css";

function Dashboard() {
  const user = getUser();
  const firstName = user ? user.name.split(" ")[0] : "Student";

  const jobs = getSavedJobs();
  const tasks = getRoadmapTasks();

  // 1. Kitni jobs analyze hui
  const jobsAnalyzed = jobs.length;

  // 2. Average match percentage
  let totalMatch = 0;
  jobs.forEach((job) => {
    totalMatch = totalMatch + (job.matchPercent || 0);
  });
  const averageMatch = jobs.length === 0 ? 0 : Math.round(totalMatch / jobs.length);

  // 3. Missing skills (duplicate hata ke)
  const allMissing = [];
  jobs.forEach((job) => {
    (job.missingSkills || []).forEach((skill) => {
      if (!allMissing.includes(skill)) {
        allMissing.push(skill);
      }
    });
  });
  const missingCount = allMissing.length;

  // 4. Learning progress
  const doneTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100);

  // 5. Resume progress
  const resume = getResume();
  const resumeProgress = getResumeProgress(resume);
  const missingSections = getMissingSections(resume);

  return (
    <>
      <WelcomeBanner name={firstName} />
      <div className="stats-row">
        <StatCard
          title="Jobs Analyzed"
          value={jobsAnalyzed}
          icon="bi-briefcase"
          tone="indigo"
          subtitle="Saved job reports"
        />
        <StatCard
          title="Average Match"
          value={averageMatch + "%"}
          icon="bi-bullseye"
          tone="green"
          subtitle="Across all saved jobs"
        />
        <StatCard
          title="Missing Skills"
          value={missingCount}
          icon="bi-exclamation-triangle"
          tone="orange"
          subtitle="Skills to learn"
        />
        <StatCard
          title="Learning Progress"
          value={progress + "%"}
          icon="bi-graph-up-arrow"
          tone="blue"
          subtitle={doneTasks + " of " + tasks.length + " tasks done"}
        />
      </div>

      <div className="overview-row">
        <MatchOverview job={jobs[0]} />
      </div>
      <RecentJobs jobs={jobs} />
      <QuickActions />
      <div className="bottom-row">
        <RoadmapCard tasks={tasks} />
        <ResumeCard progress={resumeProgress} missing={missingSections} />
      </div>
    </>
  );
}

export default Dashboard;