import React, { useState } from 'react';
import one from "../Images/pexels-navneet-shanu-202773-672630.jpg";
import two from "../Images/pexels-prakashq2-774282.jpg"
import three from "../Images/pexels-shubhamn-2403537.jpg"
import fore from "../Images/pexels-uwc12-574313.jpg"
import "../Static/Css/Register_phone.css"
import { RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../Firebase/Setup';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';


const Register_phone = () => {
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
        <div className='regphone-body'>
            <Toaster position='top-right' />
            <div className='regphone-body-1'>
                <div className='regphone-body-1-1'>
                    <p className='regphone-body-1-1-1'>APP NAME</p>
                </div>
                <div className='regphone-body-1-2'>
                    <img className='regphone-body-1-2-1' src={one} alt="" />
                </div>
                <div className='regphone-body-1-3'>
                    <img className='regphone-body-1-2-1' src={two} alt="" />
                </div>
                <div className='regphone-body-1-4'>
                    <img className='regphone-body-1-2-1' src={three} alt="" />
                </div>
                <div className='regphone-body-1-5'>
                    <img className='regphone-body-1-2-1' src={fore} alt="" />
                </div>
            </div>
            <div className='regphone-body-2'>
                <div className='regphone-body-2-1'>
                    <form className='regphone-body-2-1-1'>
                        <div className='regphone-body-2-1-1-1'>
                            <PhoneInput
                                country={"in"}
                                value={phone}
                                onChange={(phone) => setPhone("+" + phone)}
                                containerStyle={{ width: '150%' }}
                                inputStyle={{ width: '90%' }}
                            />
                        </div>

                        <div className='regphone-body-2-1-1-1'>
                            <button
                                className='regphone-body-2-1-1-1-btn'
                                type='submit'
                                onClick={sendOTP}
                            > G E T  C O D E</button>
                        </div>
                        <div className='regphone-body-2-1-1-1'>
                            <input type="text"
                                className='regphone-body-2-1-1-1-1'
                                placeholder=' O T P'
                                onChange={(e) => setOTP(e.target.value)}
                            />
                        </div>
                        <div className='regphone-body-2-1-1-1'>
                            <button
                                className='regphone-body-2-1-1-1-btn'
                                type='submit'
                                onClick={verifyOTP}
                            > VERFIY CODE</button>

                        </div>
                        <div className='regphone-body-2-1-1-1'>
                            <input type="email"
                                className='regphone-body-2-1-1-1-1'
                                placeholder=' EMAIL'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='regphone-body-2-1-1-1'>
                            <button
                                className='regphone-body-2-1-1-1-btn'
                                type='submit'
                                disabled={loginLoading}
                                onClick={handleEmailSubmit}
                            > GET LINK</button>
                        </div>
                    </form>


                </div>
            </div>

        </div>
    )
}

export default Register_phone
