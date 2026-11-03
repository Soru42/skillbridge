import Sidebar from "../components/Sidebar";
import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import MatchOverview from "../components/MatchOverview";
import { getUser, getSavedJobs, getRoadmapTasks } from "../utils/storage";
import "../styles/Dashboard.css";
import RecentJobs from "../components/RecentJobs";
import QuickActions from "../components/QuickActions";

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
    const progress = tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <WelcomeBanner name={firstName} />
                <div className="stats-grid">
                    <StatCard title="Jobs Analyzed" value={jobsAnalyzed} subtitle="Total analyzed job descriptions" icon="bi-briefcase" tone="indigo" />
                    <StatCard title="Average Match Score" value={averageMatch + "%"} subtitle="Average skill compatibility" icon="bi-bullseye" tone="green" />
                    <StatCard title="Missing Skills" value={missingCount} subtitle="Skills to improve" icon="bi-exclamation-circle" tone="orange" />
                    <StatCard title="Learning Progress" value={progress + "%"} subtitle="Roadmap completion" icon="bi-graph-up-arrow" tone="blue" />
                </div>
                <div className="overview-row">
                    <MatchOverview job={jobs[0]} />
                </div>
                <RecentJobs jobs={jobs}/>
                <QuickActions/>
            </main>
        </div>
    );
}

export default Dashboard;