import React, { useState } from 'react';
import one from "../Images/pexels-navneet-shanu-202773-672630.jpg";
import two from "../Images/pexels-prakashq2-774282.jpg"
import three from "../Images/pexels-shubhamn-2403537.jpg"
import fore from "../Images/pexels-uwc12-574313.jpg"
import { useNavigate } from 'react-router-dom';
import "../Static/Css/Forgetpasswordone.css"

const Forgetpasswordone = () => {
    const navigate = useNavigate();
    return (
        <div className='Fp-body'>
            <div className='Fp-body-1'>
                <div className='Fp-body-1-1'>
                    <p className='Fp-body-1-1-1'>APP NAME</p>
                </div>
                <div className='Fp-body-1-2'>
                    <img className='Fp-body-1-2-1' src={one} alt="" />
                </div>
                <div className='Fp-body-1-3'>
                    <img className='Fp-body-1-2-1' src={two} alt="" />
                </div>
                <div className='Fp-body-1-4'>
                    <img className='Fp-body-1-2-1' src={three} alt="" />
                </div>
                <div className='Fp-body-1-5'>
                    <img className='Fp-body-1-2-1' src={fore} alt="" />
                </div>
            </div>
            <div className='Fp-body-2'>
                <div className='Fp-body-2-1'>
                    <form className='Fp-body-2-1-1'>
                        <div className='Fp-body-2-1-1-11'>
                            <p>Forgot Password ?</p>
                        </div>
                        <div className='Fp-body-2-1-1-11'>
                            <button className='Fp-body-2-1-1-11-btn' onClick={() => navigate('/Rp_phone')}>
                                Recover with Phone
                            </button>
                        </div>
                        <div className='Fp-body-2-1-1-11'>
                            <button className='Fp-body-2-1-1-11-btn' onClick={() => navigate('/Rp_email')}>
                                Recover with Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Forgetpasswordone
