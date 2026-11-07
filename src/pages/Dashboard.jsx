
import AppLayout from "../components/AppLayout";
import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import MatchOverview from "../components/MatchOverview";
import RecentJobs from "../components/RecentJobs";
import QuickActions from "../components/QuickActions";
import ResumeCard from "../components/ResumeCard";
import { getUser, getSavedJobs, getRoadmapTasks, getResume } from "../utils/storage";
import { getResumeProgress } from "../utils/resumeProgress";
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
        totalMatch = totalMatch + job.matchPercent;
    });
    const averageMatch = jobs.length === 0 ? 0 : Math.round(totalMatch / jobs.length);

    // 3. Missing skills (duplicate hata ke)
    const allMissing = [];
    jobs.forEach((job) => {
        job.missingSkills.forEach((skill) => {
            if (!allMissing.includes(skill)) {
                allMissing.push(skill);
            }
        });
    });
    const missingCount = allMissing.length;

    // 4. Learning progress
    const doneTasks = tasks.filter((task) => task.completed).length;
    const progress = tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100); const resumeProgress = getResumeProgress(getResume());



    return (
        <AppLayout>
            <WelcomeBanner name={firstName} />
            <div className="overview-row">
                <MatchOverview job={jobs[0]} />
            </div>
            <RecentJobs jobs={jobs} />
            <div className="bottom-row">
                <QuickActions />
                <ResumeCard progress={resumeProgress} />
            </div>
        </AppLayout>

    );
}

export default Dashboard;