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

const Uvideo = () => {

  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);
  const [commentsOff, setCommentsOff] = useState(false);
  const [isImageSectionOpen, setImageSectionOpen] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoLocation, setVideoLocation] = useState('');
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoTags, setVideoTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailpreview, setThumbnailpreview] = useState('')



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
    // Retrieve username from local storage when component mounts
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!videoTags.includes(tagInput.trim())) {
        setVideoTags([...videoTags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = videoTags.filter(tag => tag !== tagToRemove);
    setVideoTags(updatedTags);
  };

  useEffect(() => {
    // Retrieve username from local storage when component mounts
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleVideoUpload = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('video_file', videoFile);
    formData.append('video_title', videoTitle);
    formData.append('video_description', videoDescription);
    formData.append('video_location', videoLocation);
    formData.append('video_tags', videoTags.join(','));
    formData.append('thumbnail', thumbnail); // Ensure 'thumbnail' is appended correctly

    try {
      const response = await axios.post('http://localhost:9889/update-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Video uploaded successfully:', response.data);
      alert('video uploaded successfully')
      navigate('/profile')
      // Clear form fields after successful upload
      setVideoFile(null);
      setVideoTitle('');
      setVideoDescription('');
      setVideoLocation('');
      setVideoTags([]);
      setTagInput('');
      setVideoPreview(null);
      setThumbnailpreview(null);
      setThumbnail(null); // Clear thumbnail file
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    }
  };


  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    // Create video preview URL
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    setThumbnailpreview(URL.createObjectURL(file))
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
              <h2>Let people see your video</h2>
            </div>
            <div className="post-options">
              <button className="option-button" onClick={() => setImageSectionOpen(!isImageSectionOpen)}>
                uplode Video
              </button>


            </div>

            {isImageSectionOpen && (
              <div className="image-upload-section"  >

                <input
                  type="file"
                  id="reelVideo"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                />
                <label htmlFor="reelVideo" className="upload-button">Upload video</label>

                <div className="image-upload-section-prive">
                  {videoPreview && (
                    <video controls className=".image-upload-section-prive video">
                      <source src={videoPreview} type="video/mp4" />

                    </video>
                  )}
                </div>

                <input
                  type="file"
                  id="thumb"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                />
                <label htmlFor="thumb" className="upload-button">Upload Thumbnail</label>

                <div className="image-upload-section-prive">
                  {thumbnailpreview && (<img src={thumbnailpreview} style={{ height: "90%", width: "70%" }} />)}
                </div>


                {/* <input
                  type="file"
                  onChange={handleThumbnailFileChange}
                  accept="image/*"
                  placeholder="upload thumbnail"
                  
                />
                <div className="image-upload-section-prive">
                {thumbnailpreview && (<img src={thumbnailpreview} style={{ height: 100, width: 100 }} />)}
                </div> */}
                <textarea
                  className="image-caption"
                  placeholder="Write something as a caption..."
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  id="videoTitle"
                  type='text'
                />
                <textarea
                  className="image-caption"
                  placeholder="Write something as a discription"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  id="videodescription"
                  type='text'
                />


                <input
                  type="text"
                  className="location-input"
                  placeholder="Add location..."
                  id="videoLocation"
                  value={videoLocation}
                  onChange={(e) => setVideoLocation(e.target.value)}

                />
                <input
                  type="text"
                  className="location-input"
                  placeholder="Add tags"
                  id="videotags"
                  value={tagInput}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}


                />

                <div>
                  {videoTags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button type="button" onClick={() => handleTagRemove(tag)}>x</button>
                    </span>
                  ))}
                </div>



                <div className="comments-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={commentsOff}

                    />
                    Comments {commentsOff ? 'Off' : 'On'}
                  </label>
                </div>
                <div className="post-actions">
                  <button className="cancel-button" onClick={(e) => navigate('/Home')}>Cancel</button>
                  <button className="post-button" type="submit" onClick={handleVideoUpload} >Post</button>
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

export default Uvideo;


