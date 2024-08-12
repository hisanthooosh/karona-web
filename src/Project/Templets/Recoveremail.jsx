import React, { useState } from 'react';
import "../Static/Css/Def.css";
import logo from "../Images/mylogo.svg.png";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../Firebase/Setup';
import { toast, Toaster } from 'react-hot-toast';

function Recoveremail() {
    const [email, setEmail] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [infoMsg, setInfoMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        try {
            // Check if the email exists in the database
            const response = await axios.post('http://127.0.0.1:9889/check-email-existence', { email });
            if (response.data.exists) {
                // Email exists in the database, send verification link
                localStorage.setItem('re-email', email);
                await sendSignInLinkToEmail(auth, email, {
                    url: 'http://localhost:3000/Resetpassword', // URL to redirect after email verification
                    handleCodeInApp: true,
                });
                toast.success('We have sent you an email with a link to sign in');
            } else {
                // Email does not exist in the database
                toast.error('You are a new user, please create an account first');
            }
        } catch (error) {
            setLoginError(error.message);
        }
        setLoginLoading(false);
    };

    return (
        <body className='recoveremail-body'>
            <Toaster position='top-right' />
            <div className='recoveremail-container'>
                <div className='recoveremail-header'>
                    <img src={logo} alt="Logo" className='recoveremail-logo' />
                    <p className='recoveremail-title'>Karona</p>
                </div>
                <div className='recoveremail-content'>
                    <div className='recoveremail-section'>
                        <p className='recoveremail-section-title'>Enter your E-mail</p>
                    </div>
                    <form className='recoveremail-form' onSubmit={handleSubmit}>
                        <div className='recoveremail-form-row'>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='recoveremail-input'
                            />
                        </div>
                        <div className='recoveremail-form-row'>
                            <button
                                type='submit'
                                className='recoveremail-btn'
                                disabled={loginLoading}
                            >
                                {loginLoading ? 'Sending...' : 'Get Link'}
                            </button>
                        </div>
                    </form>
                    {loginError && <div className='recoveremail-error'>{loginError}</div>}
                    {infoMsg && <div className='recoveremail-info'>{infoMsg}</div>}
                </div>
            </div>
        </body>
    );
}

export default Recoveremail;
