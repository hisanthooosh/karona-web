import React, { useState } from 'react';
import '../Static/Css/Oprofile.css';
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react'
import { SlLogout } from "react-icons/sl";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button } from '@mui/material';
import { FaMicrophone } from "react-icons/fa";
import { Link } from 'react-router-dom';

const OtherProfile = () => {
    const navigate = useNavigate('');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [reels, setReels] = useState([]);
    const [name, setName] = useState('')
    useEffect(() => {
        const fetchReels = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.get(`http://localhost:9889/get-reels-by-username?username=${username}`);
                setReels(response.data.reels.map(reel => ({ ...reel, isLiked: false, likes: reel.likes || 0 }))); // Initialize isLiked state for each reel

            } catch (error) {
                console.error('Error fetching reels:', error);
            }
        };

        fetchReels();
    }, []);

    useEffect(() => {
        fetchUsernames();
        fetchUsername();
    }, []);

    const fetchUsernames = async () => {
        try {
            const response = await axios.get('http://localhost:9889/get-all-usernames');
            setUsernames(response.data.user_profiles);
        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    };

    const fetchUsername = () => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            console.error('Username not found in localStorage');
        }
    };

    useEffect(() => {
        const fetchName = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const response = await axios.get(`http://127.0.0.1:9889/profile/name/${storedUsername}`);
                    console.log('Name response:', response.data);
                    setName(response.data.name);
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching name:', error);
            }
        };
        fetchName();
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
        const fetchUsername = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    setUsername(storedUsername);
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        fetchUsername();
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
    return (
        <div className="other-profile-body">
            <section className='home-body-nav'>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <div className='home-body-dp'>
                            <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} onClick={(e) => navigate('/Profile')} />
                        </div>
                    </div>
                    <div className='home-body-nav-1-2'>

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
            <section className='main-profile-div'>
                <div className='main-profile-div-i-1'>
                    <div className='main-profile-div-i-1-1'>
                        <div className='main-profile-div-i-1-1-dp'>
                            img
                        </div>
                    </div>
                    <div className='main-profile-div-i-1-2'>
                        <div className='main-profile-div-i-1-2-1'>
                            <div className='main-profile-div-i-1-2-1-1'>
                                name
                            </div>
                            <div className='main-profile-div-i-1-2-1-2'>

                            </div>
                            <div className='main-profile-div-i-1-2-1-2'>

                            </div>
                        </div>
                        <div className='main-profile-div-i-1-2-2'>
                            <div className='main-profile-div-i-1-2-2-1'>
                                <h1>  100 <br />  Post</h1>
                            </div>
                            <div className='main-profile-div-i-1-2-2-1'>
                                <h1>  10 <br />Followers</h1>
                            </div>
                            <div className='main-profile-div-i-1-2-2-1'>
                                <h1>  102 <br />Following</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='main-profile-div-i-2'>
                    <div className='main-profile-div-i-2-1'>
                        <div className='main-profile-div-i-2-1-1'>

                        </div>
                        <div className='main-profile-div-i-2-1-2'>

                        </div>
                        <div className='main-profile-div-i-2-1-1'>
                            Link
                        </div>
                    </div>
                </div>
                <div className='main-profile-div-i-3-oprofile'>
                    <Button variant="contained" style={{ width: "30%" }}>Follow</Button> <Button style={{ width: "30%" }} variant="contained">Message</Button>
                </div>

                <div className='main-profile-div-i-3'>
                    Highlites
                </div>
                <Tabs className="c-h-e-p" >
                    <TabList className="c-h-e-1-p" >
                        <Tab className="c-h-e-1-1-p"> Post</Tab>
                        <Tab className="c-h-e-1-1-p">Reels</Tab>
                        <Tab className="c-h-e-1-1-p">Videos</Tab>
                        <Tab className="c-h-e-1-1-p">Playlist</Tab>
                        <Tab className="c-h-e-1-1-p">Live</Tab>
                    </TabList>
                    <TabPanel>
                        <h2>posts</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>reels</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>videos</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Playlist</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Live</h2>
                    </TabPanel>
                </Tabs>
            </section>
            <section className='submain-profile-div'>
                <div className='submain-profile-div-1'>
                    <div className='submain-profile-div-1-i'>
                        <div className='submain-profile-div-1-1'>
                            <input type="text" className='home-body-body-headder-2-searchbar' placeholder='Search...' />
                        </div>
                        <div className='submain-profile-div-1-2'>
                            <FaMicrophone />
                        </div>
                    </div>
                </div>
                <div className='ubmain-profile-div-2-0'>
                    Reels
                </div>

                <div className='submain-profile-div-2'>
                    <div className='submain-profile-div-2-1'>
                        {reels.map(reel => (

                            <div
                                key={reel.id}
                                style={{
                                    height: "100%",
                                    width: "50%",
                                    marginLeft: 5,
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
                                >
                                    <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />
                                </video>

                            </div>

                        ))}
                    </div>
                </div>

                <div className='ubmain-profile-div-2-0'>
                    People you might know
                </div>

                <div className='submain-profile-div-3-users'>
                    <div className='submain-profile-div-3-users-inner'>
                        <ul style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
                            <div style={{
                                height: "100%", borderRadius: "5%", marginLeft: "0.5%", border: "0px solid rgb(204, 190, 190)",
                                maxWidth: "300px", // Limit maximum width for responsiveness
                                minWidth: "120px", // Minimum width to ensure content visibility
                            }}>
                                {usernames
                                    .filter(user => user.username !== username) // Filter out the locally stored username
                                    .map((user, index) => (

                                        <li key={index} >
                                            <div className='users-list-container-pic'>
                                                <Link to={`/userprofile/${user.username}`}> <img src={`data:image/jpeg;base64,${user.profile_pic}`} alt='Profile Pic' className='users-list-container-pic-inner' /></Link>
                                            </div>
                                            <div className='users-list-container-name'>
                                                {user.name}
                                            </div>
                                            <div className='users-list-container-username'>
                                                {user.username}
                                            </div>
                                            <div className='users-list-container-btn'>
                                                <Button variant="contained">Follow</Button>
                                            </div>
                                        </li>

                                    ))}
                            </div>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OtherProfile;
