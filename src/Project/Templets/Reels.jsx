import React, { useState } from 'react'
import "../Static/Css/Home.css"
import "../Static/Css/Reels.css"
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
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import axios from 'axios';
import { useEffect } from 'react'
import { useRef } from "react"
import { IoClose } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";

const Reels = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [profileImages, setProfileImages] = useState({});
    const videoRefs = useRef({});
    const [isModalcommentOpen, setIsModalcommentOpen] = useState(false);


    const handleModalcommentOpen = () => {
        setIsModalcommentOpen(true);
    };
    const handleModalcommentClose = () => {
        setIsModalcommentOpen(false);
    };
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



    const [reels, setReels] = useState([]);
    useEffect(() => {
        const fetchReels = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-reels');
                const reelsData = response.data.reels.map(reel => ({ ...reel, isLiked: false, likes: reel.likes || 0 }));
                setReels(reelsData);

            } catch (error) {
                console.error('Error fetching reels:', error);
            }
        };

        fetchReels();
    }, []);


    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const response = await axios.get(`http://127.0.0.1:9889/profile/image/${storedUsername}`, {
                        responseType: 'arraybuffer'
                    });
                    const imageData = btoa(
                        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    setProfileImage(`data:image/png;base64,${imageData}`);
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
                setProfileImage()
            }
        };
        fetchProfileImage();
    }, [username]);
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const response = await axios.get(`http://127.0.0.1:9889/profile/image/${storedUsername}`, {
                        responseType: 'arraybuffer'
                    });
                    const imageData = btoa(
                        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    setProfileImage(`data:image/png;base64,${imageData}`);
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
                setProfileImage()
            }
        };
        fetchProfileImage();
    }, [username]);

    const fetchUsernames = async () => {
        try {
            const response = await axios.get('http://localhost:9889/get-all-usernames');
            const users = response.data.user_profiles;

            // Fetch names for each user
            const updatedUsers = await Promise.all(users.map(async (user) => {
                try {
                    const nameResponse = await axios.get(`http://localhost:9889/profile/name/${user.username}`);
                    const name = nameResponse.data.name;
                    return { ...user, name };
                } catch (error) {
                    console.error(`Error fetching name for ${user.username}:`, error);
                    return { ...user, name: null }; // Handle error appropriately in your application
                }
            }));

            setUsernames(updatedUsers);

            // Optionally, update the follow state here as well

        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    };

    return (

        <div className='home-body'>
            <section className='home-body-nav-post'>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <div className='home-body-dp'>
                            <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} onClick={(e) => navigate('/Profile')} />
                        </div>
                    </div>
                    <div className='home-body-nav-1-2'>
                        {username}
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
                    <div className='home-body-nav-1-1-home'>
                        <TfiVideoClapper />
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
                <div className='home-body-body-headder-reels'>
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

                <div className='home-body-body-headder-reelbody'>
                    <div className='home-body-body-headder-reelbody-inner'>

                        {reels.map(reel => (
                            <div className='home-body-body-headder-reelbody-inner-1'>


                                <div
                                    key={reel.id}
                                    style={{
                                        height: "100%",
                                        width: "100%",

                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: 5,
                                        border: "1px solid rgb(204, 190, 190)",
                                        cursor: "pointer",

                                    }}
                                    onClick={() => navigate(`/content-details/${reel.id}/Reel`)}
                                >
                                    <video
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "cover", // Ensure video covers the container
                                        }}
                                        autoPlay

                                    >
                                        <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />

                                    </video>
                                    <div className='home-body-body-headder-reelbody-inner-1-likeandall'>
                                        <div className='reel-div-main-i-2-1'>

                                        </div>
                                        <div className='reel-div-main-i-2-2'>
                                            <FaRegHeart />
                                        </div>
                                        <div className='reel-div-main-i-2-2'>
                                            <FaRegComment onClick={handleModalcommentOpen} />
                                        </div>
                                        <div className='reel-div-main-i-2-2'>
                                            <FiSend />
                                        </div>
                                        <div className='reel-div-main-i-2-2'>
                                            <FaRegBookmark />
                                        </div>
                                        <div className='reel-div-main-i-2-2'>
                                            <IoMdMore />
                                        </div>
                                        <div className='reel-div-main-i-2-2'>
                                            <CgProfile />
                                        </div>
                                    </div>

                                </div>
                                <div className='home-body-body-headder-reelbody-inner-1-likeandall'>
                                    <div className='reel-div-main-i-2-1'>

                                    </div>
                                    <div className='reel-div-main-i-2-2'>
                                        <FaRegHeart />
                                    </div>
                                    <div className='reel-div-main-i-2-2'>
                                        <FaRegComment onClick={handleModalcommentOpen} />
                                    </div>
                                    <div className='reel-div-main-i-2-2'>
                                        <FiSend />
                                    </div>
                                    <div className='reel-div-main-i-2-2'>
                                        <FaRegBookmark />
                                    </div>
                                    <div className='reel-div-main-i-2-2'>
                                        <IoMdMore />
                                    </div>
                                    <div className='reel-div-main-i-2-2'>
                                        <CgProfile />
                                    </div>
                                </div>


                            </div>
                        ))}

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
            {isModalcommentOpen && (
                <div className='modal-comment-reel' >
                    <div className='modal-comment-reel-inner'>
                        <div className='modal-comment-reel-inner-1'>
                            Comments 0<IoClose onClick={handleModalcommentClose} />
                        </div>
                        <div className='modal-comment-reel-inner-2'>

                        </div>
                        <div className='content-details-foot-3-3-comment-2'>
                            <div className='content-details-foot-3-3-comment-2-1'>
                                <div className='content-details-foot-3-3-comment-2-1-1'>
                                    <input type="text" className='content-details-foot-3-3-comment-2-1-1-input-reel-comment' placeholder='Comment you opnion' />
                                </div>
                                <div className='content-details-foot-3-3-comment-2-1-2'>
                                    <div className='content-details-foot-3-3-comment-2-1-2-1'>
                                        <CiFaceSmile />
                                    </div>
                                    <div className='content-details-foot-3-3-comment-2-1-2-1'>
                                        <FiSend />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Reels
