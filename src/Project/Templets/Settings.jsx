import React, { useState } from 'react'
import "../Static/Css/Home.css"
import { CgProfile } from "react-icons/cg";
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import "../Static/Css/Settings.css"
import { FaCaretRight } from "react-icons/fa";
import { TbActivity } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { IoLockOpenOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { BiMessageSquareDots } from "react-icons/bi";
import { GoTag } from "react-icons/go";
import { AiOutlineComment } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { SiAdblock } from "react-icons/si";
import { RiSpamLine } from "react-icons/ri";
import { MdHideSource } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { PiStarThin } from "react-icons/pi";
import { FiBellOff } from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { MdOutlinePermDataSetting } from "react-icons/md";
import { FaLanguage } from "react-icons/fa6";
import { FaUniversalAccess } from "react-icons/fa6";
import { MdOutlineDownload } from "react-icons/md";

const Settings = () => {

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
                    <div className='home-body-nav-1-1'>
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
                <div className='settings-maindiv'>
                    <div className='settings-maindiv-1'>
                        <p>Settings</p>
                    </div>
                    <div className='settings-maindiv-2'>
                        <input type="text" className='home-body-body-headder-2-searchbar' placeholder='Search...' />
                    </div>
                    <div className='settings-maindiv-3'>
                        <p>Your Account</p>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <CgProfile />
                        </div>
                        <div className='settings-maindiv-4-2'>
                            <div className='settings-maindiv-4-2-1'>
                                Account Center
                            </div>
                            <div className='settings-maindiv-4-2-2'>
                                Password,security,personal details
                            </div>
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-3'>
                        <p>How you use our App</p>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <FaRegBookmark />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Saved
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <FaHistory />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Archive
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <TbActivity />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Your activity
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <GoBell />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Notificatons
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <IoMdTime />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Time Spent
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-3'>
                        <p>Who can see your content</p>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <IoLockOpenOutline />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Account Privacy
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <FaUserFriends />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Close Friends
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <MdBlock />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Blocked
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <BiSolidHide />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Hide Story and live
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-3'>
                        <p>How others can interact with you </p>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <BiMessageSquareDots />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Message and story replies
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <GoTag />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Tags and mensions
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <AiOutlineComment />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Comments
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <RiShareForwardLine />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Share and remixes
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <RxAvatar />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Avatar interaction
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <SiAdblock />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Restricted
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <RiSpamLine />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Limited interactons
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <MdHideSource />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Hidden words
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <IoMdPersonAdd />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Follow and invite friends
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-3'>
                        <p>What You See</p>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <PiStarThin />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Favorites
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <FiBellOff />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Muted accounts
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <MdOutlineVideoLibrary />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Suggested contant
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <IoHeartDislikeOutline />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Like and Share counts
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-3'>
                        <p>Your app and media</p>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>

                            <MdOutlineDownload />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Archiving and Downloding
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <FaUniversalAccess />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Accessibility
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <FaLanguage />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Language
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <MdOutlinePermDataSetting />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Data usage and media quality
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='settings-maindiv-4'>
                        <div className='settings-maindiv-4-1'>
                            <CgWebsite />
                        </div>
                        <div className='settings-maindiv-4-2-x'>
                            Website permissions
                        </div>
                        <div className='settings-maindiv-4-1'>
                            <FaCaretRight />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Settings
