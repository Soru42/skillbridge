import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";

function AppLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;