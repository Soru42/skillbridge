import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useState } from 'react';
import { getUser } from '../utils/storage';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const validate = () => {
        let newError = {};

        if (email.trim() === "") {
            newError.email = "Please enter your email address.";
        }

        if (password === "") {
            newError.password = "Please enter your password.";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const user = getUser();

        if (!user || user.email.toLowerCase() !== email.trim().toLowerCase()) {
            setError({ form: "No account found for this email in this browser. Sign up first." });
            return;
        }

        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            
            <div className="login-card card p-3">
                {/* <h1 className="text-center">Skill<b className="bridge">Bridge</b></h1> */}
                <div className='text-center'>
                    <img src="/sbLogoPng.png" alt="" width={"200px"} />
                </div>
                <p className="text-center">Welcome back. Pick up where you left off.</p>
                <h2>Log in to your account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error.email && <span className="text-danger d-block mt-1 small">{error.email}</span>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error.password && <span className="text-danger d-block mt-1 small">{error.password}</span>}
                    </div>

                    {error.form && <div className="text-danger mb-3 small">{error.form}</div>}

                    <button type="submit" className="login-btn">Log in</button>

                    <p>
                        New to SkillBridge? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;