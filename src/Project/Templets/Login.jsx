import React, { useState } from 'react';
import "../Static/Css/Def.css";
import logo from "../Images/mylogo.svg.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function Login() {

    const navigate = useNavigate();
    const [logindata, setLogindata] = useState({
        identifier: '',
        password: ''
    });
    const handleChange = (e) => {
        setLogindata({ ...logindata, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!logindata.password && !logindata.identifier) {
            toast.error('Please enter username and password');
            return;
        }
        try {
            const data = JSON.stringify(logindata);
            console.log(data);
            const response = await axios.post('http://127.0.0.1:9889/login', logindata, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            localStorage.setItem('username', response.data.username)
            navigate('/Home');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.error('incorrect password');
                    toast.error('Incorrect password');
                } else if (error.response.status === 404) {
                    console.error('user not found');
                    toast.error('User not found');
                }
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (

        <section className="signup-body">
            <div className='login-body'>
                <Toaster position='top-right' />
                <div className='login-container'>
                    <div className='login-header'>
                        <img src={logo} alt="Logo" className='login-logo' />
                        <p className='login-title'>Karona</p>
                    </div>
                    <div className='login-content'>
                        <p className='login-welcome'>Login to Karona</p>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <TextField
                                id="outlined-basic"
                                type="text"
                                name="identifier"
                                style={{ width: "100%" }}
                                label="Username, number, email"
                                variant="outlined"
                                value={logindata.identifier}
                                onChange={handleChange}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                style={{ width: "100%", marginTop: "5%" }}
                                type="password"
                                name="password"
                                value={logindata.password}
                                onChange={handleChange}
                            />
                            <div className='login-links'>
                                <p style={{ color: "#1d9cf1cd", cursor: "pointer" }} onClick={() => navigate('/Forgotpassword')} >Forgot password?</p>
                                <p>Don't have an Account? <span className='login-signup-link' onClick={() => navigate('/Signup')} >Signup</span></p>
                            </div>
                            <Button
                                variant="contained"
                                type='submit'
                                style={{ width: "100%", marginTop: "5%" }}
                                className='login-btn'
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
