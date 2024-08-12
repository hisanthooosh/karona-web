import React, { useState } from 'react';
import "../Static/Css/Def.css"; // Import the corrected CSS file
import logo from "../Images/mylogo.svg.png";
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2';
import Button from '@mui/material/Button';
import { RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../Firebase/Setup';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [phone, setPhone] = useState("");
    const [user, setUser] = useState(null);
    const [OTP, setOTP] = useState("");
    const [email, setEmail] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [infoMsg, setInfoMsg] = useState('');
    const [invalidOTP, setInvalidOTP] = useState(false);
    const navigate = useNavigate();

    const sendOTP = async () => {
        if (!phone) {
            toast.error('Please enter phone number');
            return;
        }

        const phoneNumberWithoutCountryCode = phone.replace('+91', '');
        if (phoneNumberWithoutCountryCode.length !== 10) {
            toast.error('Invalid number. Please enter a 10-digit phone number.');
            return;
        }

        try {
            const recap = new RecaptchaVerifier(auth, "signup-recap", {});
            const confirmation = await signInWithPhoneNumber(auth, phone, recap);
            setUser(confirmation);
            await axios.post('http://127.0.0.1:9889/phone', { phone });
            localStorage.setItem('phone', phone);
        } catch (error) {
            console.error(error);
            alert('Please enter a valid phone number');
        }
    };

    const verifyOTP = async () => {
        try {
            const data = await user.confirm(OTP);
            console.log(data);
        } catch (error) {
            console.error(error);
            setInvalidOTP(true);
            toast.error('Invalid OTP');
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter email');
            return;
        }

        setLoginLoading(true);
        try {
            await axios.post('http://127.0.0.1:9889/verify-email', { email });
            localStorage.setItem('email', email);
            await sendSignInLinkToEmail(auth, email, {
                url: 'http://localhost:3000/reg',
                handleCodeInApp: true,
            });
            setInfoMsg('We have sent you an email with a link to sign in');
        } catch (error) {
            setLoginError(error.message);
        }
        setLoginLoading(false);
    };

    return (
        <section className="signup-body">
            <div className='signup-container' >
                <Toaster position='top-right' />
                <div className='signup-header'>
                    <img src={logo} alt="Logo" className='signup-logo' />
                    <p className='signup-title'>Karona</p>
                </div>
                <div className='signup-content'>
                    <p className='signup-welcome'>Welcome to Karona</p>
                    <div className='signup-section'>
                        <PhoneInput
                            country={"in"}
                            value={phone}
                            onChange={(phone) => setPhone("+" + phone)}
                            containerStyle={{ width: '100%' }}
                            inputStyle={{ width: '100%' }}
                        />
                        <Button
                            onClick={sendOTP}
                            variant='contained'
                            className='signup-btn'
                            style={{ marginTop: "2%" }}
                        >
                            Get Code
                        </Button>
                    </div>
                    <div className='signup-section'>
                        <TextField
                            onChange={(e) => setOTP(e.target.value)}
                            variant='outlined'
                            size="small"
                            label="OTP"
                            fullWidth
                            className='signup-input'
                        />
                        <Button
                            onClick={verifyOTP}
                            variant='contained'
                            className='signup-btn'
                            style={{ marginTop: "2%" }}
                        >
                            Verify OTP
                        </Button>
                        {invalidOTP && <p className='signup-error'>Invalid OTP, please try again.</p>}
                    </div>
                    <div className='signup-section'>
                        <TextField
                            type='email'
                            variant='outlined'
                            size="small"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='signup-input'
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loginLoading}
                            onClick={handleEmailSubmit}
                            className='signup-btn'
                            style={{ marginTop: "2%" }}
                        >
                            {loginLoading ? 'Sending...' : 'Send Link'}
                        </Button>
                    </div>
                    {infoMsg && <p className='signup-info'>{infoMsg}</p>}
                    {loginError && <p className='signup-error'>Error: {loginError}</p>}
                    <div className='signup-login'>
                        <p>Already have an account? <span className='signup-login-link' onClick={() => navigate("/Login")}>Login</span></p>
                    </div>
                </div>
                <div id='signup-recap'></div>
            </div>
        </section>

    );
}

export default Signup;
