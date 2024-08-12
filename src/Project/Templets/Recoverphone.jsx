import React, { useState } from 'react';
import "../Static/Css/Def.css";
import logo from "../Images/mylogo.svg.png";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2';
import { toast, Toaster } from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../Firebase/Setup';
import { useNavigate } from 'react-router-dom';

function Recoverphone() {
    const [phone, setPhone] = useState("");
    const [user, setUser] = useState(null);
    const [OTP, setOTP] = useState("");
    const [invalidOTP, setInvalidOTP] = useState(false);
    const navigate = useNavigate();

    const sendOTP = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:9889/check-phone-existence', { phone });
            console.log(response.data);
            if (response.data.exists) {
                localStorage.setItem('re-phone', phone);
                const recap = new RecaptchaVerifier(auth, "recap", {});
                const confirmation = await signInWithPhoneNumber(auth, phone, recap);
                setUser(confirmation);
                await axios.post('http://127.0.0.1:9889/phone');
            } else {
                console.log('Phone number does not exist');
                toast.error('You are a new user! Please register first.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const verifyOTP = async () => {
        try {
            const data = await user.confirm(OTP);
            console.log(data);
            navigate('/Changepassword');
        } catch (error) {
            console.error(error);
            setInvalidOTP(true);
            toast.error('Invalid OTP');
        }
    };

    return (
        <>
            <body className='recoverphone-body'>
                <Toaster position='top-right' />
                <div className='recoverphone-container'>
                    <div className='recoverphone-header'>
                        <img src={logo} alt="Logo" className='recoverphone-logo' />
                        <p className='recoverphone-title'>Karona</p>
                    </div>
                    <div className='recoverphone-content'>
                        <p className='recoverphone-welcome'>Forgot Password</p>
                        <div className='recoverphone-section'>
                            <PhoneInput
                                type="tel"
                                inputStyle={{ height: "40px", width: "100%" }}
                                value={phone}
                                onChange={(phone) => setPhone("+" + phone)}
                                country={"in"}
                                placeholder='Phone number'

                            />
                        </div>
                        <div className='recoverphone-section'>
                            <Button
                                variant="contained"
                                size="small"
                                className='recoverphone-btn'
                                onClick={sendOTP}
                            >
                                Get Code
                            </Button>

                        </div>
                        <div className='recoverphone-section'>
                            <TextField
                                onChange={(e) => setOTP(e.target.value)}
                                type="text"
                                size="small"
                                className='recoverphone-otp'
                                id="outlined-basic"
                                label="OTP"
                                variant="outlined"
                                required
                            />
                        </div>
                        <div className='recoverphone-section'>

                            <Button
                                variant="contained"
                                size="small"
                                className='recoverphone-btn'
                                onClick={verifyOTP}
                            >
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
            </body>
            <div id='recap'></div>
        </>
    );
}

export default Recoverphone;
