// // import React from 'react'
// // import "../Static/Css/Upost.css"

// // const Upost = () => {
// //   return (
// //    <section className='upost-body'>

// //    </section>
// //   )
// // }

// // export default Upost

// import React, { useState, useEffect } from 'react'
// import { FaImage, FaPoll, FaQuestionCircle, FaVideo, FaUserCircle } from 'react-icons/fa';
// import '../Static/Css/Upost.css';
// import axios from 'axios';

// const Upost = () => {
//     const [postText, setPostText] = useState('');
//     const [username, setUsername] = useState('');
//     const [profileImage, setProfileImage] = useState('')

//     const handlePost = () => {
//         // Post submission logic
//         alert('Post submitted!');
//     };
//     useEffect(() => {
//         const fetchUsername = async () => {
//             try {
//                 const storedUsername = localStorage.getItem('username');
//                 if (storedUsername) {
//                     setUsername(storedUsername);
//                 } else {
//                     console.error('Username not found in localStorage');
//                 }
//             } catch (error) {
//                 console.error('Error fetching username:', error);
//             }
//         };
//         fetchUsername();
//     }, []);
//     useEffect(() => {
//         const fetchProfileImage = async () => {
//             try {
//                 const storedUsername = localStorage.getItem('username');
//                 if (storedUsername) {
//                     const response = await axios.get(`http://127.0.0.1:9889/profile/image/${storedUsername}`, {
//                         responseType: 'arraybuffer'
//                     });
//                     const imageData = btoa(
//                         new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
//                     );
//                     setProfileImage(`data:image/png;base64,${imageData}`);
//                 } else {
//                     console.error('Username not found in localStorage');
//                 }
//             } catch (error) {
//                 console.error('Error fetching profile image:', error);
//                 setProfileImage()
//             }
//         };
//         fetchProfileImage();
//     }, [username]);

//     return (

//         <div className='post-body'>
//             <div className="post-upload">
//                 <div className="post-header">

//                     <img src={profileImage} alt="" className="user-avatar" />
//                     <div className="user-info">
//                         <span className="username">{'@' + username}</span>
//                     </div>
//                 </div>
//                 <textarea
//                     className="post-input"
//                     placeholder="What's on your mind?"
//                     value={postText}
//                     onChange={(e) => setPostText(e.target.value)}
//                 />
//                 <div className="post-options">
//                     <button className="option-button">
//                         <FaImage /> Image
//                     </button>
//                     <button className="option-button">
//                         <FaPoll /> Image poll
//                     </button>
//                     <button className="option-button">
//                         <FaPoll /> Text poll
//                     </button>
//                     <button className="option-button">
//                         <FaQuestionCircle /> Quiz
//                     </button>

//                 </div>
//                 <div className="post-actions">
//                     <button className="cancel-button">Cancel</button>
//                     <button className="post-button" onClick={handlePost}>Post</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Upost;


// import React, { useState } from 'react';
// import { FaImage, FaPoll, FaQuestionCircle, FaVideo, FaUserCircle, FaArrowLeft, FaTimes } from 'react-icons/fa';
// import '../Static/Css/Upost.css';

// const Upost = () => {
//     const [postText, setPostText] = useState('');
//     const [isImageModalOpen, setImageModalOpen] = useState(false);
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [imageCaption, setImageCaption] = useState('');
//     const [imageBio, setImageBio] = useState('');
//     const [location, setLocation] = useState('');
//     const [tags, setTags] = useState('');
//     const [commentsOff, setCommentsOff] = useState(false);

//     const handlePost = () => {
//         // Post submission logic
//         alert('Post submitted!');
//     };

//     const handleImageSelect = (e) => {
//         setSelectedImages([...e.target.files]);
//     };

//     const toggleComments = () => {
//         setCommentsOff(!commentsOff);
//     };

//     return (
//         <div className='post-body'>
//             <div className="post-upload">
//                 <div className="post-header">
//                     <FaUserCircle className="user-avatar" />
//                     <div className="user-info">
//                         <span className="username">Santhu Royal</span>
//                         <div className="visibility">Visibility: Public</div>
//                     </div>
//                 </div>
//                 <textarea
//                     className="post-input"
//                     placeholder="What's on your mind?"
//                     value={postText}
//                     onChange={(e) => setPostText(e.target.value)}
//                 />
//                 <div className="post-options">
//                     <button className="option-button" onClick={() => setImageModalOpen(true)}>
//                         <FaImage /> Image
//                     </button>
//                     <button className="option-button">
//                         <FaPoll /> Image poll
//                     </button>
//                     <button className="option-button">
//                         <FaPoll /> Text poll
//                     </button>
//                     <button className="option-button">
//                         <FaQuestionCircle /> Quiz
//                     </button>
//                     <button className="option-button">
//                         <FaVideo /> Video
//                     </button>
//                 </div>
//                 <div className="post-actions">
//                     <button className="cancel-button">Cancel</button>
//                     <button className="post-button" onClick={handlePost}>Post</button>
//                 </div>

//                 {isImageModalOpen && (
//                     <div className="image-modal">
//                         <div className="image-modal-content">
//                             <div className="image-modal-header">
//                                 <button className="back-button" onClick={() => setImageModalOpen(false)}>
//                                     <FaArrowLeft /> Back
//                                 </button>
//                                 <button className="close-button" onClick={() => setImageModalOpen(false)}>
//                                     <FaTimes />
//                                 </button>
//                             </div>
//                             <div className="image-modal-body">
//                                 <input
//                                     type="file"
//                                     multiple
//                                     accept="image/*"
//                                     onChange={handleImageSelect}
//                                     className="image-input"
//                                 />
//                                 <p>Select from your computer</p>
//                                 <textarea
//                                     className="image-caption"
//                                     placeholder="Write something as a caption..."
//                                     value={imageCaption}
//                                     onChange={(e) => setImageCaption(e.target.value)}
//                                 />
//                                 <input
//                                     type="text"
//                                     className="image-bio"
//                                     placeholder="Bio for the image..."
//                                     value={imageBio}
//                                     onChange={(e) => setImageBio(e.target.value)}
//                                 />
//                                 <input
//                                     type="text"
//                                     className="location-input"
//                                     placeholder="Add location..."
//                                     value={location}
//                                     onChange={(e) => setLocation(e.target.value)}
//                                 />
//                                 <input
//                                     type="text"
//                                     className="tags-input"
//                                     placeholder="Add tags..."
//                                     value={tags}
//                                     onChange={(e) => setTags(e.target.value)}
//                                 />
//                                 <div className="comments-toggle">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             checked={commentsOff}
//                                             onChange={toggleComments}
//                                         />
//                                         Comments {commentsOff ? 'Off' : 'On'}
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="image-modal-actions">
//                                 <button className="cancel-button" onClick={() => setImageModalOpen(false)}>Cancel</button>
//                                 <button className="post-button" onClick={handlePost}>Post</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Upost;

import { IoTrashOutline } from "react-icons/io5";








import React, { useState, useEffect } from 'react';
import { FaImage, FaPoll, FaQuestionCircle } from 'react-icons/fa';
import '../Static/Css/Upost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import logo from "../Images/mylogo.svg.png"
import { IoIosSearch } from "react-icons/io";

const Upost = () => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [imageCaption, setImageCaption] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');
    const [commentsOff, setCommentsOff] = useState(false);
    const [isImageSectionOpen, setImageSectionOpen] = useState(false);
    const [isPollSectionOpen, setPollSectionOpen] = useState(false);
    const [isImgPollSectionOpen, setImgPollSectionOpen] = useState(false);


    const navigate = useNavigate('');

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

    const handlePost = () => {
        // Post submission logic
        alert('Post submitted!');
    };

    const handleImageSelect = (e) => {
        setSelectedImages([...e.target.files]);
    };


    const toggleComments = () => {
        setCommentsOff(!commentsOff);
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

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (index, e) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };



    const [postImage, setPostImage] = useState(null);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Retrieve username from local storage when component mounts
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPostImage(file);
        // Create image preview URL
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create form data object
        const formData = new FormData();
        formData.append('username', username); // Add username to form data
        formData.append('post_image', postImage);
        formData.append('post_title', postTitle);
        formData.append('post_description', postDescription);
        formData.append('post_location', postLocation);
        try {
            await axios.post('http://localhost:9889/update-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/Profile')
            // Clear form fields after successful submission
            setPostImage(null);
            setPostTitle('');
            setPostDescription('');
            setPostLocation('');
            setImagePreview(null); // Clear image preview
        } catch (error) {
            console.error('Error uploading post:', error);
            alert('Failed to upload post. Please try again.');
        }

    };




    return (
        <div className='post-body'>
            {/* <section className='home-body-nav-post'>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <div className='home-body-dp'>
                            <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} onClick={(e) => navigate('/Profile')} />
                        </div>
                    </div>
                    <div className='home-body-nav-1-2'>
                        {'@' + username}
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
            </section> */}
            <div className="post-body-inner-main">
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

                </div>
                <div className='post-body-inner'>

                    <div className="post-upload">
                        <div className="post-header">

                            <img src={profileImage} alt="" className="user-avatar" onClick={(e) => navigate('/Profile')} />
                            <div className="user-info">
                                <span className="username"> {'@' + username}</span>

                            </div>
                        </div>

                        <div className='post-input'>
                            <h2>Let people know about you</h2>
                        </div>
                        <div className="post-options">
                            <button className="option-button" onClick={() => setImageSectionOpen(!isImageSectionOpen)}>
                                <FaImage /> Image
                            </button>
                            <button className="option-button" onClick={() => setImgPollSectionOpen(!isImgPollSectionOpen)} >
                                <FaPoll /> Image poll
                            </button>
                            <button className="option-button" onClick={() => setPollSectionOpen(!isPollSectionOpen)}>
                                <FaPoll /> Text poll
                            </button>

                        </div>

                        {isImageSectionOpen && (
                            <form className="image-upload-section" onSubmit={handleSubmit}>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="image-input"
                                    id="postImage"
                                />
                                <label for="postImage" className="upload-button">Upload Image</label>
                                <div className="image-upload-section-prive">
                                    {imagePreview && <img src={imagePreview} alt="Post Preview" style={{ width: "60%", height: "60%" }} />}
                                </div>
                                <textarea
                                    className="image-caption"
                                    placeholder="Write something as a caption..."
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)} fullWidth
                                    id="outlined-basic"
                                    type='text'
                                />

                                <input
                                    type="text"
                                    className="location-input"
                                    placeholder="Add location..."
                                    id="outlined-basic"

                                    value={postLocation}
                                    onChange={(e) => setPostLocation(e.target.value)} multiline fullWidth
                                />


                                <textarea
                                    type="text"
                                    className="image-caption"
                                    placeholder="Add tags..."
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                                <div className="comments-toggle">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={commentsOff}
                                            onChange={toggleComments}
                                        />
                                        Comments {commentsOff ? 'Off' : 'On'}
                                    </label>
                                </div>
                                <div className="post-actions">
                                    <button className="cancel-button" onClick={(e) => navigate('/Home')}>Cancel</button>
                                    <button className="post-button" type="submit" onClick={handlePost}>Post</button>
                                </div>
                            </form>
                        )}
                        {isPollSectionOpen && (
                            <div className="image-upload-section">
                                <div className="poll-container">
                                    <input
                                        type="text"
                                        placeholder="Enter your question"
                                        value={question}
                                        onChange={handleQuestionChange}
                                        className="question-input"
                                    />
                                    <div className="options-container">
                                        {options.map((option, index) => (
                                            <div key={index} className="option">
                                                <input
                                                    type="text"
                                                    placeholder={`Option ${index + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e)}
                                                    className="option-input"
                                                />
                                                <button className="remove-button" onClick={() => removeOption(index)}><IoTrashOutline /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="add-button" onClick={addOption}>Add Option</button>
                                </div>
                            </div>
                        )}


                        {isImgPollSectionOpen && (
                            <div className="image-upload-section">
                                <div className="poll-container">
                                    <input
                                        type="text"
                                        placeholder="Enter your question"
                                        value={question}
                                        onChange={handleQuestionChange}
                                        className="question-input"
                                    />
                                    <div className="options-container">
                                        {options.map((option, index) => (
                                            <div key={index} className="option">
                                                <input
                                                    type="text"
                                                    placeholder="Image URL"
                                                    value={option.imageUrl}
                                                    onChange={(e) => handleOptionChange(index, 'imageUrl', e.target.value)}
                                                    className="image-url-input"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Option text"
                                                    value={option.text}
                                                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                                    className="option-text-input"
                                                />
                                                <button className="remove-button" onClick={() => removeOption(index)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="add-button" onClick={addOption}>Add Option</button>
                                </div>
                            </div>
                        )}



                    </div>
                </div>
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

        </div >


    );
};

export default Upost;

