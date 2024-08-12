import React, { useState } from 'react';
import one from "../Images/pexels-navneet-shanu-202773-672630.jpg";
import two from "../Images/pexels-prakashq2-774282.jpg"
import three from "../Images/pexels-shubhamn-2403537.jpg"
import fore from "../Images/pexels-uwc12-574313.jpg"
import "../Static/Css/Register_page.css"
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const Register_page = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        date: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
    });

    const validateUsername = (username) => {
        const usernameRegex = /^(?![A-Z])(?![])[a-z0-9.]+$/;
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password || !formData.date || !formData.name || !formData.confirmPassword || !formData.email || !formData.phone) {
            toast.error('Please enter valid data');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:9889/reg', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                toast.success('Registered successfully');
                navigate('/');
                localStorage.setItem('name', response.data.name);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Please provide valid data');
            } else if (error.response && error.response.status === 409) {
                toast.error('Username / email / phone already exists');
            } else {
                toast.error('Failed to register. Please try again later.');
            }
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === 'username' && value) {
            if (!validateUsername(value)) {
                toast.error('Username must start with a letter and can contain alphabets, numbers, and underscores (not starting with underscore).');
            }
        }

        if (name === 'password' && value) {
            if (!validatePassword(value)) {
                toast.error('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
            }
        }

        if (name === 'confirmPassword' && value) {
            if (value !== formData.password) {
                toast.error('Passwords do not match');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <div className='reg-body'>
            <Toaster position='top-right' />
            <div className='reg-body-1'>
                <div className='reg-body-1-1'>
                    <p className='reg-body-1-1-1'>APP NAME</p>
                </div>
                <div className='reg-body-1-2'>
                    <img className='reg-body-1-2-1' src={one} alt="" />
                </div>
                <div className='reg-body-1-3'>
                    <img className='reg-body-1-2-1' src={two} alt="" />
                </div>
                <div className='reg-body-1-4'>
                    <img className='reg-body-1-2-1' src={three} alt="" />
                </div>
                <div className='reg-body-1-5'>
                    <img className='reg-body-1-2-1' src={fore} alt="" />
                </div>
            </div>
            <div className='reg-body-2'>
                <div className='reg-body-2-1'>
                    <form onSubmit={handleSubmit} className='reg-body-2-1-1'>
                        <div className='reg-body-2-1-1-1'>
                            <input type="text"
                                className='reg-body-2-1-1-1-1'
                                placeholder='Name'
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required

                            />
                        </div>
                        <div className='reg-body-2-1-1-1'>
                            <input type="text"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className='reg-body-2-1-1-1-1'
                                placeholder='User name'
                                id="outlined-basic"
                                name="username"

                            />
                        </div>
                        <div className='reg-body-2-1-1-1'>
                            <input type="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className='reg-body-2-1-1-1-1'
                                placeholder='email'
                                id="outlined-basic"
                                name="email"

                            />
                        </div>
                        <div className='reg-body-2-1-1-1'>
                            <input type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className='reg-body-2-1-1-1-1'
                                placeholder='phone number'
                                id="outlined-basic"
                                name="phone"
                                maxLength={10}

                            />
                        </div>
                        <div className='reg-body-2-1-1-1'>
                            <input type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className='reg-body-2-1-1-1-1'

                                id="outlined-basic"


                            />
                        </div>
                        <div className='reg-body-2-1-1-1'>
                            <input type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className='reg-body-2-1-1-1-1'
                                placeholder='Password'
                                id="outlined-basic"


                            />
                        </div>
                        <div className='reg-body-2-1-1-2'>
                            <input type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                id="outlined-basic"
                                className='reg-body-2-1-1-1-1'
                                placeholder='Conform password'


                            />
                        </div>
                        <div className='reg-body-2-1-1-1'>
                            <button
                                className='reg-body-2-1-1-1-btn'
                                type='submit'
                            > J O I N</button>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Register_page
