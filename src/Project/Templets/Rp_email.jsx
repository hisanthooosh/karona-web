import React, { useState } from 'react';
import one from "../Images/pexels-navneet-shanu-202773-672630.jpg";
import two from "../Images/pexels-prakashq2-774282.jpg"
import three from "../Images/pexels-shubhamn-2403537.jpg"
import fore from "../Images/pexels-uwc12-574313.jpg"
import axios from 'axios';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../Firebase/Setup';
import { toast, Toaster } from 'react-hot-toast';
import TextField from '@mui/material/TextField';

const Rp_email = () => {
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
                            <p>Forgot Password</p>
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='Rpp-body-2-1-12-1'
                            />
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <button className='Rpp-body-2-1-12-btn' disabled={loginLoading}    >
                                {loginLoading ? 'Sending...' : 'Get Link'}
                            </button>
                        </div>


                    </form>
                    {loginError && <div className='recoveremail-error'>{loginError}</div>}
                    {infoMsg && <div className='recoveremail-info'>{infoMsg}</div>}
                </div>
            </div>

        </div>
    )
}

export default Rp_email
