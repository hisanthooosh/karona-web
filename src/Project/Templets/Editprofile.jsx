import React, { useState, useEffect } from 'react'
import "../Static/Css/Profile.css"
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
import Button from '@mui/material/Button';
import "../Static/Css/Editprofile.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MdDone } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const Editprofile = () => {
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
    const navigate = useNavigate();
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const gotoprofile = () => {
        navigate('/Profile');
    }
    const gotoSettings = () => {
        navigate('/Profile');
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const nameresponse = await axios.get(`http://localhost:9889/profile/name/${localStorage.getItem('username')}`);
                const bioresponse = await axios.get(`http://localhost:9889/profile/bio/${localStorage.getItem('username')}`);
                setName(nameresponse.data.name);
                setBio(bioresponse.data.bio);
                setUsername(localStorage.getItem('username'));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
        }
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('bio', bio);
        if (profileImage) {
            formData.append('image', profileImage);
        }
        try {
            const response = await axios.post('http://localhost:9889/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            navigate('/Profile')
            // Handle success message or navigation
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update profile. Please try again.');
        }
    };
    const handleSubmitName = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9889/profile/edit-name', {
                username: username, // Send the username
                newName: name, // Send the new name
            });
            console.log(response.data.message);
            // Optionally show success message or navigate to another page
        } catch (error) {
            console.error('Error updating name:', error);
            setError('Failed to update name. Please try again.');
        }
    };
    const handleSubmitUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9889/profile/edit-username', {
                currentUsername: localStorage.getItem('username'),
                newUsername: username
            });
            console.log(response.data.message);
            // Update local storage and disable edit mode
            localStorage.setItem('username', username);
            // Optionally show success message or navigate to another page
        } catch (error) {
            console.error('Error updating username:', error);
            toast.error("Failed to update username. Please try again.")
        }
    };
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
                console.error('Error fetching profile image:', error)
                setProfileImage()
            }
        };
        fetchProfileImage();
    }, [username]);
    const handleDeleteProfilePic = async () => {
        try {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                await axios.delete(`http://127.0.0.1:9889/profile/delete-image/${storedUsername}`);
                setProfileImage();
            } else {
                console.error('Username not found in localStorage');
            }
        } catch (error) {
            console.error('Error deleting profile picture:', error);
        }

    };

    return (
        <section className='Profile-body'>
            <section className='home-body-nav'>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1-home'>
                        <CgProfile />
                    </div>
                    <div className='home-body-nav-1-2'>
                        name
                    </div>
                </div>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <IoHomeSharp />
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
            <form className='editprofile' onSubmit={handleSubmit} >
                <div className='editprofile-1'>
                    <div className='editprofile-1-1' onClick={(e) => navigate('/Profile')} >
                        <IoMdArrowRoundBack />
                    </div>
                    <div className='editprofile-1-2'>
                        <p>Edit profile</p>
                    </div>

                </div>
                <div className='editprofile-2'>
                    <div className='editprofile-2-1'>
                        <div className='editprofile-2-1-dp'>
                            <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} />
                        </div>
                    </div>
                    <div className='editprofile-2-1-btn'>
                        <input
                            type="file"
                            accept='image/*'
                            onChange={handleImageChange}
                            className='editprofile-2-1-btn-changeimg'
                            id="upload-button"
                        />
                        <label htmlFor="upload-button" className="button-label">
                            NEW PROFILE
                        </label>
                        <Button variant="outlined" onClick={handleDeleteProfilePic}>Remove pic</Button>
                    </div>
                </div>
                <div className='editprofile-3'>
                    <input type="text" className='ditprofile-1-input' id='name' placeholder='Name' value={name} onChange={handleNameChange} />
                    <div className=' editprofile-3-btn'>
                        <MdDone onClick={handleSubmitName} />
                    </div>
                </div>
                <div className='editprofile-3'>
                    <input type="text" className='ditprofile-1-input' value={username} placeholder='Username' id='username' onChange={handleUsernameChange} />
                    <div className=' editprofile-3-btn'>
                        <MdDone onClick={handleSubmitUsername} />
                    </div>
                </div>
                <div className='editprofile-3'>
                    <input type="text" className='ditprofile-1-input' placeholder='Bio' value={bio} onChange={handleBioChange} />
                    <div className=' editprofile-3-btn'>
                        <MdDone />
                    </div>
                </div>
                <div className='editprofile-4'>
                    <div className='editprofile-4-1' >
                        <p>Add Link</p>
                    </div>
                    <div className='editprofile-4-2'>
                        <input type="text" className='ditprofile-1-input' placeholder='Add name' />
                    </div>
                    <div className='editprofile-4-2'>
                        <input type="text" className='ditprofile-1-input' placeholder='Link' />
                    </div>
                </div>
                <div className='editprofile-5'>
                    <div className='editprofile-5-1'>
                        <p>Gender</p>
                    </div>
                    <div className='editprofile-5-2'>
                        <div className='editprofile-5-2-1'>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </div>
                    </div>
                </div>
                <div className='editprofile-6'>
                    <Button variant='outlined' type='submit'>Submit</Button>
                </div>
            </form>
        </section>
    )
}

export default Editprofile

