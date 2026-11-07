import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";

function AppLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}

export default AppLayout;