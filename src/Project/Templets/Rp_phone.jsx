import React, { useState } from 'react';
import one from "../Images/pexels-navneet-shanu-202773-672630.jpg";
import two from "../Images/pexels-prakashq2-774282.jpg"
import three from "../Images/pexels-shubhamn-2403537.jpg"
import fore from "../Images/pexels-uwc12-574313.jpg"
import "../Static/Css/Rp_phone.css"
import PhoneInput from 'react-phone-input-2';
import { toast, Toaster } from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../Firebase/Setup';
import { useNavigate } from 'react-router-dom';

const Rp_phone = () => {
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
                            <PhoneInput
                                type="tel"
                                inputStyle={{ height: "40px", width: "100%" }}
                                value={phone}
                                onChange={(phone) => setPhone("+" + phone)}
                                country={"in"}
                                placeholder='Phone number'

                            />
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <button className='Rpp-body-2-1-12-btn' onClick={sendOTP}>
                                GET CODE
                            </button>
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <input type="text" className='Rpp-body-2-1-12-input' placeholder='O T P' onChange={(e) => setOTP(e.target.value)} />
                        </div>
                        <div className='Rpp-body-2-1-12'>
                            <button className='Rpp-body-2-1-12-btn' onClick={verifyOTP}>
                                CHANGE PASSWORD
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Rp_phone
