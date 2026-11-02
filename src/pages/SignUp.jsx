import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import { useState } from 'react';
import { saveUser } from '../utils/storage';

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const validate = () => {
        let newError = {};

        if (name.trim() === "") {
            newError.name = "Please enter your name.";
        }

        if (email.trim() === "") {
            newError.email = "Please enter your email address.";
        }

        if (password.length < 8) {
            newError.password = "Password must be at least 8 characters.";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            saveUser({ name: name.trim(), email: email.trim() });
            navigate('/dashboard');
        }
    }

    return (
        <div className="signup-page">

           
            <div className="signup-brand d-none d-lg-flex">
              <div className='content'>
                  <h1 className="brand-title">Skill<span className="bridge">Bridge</span></h1>
                <h2 className="brand-headline">Bridge the gap between your skills and your dream job.</h2>
                <ul className="brand-points">
                    <li>Match your skills with any job description</li>
                    <li>Get a learning roadmap for missing skills</li>
                    <li>Build a professional resume in minutes</li>
                </ul>
              </div>
            </div>

            
            <div className="signup-form-side">
                <div className="signup-card card p-3">

                   
                    <h1 className="text-center d-lg-none">Skill<b className="bridge">Bridge</b></h1>
                    <p className="text-center d-lg-none">Start bridging the gap to your dream job.</p>

                    <h2>Create Your Account</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Full name</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={handleName} />
                            {error.name && <span className="text-danger d-block mt-1 small">{error.name}</span>}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} />
                            {error.email && <span className="text-danger d-block mt-1 small">{error.email}</span>}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={handlePassword} />
                            {error.password && <span className="text-danger d-block mt-1 small">{error.password}</span>}
                        </div>

                        <button type="submit" className="SignUpbtn">Sign up</button>

                        <p>
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    )
};

export default SignUp;