
import React, { useState } from 'react';
import "../Static/Css/Def.css"; // Updated CSS file path
import logo from "../Images/mylogo.svg.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function Reg() {
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
                navigate('/Login');
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
        <section className="signup-body">
            <div className='reg-body'>
                <Toaster position='top-right' />
                <div className='reg-container'>
                    <div className='reg-header'>
                        <img src={logo} alt="Logo" className='reg-logo' />
                        <p className='reg-title'>Karona</p>
                    </div>
                    <div className='reg-form-container'>
                        <p className='reg-form-title'>Karona welcomes you</p>
                        <form onSubmit={handleSubmit} className='reg-form'>
                            <div className='reg-form-inputs'>
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    size='small'
                                    variant="outlined"
                                    className='reg-input'
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Username"
                                    size='small'
                                    variant="outlined"
                                    className='reg-input'
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required

                                />
                                <TextField
                                    id="outlined-basic"
                                    label="email"
                                    size='small'
                                    variant="outlined"
                                    className='reg-input'
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required

                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Phone"
                                    size='small'
                                    variant="outlined"
                                    className='reg-input'
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required

                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size='small'
                                    className='reg-input'
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    size='small'
                                    variant="outlined"
                                    className='reg-input'
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Confirm password"
                                    size='small'
                                    variant="outlined"
                                    className='reg-input'
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            <Button
                                variant="contained"
                                size="small"
                                className='reg-submit'
                                type="submit"
                            >
                                Next
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reg;

