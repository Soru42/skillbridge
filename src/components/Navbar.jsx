import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState } from 'react';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-sb">
            <div className="container">
                <Link to="/" className="navbar-brand">Skill<b style={{color:"#14b8a6"}}>Bridge</b></Link>

                <button
                    className="navbar-toggler"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={openMenu ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/" end className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link nav-btn-outline">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/signup" className="nav-link nav-btn-filled">Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;