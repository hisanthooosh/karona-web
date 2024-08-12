import React, { useState } from 'react';
import one from "../Images/pexels-navneet-shanu-202773-672630.jpg";
import two from "../Images/pexels-prakashq2-774282.jpg"
import three from "../Images/pexels-shubhamn-2403537.jpg"
import fore from "../Images/pexels-uwc12-574313.jpg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Newchpass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === 'password' && value) {
            if (!validatePassword(value)) {
                toast.error('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords should match');
            return;
        }


        const email = localStorage.getItem('re-email');
        const phone = localStorage.getItem('re-phone');

        try {
            if (email) {
                await axios.post('http://127.0.0.1:9889/reset-password', { email, password });
                setSuccessMsg('Password reset successfully.');
                navigate('/login');
            } else if (phone) {
                await axios.post('http://127.0.0.1:9889/reset-password', { phone, password });
                setSuccessMsg('Password reset successfully.');
                navigate('/login');
            } else {
                setError('Email or phone not found.');
            }
        } catch (error) {
            setError(error.response.data.error);
        }
    };
    return (
        <div className='Rpp-body'>
            <Toaster position='top-right' />
            <div className='Rpp-body-1'>
                <div className='Rpp-body-1-1'>
                    <p className='Rpp-body-1-1-1'>APP NAME</p>
                </div>
                <div className='Rpp-body-1-2'>
                    <img className='Rpp-body-1-2-1' src={one} alt="" />
                </div>
                <div className='Rpp-body-1-3'>
                    <img className='Rpp-body-1-2-1' src={two} alt="" />
                </div>
                <div className='Rpp-body-1-4'>
                    <img className='Rpp-body-1-2-1' src={three} alt="" />
                </div>
                <div className='Rpp-body-1-5'>
                    <img className='Rpp-body-1-2-1' src={fore} alt="" />
                </div>
            </div>
            <div className='Rpp-body-2'>
                <div className='Rpp-body-2-1'>
                    <form className='Rpp-body-2-1-1'>
                        <div className='Rpp-body-2-1-11'>
                            <p>New password</p>
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <input
                                className='def-body-2-1-1-1-1'
                                placeholder='New Password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                onBlur={handleBlur}
                                required
                            />
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <input type="text"
                                className='def-body-2-1-1-1-1'
                                placeholder='Renter Paswword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <button className='Rpp-body-2-1-12-btn' type="submit"   >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Newchpass
