import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function PublicLayout() {
    return (
        <div className="app-shell">
            <main className="app-main">
                <Navbar />
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PublicLayout;