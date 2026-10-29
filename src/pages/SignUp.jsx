import { Link } from 'react-router-dom';
import '../styles/SignUp.css';
import { useState } from 'react';
import { saveUser } from '../utils/storage';

function SignUp() {

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
            newError.email = "Please enter your mail address.";
        }

        // if (password.trim() === "") {
        //     newError.password = " Please enter your password.";
        // }

        if (password.length < 8) {
            newError.password = "Password must be at least 8 characters."
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
       
        // if (validate()) {
        //     console.log( "Name :",name);
        //     console.log("Email :",email);
        //     // console.log("Password :",password); PAssword is Protected
        // }

         if (validate()) {
        saveUser({ name: name.trim(), email: email.trim() });
    }



    }
    return (

        <div className="signup-page">
            <div className="signup-card card p-3">
                <h1 className='text-center'>Skill<b className='bridge'>Bridge</b></h1>
                <p className='text-center'>Start bridging the gap to your dream job.</p>
                <h2>Create Your Account </h2>


                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Full name</label>
                            <input type="text" className="form-control" id="name" placeholder='Enter your full name' value={name} onChange={handleName} />
                            {error.name && <span className="text-danger">{error.name}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder='Enter your mail address' value={email} onChange={handleEmail} />
                            {error.email && <span className="text-danger">{error.email}</span>}
                        </div>
                        <div className=" form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder='Enter your password' value={password} onChange={handlePassword} />
                            {error.password && <span className="text-danger">{error.password}</span>}
                        </div>
                        
                        <div>
                            <button type='submit' className='SignUpbtn' >Sign up</button>
                        </div>
                        <div>
                            <p>
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>

                    </div>
                </form>

            </div>
        </div>

    )
};

export default SignUp;