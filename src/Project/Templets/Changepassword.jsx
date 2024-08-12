import React, { useState } from 'react';
import "../Static/Css/Def.css"; // Import the corrected CSS file
import logo from "../Images/mylogo.svg.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function Changepassword() {
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
        <div className='changepassword-body'>
            <Toaster position='top-right' />
            <div className='changepassword-container'>
                <div className='changepassword-header'>
                    <img src={logo} alt="Logo" className='changepassword-logo' />
                    <p className='changepassword-title'>Karona</p>
                </div>
                <div className='changepassword-content'>
                    <p className='changepassword-welcome'>Create new password</p>
                    <form className='changepassword-form' onSubmit={handleSubmit}>
                        <div className='changepassword-input'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                placeholder='New password'
                                className='changepassword-input-field'
                                onBlur={handleBlur}
                                required
                            />
                        </div>
                        <div className='changepassword-input'>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Re-enter password'
                                className='changepassword-input-field'
                                required
                            />
                        </div>
                        <div className='changepassword-button'>
                            <button type="submit" className='changepassword-submit-btn'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Changepassword;

