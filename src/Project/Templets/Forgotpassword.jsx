import React from 'react';
import "../Static/Css/Def.css"; // Import the corrected CSS file
import logo from "../Images/mylogo.svg.png";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Forgotpassword() {

    const navigate = useNavigate();

    return (
        <div className='forgotpassword-body'>
            <div className='forgotpassword-container'>
                <div className='forgotpassword-header'>
                    <img src={logo} alt="Logo" className='forgotpassword-logo' />
                    <p className='forgotpassword-title'>Karona</p>
                </div>
                <div className='forgotpassword-content'>
                    <div className='forgotpassword-section'>
                        <p className='forgotpassword-section-title'>Forgot Password</p>
                    </div>
                    <div className='forgotpassword-options'>
                        <div className='forgotpassword-option'>
                            <p className='forgotpassword-option-text'>Recover password with number</p>
                            <Button
                                variant="contained"
                                size="small"
                                style={{ width: "60%" }}
                                onClick={() => navigate('/Recoverphone')}
                                className='forgotpassword-button'
                            >
                                Go
                            </Button>
                        </div>
                        <div className='forgotpassword-option'>
                            <p className='forgotpassword-option-text'>Recover password with Email</p>
                            <Button
                                variant="contained"
                                size="small"
                                style={{ width: "60%" }}
                                onClick={() => navigate('/Recoveremail')}
                                className='forgotpassword-button'
                            >
                                Go
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgotpassword;
