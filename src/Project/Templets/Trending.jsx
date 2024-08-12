import React, { useState } from 'react'
import "../Static/Css/Home.css"
import logo from "../Images/mylogo.svg.png"
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

const Trending = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalVoiceOpen = () => {
        setIsModalVoiceOpen(true);
    };

    const handleModalVoiceClose = () => {
        setIsModalVoiceOpen(false);
    };
    const navigate = useNavigate('');

    return (

        <div className='home-body'>
            <section className='home-body-nav'>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <CgProfile />
                    </div>
                    <div className='home-body-nav-1-2'>
                        name
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <IoHomeSharp onClick={(e) => navigate('/Home')} />
                    </div>
                    <div className='home-body-nav-1-2'>
                        Home
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <TfiVideoClapper onClick={(e) => navigate('/Reels')} />
                    </div>
                    <div className='home-body-nav-1-2'>
                        Reels
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <FiSend onClick={(e) => navigate('/Message')} />
                    </div>
                    <div className='home-body-nav-1-2'>
                        Messages
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1-home'>
                        <FaFireAlt onClick={(e) => navigate('/Trending')} />
                    </div>
                    <div className='home-body-nav-1-2'>
                        Trending
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <FaRegBookmark onClick={(e) => navigate('/Saved')} />
                    </div>
                    <div className='home-body-nav-1-2'>
                        Saved
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <FaHistory onClick={(e) => navigate('/History')} />
                    </div>
                    <div className='home-body-nav-1-2'>
                        History
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <SlLogout onClick={(e) => navigate('/Login')} />
                    </div>
                    <div className='home-body-nav-1-2'>
                        Logout
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <IoIosMore />
                    </div>
                    <div className='home-body-nav-1-2'>
                        More
                    </div>
                </div>
            </section>
            <section className='home-body-body'>
                <div className='home-body-body-headder'>
                    <div className='home-body-body-headder-1'>
                        <img src={logo} alt="" className='home-body-body-headder-1-logo' />
                    </div>
                    <div className='home-body-body-headder-2'>
                        <input type="text" className='home-body-body-headder-2-searchbar' placeholder='Search...' />
                    </div>
                    <div className='home-body-body-headder-3'>
                        <IoIosSearch />
                    </div>
                    <div className='home-body-body-headder-3' onClick={handleModalVoiceOpen}>
                        <FaMicrophone />
                    </div>
                    <div className='home-body-body-headder-3' onClick={handleModalOpen}>
                        <LuBellRing />
                    </div>
                    <div className='home-body-body-headder-3'>
                        <MdAddBox />
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <div className='modal' onClick={handleModalClose}>
                    <div className='modal-content' >
                        <span className='close-button' onClick={handleModalClose}>&times;</span>
                        <div className='modal-content-1'>
                            Notifications
                        </div>
                    </div>
                </div>
            )}
            {isModalVoiceOpen && (
                <div className='modal' onClick={handleModalVoiceClose}>
                    <div className='modal-content-voice' >
                        <span className='close-button' onClick={handleModalVoiceClose}>&times;</span>
                        <div className='modal-content-1'>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Trending
