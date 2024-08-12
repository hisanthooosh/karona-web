import React, { useState } from 'react';
import "../Static/Css/Def1.css"
import one from "../Images/pexels-navneet-shanu-202773-672630.jpg";
import two from "../Images/pexels-prakashq2-774282.jpg"
import three from "../Images/pexels-shubhamn-2403537.jpg"
import fore from "../Images/pexels-uwc12-574313.jpg"
import { useNavigate } from 'react-router-dom';
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Defpage = () => {
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
        <div className='def-body'>
            <Toaster position='top-right' />
            <div className='def-body-1'>
                <div className='def-body-1-1'>
                    <p className='def-body-1-1-1'>APP NAME</p>
                </div>
                <div className='def-body-1-2'>
                    <img className='def-body-1-2-1' src={one} alt="" />
                </div>
                <div className='def-body-1-3'>
                    <img className='def-body-1-2-1' src={two} alt="" />
                </div>
                <div className='def-body-1-4'>
                    <img className='def-body-1-2-1' src={three} alt="" />
                </div>
                <div className='def-body-1-5'>
                    <img className='def-body-1-2-1' src={fore} alt="" />
                </div>
            </div>
            <div className='def-body-2'>
                <div className='def-body-2-1'>
                    <form onSubmit={handleSubmit} className='def-body-2-1-1'>
                        <div className='def-body-2-1-1-1'>
                            <input type="text"
                                className='def-body-2-1-1-1-1'
                                placeholder='Phone number,username, or email'
                                id="outlined-basic"
                                name="identifier"
                                value={logindata.identifier}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='def-body-2-1-1-2'>
                            <input type="text"
                                id="outlined-basic"
                                className='def-body-2-1-1-1-1'
                                placeholder='Password'
                                name="password"
                                value={logindata.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='def-body-2-1-1-1'>
                            <button
                                className='def-body-2-1-1-1-btn'
                                type='submit'
                            > L O G I N</button>
                        </div>
                        <div className='def-body-2-1-1-1'>
                            <button
                                className='def-body-2-1-1-1-btn'
                                onClick={() => navigate('/Register_page')}
                            > JOIN NOW</button>
                        </div>
                        <div className='def-body-2-1-1-3'>
                            <p onClick={() => navigate('/Forgetpasswordone')}>Forgot password ?</p>
                        </div>
                    </form>

                    <div className='def-body-2-1-3'>
                        <div className='def-body-2-1-3-1'>
                            <p>Get this app</p> <FaGooglePlay /><FaApple />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Defpage;


