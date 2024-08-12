// import React, { useState } from 'react'
// import "../Static/Css/Video.css"
// import { useNavigate } from 'react-router-dom';
// import { MdAddBox } from "react-icons/md";
// import { IoIosSearch } from "react-icons/io";
// import { FaMicrophone } from "react-icons/fa";
// import { LuBellRing } from "react-icons/lu";
// import logo from "../Images/mylogo.svg.png"
// import { HiMiniPhoto } from "react-icons/hi2";
// import { PiFilmReelLight } from "react-icons/pi";
// import { GoVideo } from "react-icons/go";
// import { MdLiveTv } from "react-icons/md";
// import { Button } from '@mui/material';
// import { FaRegHeart } from "react-icons/fa6";
// import { FiSend } from "react-icons/fi";
// import { FaRegBookmark } from "react-icons/fa";
// import { FaArrowDown } from "react-icons/fa";
// import { IoIosMore } from "react-icons/io";
// import axios from 'axios';
// import { useEffect } from 'react'
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { useRef } from 'react';

// const Video = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);
//     const [isModalPostOpen, setIsModalPostOpen] = useState(false);
//     const [username, setUsername] = useState('');
//     const [usernames, setUsernames] = useState([]);
//     const [video, setVideo] = useState(null);
//     const [otherVideos, setOtherVideos] = useState([]);
//     const { videoId } = useParams();
//     const containerRef = useRef(null);

//     const [profileImage, setProfileImage] = useState('');
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
//     useEffect(() => {
//         fetchUsernames();
//         fetchUsername();
//     }, []);
//     const fetchUsernames = async () => {
//         try {
//             const response = await axios.get('http://localhost:9889/get-all-usernames');
//             const users = response.data.user_profiles;
//             // Fetch names for each user
//             const updatedUsers = await Promise.all(users.map(async (user) => {
//                 try {
//                     const nameResponse = await axios.get(`http://localhost:9889/profile/name/${user.username}`);
//                     const name = nameResponse.data.name;
//                     return { ...user, name };
//                 } catch (error) {
//                     console.error(`Error fetching name for ${user.username}:`, error);
//                     return { ...user, name: null }; // Handle error appropriately in your application
//                 }
//             }));
//             setUsernames(updatedUsers);
//             // Optionally, update the follow state here as well
//         } catch (error) {
//             console.error('Error fetching usernames:', error);
//         }
//     };
//     const fetchUsername = () => {
//         const storedUsername = localStorage.getItem('username');
//         if (storedUsername) {
//             setUsername(storedUsername);
//         } else {
//             console.error('Username not found in localStorage');
//         }
//     };
//     const handleModalOpen = () => {
//         setIsModalOpen(true);
//     };
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//     };

//     const handleModalVoiceOpen = () => {
//         setIsModalVoiceOpen(true);
//     };

//     const handleModalVoiceClose = () => {
//         setIsModalVoiceOpen(false);
//     };
//     const handleModalPostOpen = () => {
//         setIsModalPostOpen(true);
//     };

//     const handleModalPostClose = () => {
//         setIsModalPostOpen(false);
//     };
//     const navigate = useNavigate('');


//     const [isExpanded, setIsExpanded] = useState(false);

//     const handleToggle = () => {
//         setIsExpanded(!isExpanded);
//     };


//     useEffect(() => {
//         const fetchVideo = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:9889/get-video/${videoId}`);
//                 const videoData = response.data.video;
//                 setVideo(videoData);
//                 // Scroll to top
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             } catch (error) {
//                 console.error('Error fetching video:', error);
//             }
//         };

//         const fetchOtherVideos = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:9889/get-video/${videoId}`);
//                 const username = response.data.video.username;
//                 const otherVideosResponse = await axios.get(`http://localhost:9889/get-videos-by-username?username=${username}`);
//                 const filteredVideos = otherVideosResponse.data.videos.filter(v => v.id !== parseInt(videoId));
//                 setOtherVideos(filteredVideos);

//                 fetchProfileImages(filteredVideos);
//             } catch (error) {
//                 console.error('Error fetching other videos:', error);
//             }
//         };

//         fetchVideo();
//         fetchOtherVideos();
//         fetchProfileImages();
//     }, [videoId]);

//     const fetchProfileImages = async (videos = []) => {
//         if (!videos.length) return;  // Ensure videos is not empty

//         const usernames = [...new Set(videos.map(video => video.username))];
//         const profileImageRequests = usernames.map(username =>
//             axios.get(`http://localhost:9889/profile/image/${username}`, { responseType: 'blob' })
//                 .then(response => {
//                     const url = URL.createObjectURL(response.data);
//                     setProfileImages(prevState => ({ ...prevState, [username]: url }));
//                 })
//                 .catch(() => {
//                     // Handle error or set default profile image if needed
//                     setProfileImages(prevState => ({ ...prevState, [username]: null }));
//                 })
//         );
//         await Promise.all(profileImageRequests);
//     };



//     const [profileImages, setProfileImages] = useState({});

//     return (
//         <section className='Video-body'>
//             <div className='home-body-body-headder'>
//                 <div className='home-body-body-headder-1'>
//                     <img src={logo} alt="" className='home-body-body-headder-1-logo' />
//                 </div>
//                 <div className='home-body-body-headder-2'>
//                     <input type="text" className='home-body-body-headder-2-searchbar' placeholder='Search...' />
//                 </div>
//                 <div className='home-body-body-headder-3'>
//                     <IoIosSearch />
//                 </div>
//                 <div className='home-body-body-headder-3' onClick={handleModalVoiceOpen}>
//                     <FaMicrophone />
//                 </div>
//                 <div className='home-body-body-headder-3' onClick={handleModalOpen}>
//                     <LuBellRing />
//                 </div>
//                 <div className='home-body-body-headder-3'>
//                     <MdAddBox onClick={handleModalPostOpen} />
//                 </div>
//             </div>
//             <section className='video-body-sec-2'>

//                 <div className='video-body-sec-2-inner'>
//                     <div className='video-body-sec-2-inner-1'>
//                         <div className='video-body-sec-2-inner-1-video'>
//                             <div className='video-body-sec-2-inner-1-video-inner' ref={containerRef}>
//                                 {video ? (
//                                     <div key={video.id} className='content-item-link'>
//                                         <div
//                                             className='content-item-video-profile'
//                                             style={{ height: "100%", width: "100%", backgroundColor: "black" }}
//                                         >

//                                             {/* <div className="date">{new Date(video.video_creation_datetime).toLocaleString()}</div> */}
//                                             <video controls className='video-in-profile' style={{ height: "100%", width: "100%" }}>
//                                                 <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" />
//                                             </video>

//                                         </div>
//                                     </div>) : (<p>Loadingg....</p>)}
//                             </div>

//                         </div>{video ? (
//                             <div className='video-body-sec-2-inner-1-title'>
//                                 <div className='video-body-sec-2-inner-1-title-inner'>
//                                     {video.video_title}
//                                 </div>
//                             </div>) : (<p>Loadingg....</p>)}
//                         <div className='video-body-sec-2-inner-1-details'>
//                             <div className='video-body-sec-2-inner-1-details-phone'>


//                                 <div className='video-body-sec-2-inner-1-details-1'>
//                                     <div className='video-body-sec-2-inner-1-details-1-dp'>
//                                         {/* <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} onClick={(e) => navigate('/Profile')} /> */}
//                                         {profileImages[video.username] ? (
//                                             <img src={profileImages[video.username]} alt="Profile" style={{ height: 40, width: 40, borderRadius: '50%', marginRight: 10 }} />
//                                         ) : (
//                                             <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className='video-body-sec-2-inner-1-details-2'>
//                                     <div className='video-body-sec-2-inner-1-details-2-1'>
//                                         {video.username}
//                                     </div>
//                                     <div className='video-body-sec-2-inner-1-details-2-2'>
//                                         40k
//                                     </div>
//                                 </div>
//                                 <div className='video-body-sec-2-inner-1-details-25'>
//                                     <Button variant="contained" style={{ borderRadius: "50px" }}>Follow</Button>
//                                 </div>
//                                 <div className='video-body-sec-2-inner-1-details-3'>

//                                 </div>
//                             </div>
//                             <div className='video-body-sec-2-inner-1-details-phone2'>


//                                 <div className='video-body-sec-2-inner-1-details-4'>
//                                     <FaRegHeart /><p style={{ fontSize: "small" }}>1332</p><FiSend /><p style={{ fontSize: "small" }}>654</p><FaRegBookmark /><p style={{ fontSize: "small" }}>162</p><FaArrowDown /><p style={{ fontSize: "small" }}>102</p><IoIosMore />

//                                 </div>
//                             </div>
//                         </div>

//                         {video ? (
//                             <div className='video-body-sec-2-inner-1-bio'>
//                                 <div className='video-body-sec-2-inner-1-bio-1'>
//                                     <div className={`content ${isExpanded ? 'expanded' : ''}`}>
//                                         <p>This is some content that will be initially visible.</p>
//                                         <p className="hidden">{video.video_description}</p>
//                                     </div>
//                                     <button onClick={handleToggle} className='video-body-sec-2-inner-1-bio-1-more'>
//                                         {isExpanded ? 'Less' : 'More'}
//                                     </button>
//                                 </div>
//                             </div>) : (<p>Loadingg....</p>)}
//                         <div className='video-body-sec-2-inner-1-comments'>
//                             <div className='video-body-sec-2-inner-1-commentsinner'>
//                                 <div className='video-body-sec-2-inner-1-commentsinner-comments'>
//                                     <div className='video-body-sec-2-inner-1-commentsinner-comments-1'>
//                                         <div className='video-body-sec-2-inner-1-commentsinner-comments-1-dp'>
//                                             <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} onClick={(e) => navigate('/Profile')} />
//                                         </div>
//                                     </div>
//                                     <div className='video-body-sec-2-inner-1-commentsinner-comments-2'>
//                                         <div className='video-body-sec-2-inner-1-commentsinner-comments-2-inner'>
//                                             <input type="text" className='video-body-sec-2-inner-1-commentsinner-comments-2-input' placeholder='Comment' />
//                                         </div>
//                                         <div className='video-body-sec-2-inner-1-commentsinner-comments-3'>
//                                             <Button >Comment</Button>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='video-body-sec-2-inner-2'>
//                         <div className='video-body-sec-2-inner-2-inner'>
//                             <div className='video-body-sec-2-inner-2-inner-1'>
//                                 <div className='video-body-sec-2-inner-2-inner-1-1'>
//                                     Related videos of  {username}
//                                 </div>
//                                 <div className='video-body-sec-2-inner-2-inner-1-2'>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {isModalOpen && (
//                 <div className='modal' onClick={handleModalClose}>
//                     <div className='modal-content' >
//                         <span className='close-button' onClick={handleModalClose}>&times;</span>
//                         <div className='modal-content-1'>
//                             Notifications
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {isModalVoiceOpen && (
//                 <div className='modal' onClick={handleModalVoiceClose}>
//                     <div className='modal-content-voice' >
//                         <span className='close-button' onClick={handleModalVoiceClose}>&times;</span>
//                         <div className='modal-content-1'>

//                         </div>
//                     </div>
//                 </div>
//             )}
//             {isModalPostOpen && (
//                 <div className='modal-post' onClick={handleModalPostClose}>
//                     <div className='modal-content-post' >
//                         <div className='modal-content-post-1'>
//                             <div className='modal-content-post-1-1'>
//                                 <div className='modal-content-post-1-1-1'>
//                                     <div className='modal-content-post-1-1-1-1 ' onClick={(e) => navigate('/Upost')}>
//                                         <p>Post</p> &nbsp;  <HiMiniPhoto style={{ marginTop: "4%" }} />
//                                     </div>
//                                 </div>
//                                 <div className='modal-content-post-1-1-1'>
//                                     <div className='modal-content-post-1-1-1-1' onClick={(e) => navigate('/Ureels')}>
//                                         <p>Reel</p> &nbsp;  <PiFilmReelLight style={{ marginTop: "4%" }} />
//                                     </div>
//                                 </div>
//                                 <div className='modal-content-post-1-1-1'>
//                                     <div className='modal-content-post-1-1-1-1' onClick={(e) => navigate('/Uvideo')}>
//                                         <p>Video</p> &nbsp;  <GoVideo style={{ marginTop: "4%" }} />
//                                     </div>
//                                 </div>
//                                 <div className='modal-content-post-1-1-1'>
//                                     <div className='modal-content-post-1-1-1-1' onClick={(e) => navigate('/Ulive')}>
//                                         <p>Live</p> &nbsp;  <MdLiveTv style={{ marginTop: "2%" }} />
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             )}
//         </section>

//     )
// }

// export default Video


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import "../Static/Css/Videopro.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "../Images/mylogo.svg.png"
import { FaMicrophone } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdOutlineMoreVert } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

function Video() {
    const [video, setVideo] = useState(null);
    const [otherVideos, setOtherVideos] = useState([]);
    const { videoId } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [likes, setLikes] = useState("")
    const username = localStorage.getItem('username ')
    const [showOptions, setShowOptions] = useState({});
    const [usernames, setUsernames] = useState([]);
    const [following, setFollowing] = useState({});
    const [profileImage, setProfileImage] = useState('');

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
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
    const [allvideos, setallVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-videos');
                const videosData = response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 }));
                setallVideos(videosData);

            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);
    const [allreels, setallReels] = useState([]);
    useEffect(() => {
        const fetchReels = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-reels');
                const reelsData = response.data.reels.map(reel => ({ ...reel, isLiked: false, likes: reel.likes || 0 }));
                setallReels(reelsData);
                fetchProfileImages(reelsData);
            } catch (error) {
                console.error('Error fetching reels:', error);
            }
        };

        fetchReels();
    }, []);

    const [allposts, setallPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-posts');
                setallPosts(response.data.posts.map(post => ({ ...post, isLiked: false, likes: post.likes || 0 })));
                fetchProfileImages(response.data.posts)
                // Initialize isLiked state for each post
                // checkLikedState(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);




    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-video/${videoId}`);
                const videoData = response.data.video;
                setVideo(videoData);
                checkLikedState(videoData.id);
                fetchComments(videoData.id);


                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };



        fetchVideo();

        fetchProfileImages()

    }, [videoId]);
    const checkFollowState = async (followedUsername) => {
        try {
            const response = await axios.post('http://localhost:9889/follow/check', {
                follower: localStorage.getItem('username'),
                followed: followedUsername
            });
            setFollowing(prevFollowing => ({ ...prevFollowing, [followedUsername]: response.data.isFollowing }));
        } catch (error) {
            console.error('Error fetching follow state:', error);
        }
    };

    const handleFollow = async (followedUsername) => {
        try {
            const isFollowing = !following[followedUsername];
            await axios.post('http://localhost:9889/follow', {
                follower: localStorage.getItem('username'),
                followed: followedUsername,
            });
            setFollowing(prevFollowing => ({ ...prevFollowing, [followedUsername]: isFollowing }));
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };



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

            updatedUsers.forEach(user => {
                checkFollowState(user.username)
            })

        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    };
    useEffect(() => {
        fetchUsernames();
    }, []);

    const fetchComments = async (content_id) => {
        try {
            const response = await fetch(`http://localhost:9889/comments/Video/${content_id}`);
            const data = await response.json();

            // Filter parent comments
            const parentComments = data.filter(comment => !comment.parent_id);

            // Filter replies
            const replies = data.filter(comment => comment.parent_id);

            // Map replies to their parent comments
            const commentsWithReplies = parentComments.map(parent => {
                return {
                    ...parent,
                    replies: replies.filter(reply => reply.parent_id === parent.id)
                };
            });

            // Fetch liked state for each comment and update state
            const updatedCommentsWithReplies = await Promise.all(
                commentsWithReplies.map(async (comment) => {
                    const isLiked = await checkCommentLikedState(comment.id);
                    const updatedReplies = await Promise.all(
                        comment.replies.map(async (reply) => {
                            const isReplyLiked = await checkCommentLikedState(reply.id);
                            return { ...reply, isLiked: isReplyLiked };
                        })
                    );
                    return { ...comment, isLiked, replies: updatedReplies };
                })
            );

            setComments(prevComments => ({
                ...prevComments,
                [`Video_${content_id}`]: updatedCommentsWithReplies
            }));

        } catch (error) {
            console.error('Error fetching post comments:', error);
        }
    };


    const addReply = async (content_id, commentText, parent_id) => {
        try {
            const response = await fetch('http://localhost:9889/comment/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content_type: 'Video',
                    content_id: content_id,
                    parent_id: parent_id,
                    posted_by: localStorage.getItem('username'),
                    comment: commentText,
                    commented_by: localStorage.getItem('username'),
                }),
            });
            const data = await response.json();
            fetchComments(content_id); // Refresh comments after adding reply
        } catch (error) {
            console.error('Error adding post reply:', error);
        }
    };

    const likeComment = async (commentId, content_id) => {
        const updatedComments = comments[`Video_${content_id}`].map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    isLiked: !comment.isLiked,
                    likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
                };
            } else if (comment.replies) {
                const updatedReplies = comment.replies.map(reply => {
                    if (reply.id === commentId) {
                        return {
                            ...reply,
                            isLiked: !reply.isLiked,
                            likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                        };
                    }
                    return reply;
                });

                return {
                    ...comment,
                    replies: updatedReplies
                };
            }
            return comment;
        });

        setComments({
            ...comments,
            [`Video_${content_id}`]: updatedComments
        });

        const data = {
            comment_id: commentId,
            liked_by: localStorage.getItem('username')
        };

        try {
            const response = await fetch('http://localhost:9889/like/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result.message);  // Optionally handle success message

            // Optionally, fetch comments again to ensure updated state
            fetchComments(content_id);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteComment = async (comment_id, content_id) => {
        try {
            const response = await fetch(`http://localhost:9889/comment/${comment_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem('username'),
                    content_id: content_id,
                    content_type: 'Video',
                }),
            });
            fetchComments(content_id); // Fetch comments again to update the list
        } catch (error) {
            console.error('Error deleting post comment:', error);
        }
    };

    const checkCommentLikedState = async (commentId) => {
        try {
            const response = await fetch('http://localhost:9889/like/comment/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_id: commentId,
                    liked_by: localStorage.getItem('username'),
                }),
            });
            const data = await response.json();
            return data.isLiked; // Return the like status
        } catch (error) {
            console.error('Error fetching post comment liked state:', error);
            return false; // Handle error appropriately
        }
    };

    const addComment = async (content_id, commentText) => {
        try {
            await axios.post('http://localhost:9889/comment', {
                content_type: 'Video',
                content_id: content_id,
                posted_by: localStorage.getItem('username'),
                comment: commentText,
                commented_by: localStorage.getItem('username'),
            });
            fetchComments(content_id);
        } catch (error) {
            console.error('Error adding post comment:', error);
        }
    };
    const handleShowComments = (content_id) => {
        setShowComments(prevShowComments => ({
            ...prevShowComments,
            [`Video_${content_id}`]: !prevShowComments[`Video_${content_id}`]
        }));
        if (!showComments[`Video_${content_id}`]) {
            fetchComments(content_id);
        }
    };

    const handleCommentKeyDown = (e, content_id, postedBy, parent_id = null) => {
        if (e.key === 'Enter') {
            const commentText = e.target.value.trim();
            if (commentText !== '') {
                if (parent_id) {
                    addReply(content_id, commentText, parent_id, postedBy);
                } else {
                    addComment(content_id, commentText, postedBy);
                }
                e.target.value = '';
            }
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prevShowReplyInput => ({
            ...prevShowReplyInput,
            [`reply_${commentId}`]: !prevShowReplyInput[`reply_${commentId}`] // Toggle the visibility
        }));
    };

    const checkLikedState = async (content_id) => {
        try {
            const response = await axios.post('http://localhost:9889/like/check', {
                content_id: content_id,
                liked_by: localStorage.getItem('username'),
            });
            setLikes(prevLikes => ({ ...prevLikes, [content_id]: response.data.isLiked }));
        } catch (error) {
            console.error('Error fetching liked state:', error);
        }
    };

    const handleLike = (content_id, postedBy) => {
        setLikes(prevLikes => ({ ...prevLikes, [content_id]: !prevLikes[content_id] }));

        axios.post('http://localhost:9889/like', {
            content_type: 'Video',
            content_id: content_id,
            posted_by: postedBy,
            liked_by: localStorage.getItem('username'),
        })
            .then(response => {
                setVideo(prevVideo => ({
                    ...prevVideo,
                    likes: response.data.likes,
                }));
                setOtherVideos(prevOtherVideos => prevOtherVideos.map(item =>
                    item.id === content_id ? { ...item, likes: response.data.likes } : item
                ));
            })
            .catch(error => console.error('Error liking content:', error));
    };



    const handleShare = (VideoId) => {
        setShowShareModal(true);
        setCurrentVideoId(VideoId);
    };

    const closeModal = () => {
        setShowShareModal(false);
        setCurrentVideoId(null);
    };

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        if (currentVideoId !== null) {
            switch (platform) {
                case 'whatsapp':
                    window.open(`https://wa.me/?text=Check%20out%20this%20post:%20http://localhost:3000/content-details/${currentVideoId}/Video`);
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=http://localhost:3000/content-details/${currentVideoId}/Video`);
                    break;
                // Add cases for other platforms as needed
                default:
                    break;
            }
        }
        setShowShareModal(false);
    };
    useEffect(() => {
        const fetchUsersForShare = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-usernames');
                setUsers(response.data.user_profiles || []);
            } catch (error) {
                console.error('Error fetching users for sharing:', error);
            }
        };

        fetchUsersForShare();
    }, []);

    const handleUserSelect = (userId) => {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };


    const handleShareWithUsers = async () => {
        try {
            for (const userId of selectedUsers) {
                await axios.post('http://localhost:9889/share-content', {
                    chatroom_id: userId,  // Assuming user ID is used as chatroom ID for simplicity
                    sender_id: localStorage.getItem('username'),
                    receiver_id: userId,
                    content_id: currentVideoId,
                    content_type: 'Reel'
                });

            }
            setShowShareModal(false);
            setSelectedUsers([]);
            alert('Content shared successfully');
        } catch (error) {
            console.error('Error sharing content:', error);
            // Handle error state or display error message to user
        }
    };

    const toggleOptions = (content_id) => {
        setShowOptions(prevState => ({
            ...prevState,
            [content_id]: !prevState[content_id],
        }));
    };

    const handleDelete = async (content_id) => {
        try {
            await axios.delete(`http://localhost:9889/delete-video/${content_id}`);
            navigate('/videos');
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };



    const renderOptionsMenu = (content_id) => (
        <div className="options-menu" style={{ display: showOptions[content_id] ? 'block' : 'none' }}>
            <button onClick={() => handleDelete(content_id)}>Delete Video</button>
            <button>Edit Video</button>
            <button onClick={() => handleShare(content_id)}>Share Video</button>
        </div>
    );


    const fetchProfileImages = async (videos = []) => {
        if (!videos.length) return;  // Ensure videos is not empty

        const usernames = [...new Set(videos.map(video => video.username))];
        const profileImageRequests = usernames.map(username =>
            axios.get(`http://localhost:9889/profile/image/${username}`, { responseType: 'blob' })
                .then(response => {
                    const url = URL.createObjectURL(response.data);
                    setProfileImages(prevState => ({ ...prevState, [username]: url }));
                })
                .catch(() => {
                    // Handle error or set default profile image if needed
                    setProfileImages(prevState => ({ ...prevState, [username]: null }));
                })
        );
        await Promise.all(profileImageRequests);
    };



    const [profileImages, setProfileImages] = useState({});
    const renderVideoItem = (item) => (
        <div key={item.id} className='content-item-link-videoproo' >
            <div className='content-item-videoproo'>
                <div  >
                    <div className="content-details-videoproo"   >
                        <div className='content-details-videoproo-1'>
                            <video controls style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
                                <source src={`data:video/mp4;base64,${item.video}`} type="video/mp4" />
                            </video>
                        </div>

                        <div className='content-details-videoproo-2'>
                            {item.video_title}
                        </div>
                        <div className='content-details-videoproo-3'>
                            <div className="content-details-videoproo-3-1">
                                {profileImages[video.username] ? (
                                    <img src={profileImages[video.username]} alt="Profile" style={{ height: 50, width: 50, borderRadius: '50%', marginRight: 10 }} />
                                ) : (
                                    <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                )}
                            </div>
                            <div className="content-details-videoproo-3-2">
                                <div className="content-details-videoproo-3-2-1">{item.username}</div>
                                <div className="content-details-videoproo-3-2-2">100k Followers</div>
                            </div>
                            <div className="content-details-videoproo-3-3"></div>
                            <div className="content-details-videoproo-3-4" onClick={(e) => { e.preventDefault(); handleLike(item.id, item.username); }}>
                                {likes[item.id] ? <FaRegHeart /> : <FaHeart />} <span style={{ fontSize: "15px" }}>{item.likes}</span>
                            </div>
                            <div className="content-details-videoproo-3-4" onClick={(e) => { e.preventDefault(); handleShare(item.id); }}>
                                <FiSend />
                            </div>
                            <div className="content-details-videoproo-3-4">
                                <MdOutlineMoreVert />
                            </div>
                        </div>
                        <div className='content-details-videoproo-4'>
                            <div className="content-details-videoproo-4-1">
                                300k views &nbsp;{formatDistanceToNow(new Date(item.video_creation_datetime), { addSuffix: true })}
                            </div>
                            <div className="container">
                                <div
                                    className={`expandable ${isExpanded ? 'expanded' : ''}`}
                                    onClick={handleToggle}
                                >
                                    {isExpanded ? (
                                        <>
                                            <p>{item.video_description}</p>
                                            <span className="toggle-text">Show Less</span>
                                        </>
                                    ) : (
                                        <span className="toggle-text">Show More...</span>
                                    )}
                                </div>
                            </div>
                        </div>





                    </div>


                    {/* Comments */}
                    <div className='comment-button-videoproo' onClick={() => handleShowComments(item.id)}>
                        <i className='far fa-comment-videoproo'></i> <span>{item.commentsCount}</span>
                    </div>

                    {/* Options */}
                    <div className='options-button-videoproo' onClick={(e) => { e.preventDefault(); toggleOptions(item.id); }}>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                    {renderOptionsMenu(item.id)}
                    {/* Comment Input */}
                    {showShareModal && (
                        <div className="modal-videoproo">
                            <div className="modal-content-videoproo">
                                <span className="close-videoproo" onClick={closeModal}>&times;</span>
                                <h2>Select users and platform to share</h2>
                                <div className="user-selection-videoproo">
                                    <h3>Select Users</h3>
                                    {users.map(user => (
                                        <div key={user.username} className="user-item-videoproo">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.username)}
                                                    onChange={() => handleUserSelect(user.username)}
                                                />
                                                {user.username}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="platform-options-videoproo">
                                    <h3>Select Platform</h3>
                                    <button onClick={() => handlePlatformSelect('whatsapp')}>WhatsApp</button>
                                    <button onClick={() => handlePlatformSelect('twitter')}>Twitter</button>
                                    {/* Add buttons for other platforms */}
                                </div>
                                <div className="share-actions-videoproo">
                                    <button onClick={handleShareWithUsers}>Share with Selected Users</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (

        <div className="bodyofvideo">
            <div className='bodyofvideo-1'>
                <div className="bodyofvideo-1-1">
                    <div className='bodyofvideo-1-1-1'>
                        <IoMdArrowRoundBack />
                    </div>
                    <div className='bodyofvideo-1-1-2'>
                        <img src={logo} alt="" style={{ height: "40px", width: "40px" }} />
                    </div>
                    <div className='bodyofvideo-1-1-3'>
                        <div className='bodyofvideo-1-1-3-inner'>
                            <div className="bodyofvideo-1-1-3-inner-1">
                                <input type="text" placeholder='Search...' className='bodyofvideo-1-1-3-inner-1-1' />
                            </div>
                            <div className="bodyofvideo-1-1-3-inner-2">
                                <FaMicrophone />
                            </div>
                        </div>
                    </div>
                    <div className='bodyofvideo-1-1-1'>
                        <FaVideo />
                    </div>
                    <div className='bodyofvideo-1-1-1'>
                        <FaBell />
                    </div>
                    <div className='bodyofvideo-1-1-1'>
                        <div className='bodyofvideo-1-1-1-dp'>
                            <img src={profileImage} alt="" style={{height:"100%",width:"100%", borderRadius:"50px"}} onClick={(e) => navigate('/Profile')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bodyofvideo-2'>

                <div className="bodyofvideo-2-1">
                    <div className='bodyofvideo-2-1-inner' ref={containerRef}>

                        {video ? (
                            <div className="video-details">
                                {renderVideoItem(video)}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}


                    </div>
                </div>
                <div className="bodyofvideo-2-2">
                    

                    <div className='ubmain-profile-div-2-0'>
                        People you might know
                    </div>
                    <div className='submain-profile-div1-3'>

                        <div className='submain-profile-div1-3-1'>
                            <ul style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
                                {usernames
                                    .filter(user => user.username !== username)
                                    .map((user, index) => (
                                        <li key={index} >

                                            <div className='submain-profile-div1-3-1-1'>

                                                <div className='submain-profile-div1-3-1-1-1'>
                                                    <div className='submain-profile-div1-3-1-1-1-pic'>
                                                        <Link to={`/userprofile/${user.username}`}> <img src={`data:image/jpeg;base64,${user.profile_pic}`} alt='Profile Pic' style={{ height: "100%", width: "100%", borderRadius: "50px" }} /></Link>
                                                    </div>
                                                </div>
                                                <div className='submain-profile-div1-3-1-1-2'>
                                                    {user.username}
                                                </div>
                                                <div className='submain-profile-div1-3-1-1-2'>
                                                    <button onClick={() => handleFollow(user.username)} className='submain-profile-div1-3-1-1-2-btn'>{following[user.username] ? 'Following' : 'Follow'}</button>
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                    </div>



                    <div className='ubmain-profile-div-2-0'>
                        Reels
                    </div>



                    <div className='reels-container'>
                        <div className='reels-wrapper'>
                            {allreels.map(reel => (
                                <div
                                    key={reel.id}
                                    className='reel-item'
                                    onClick={() => navigate(`/content-details/${reel.id}/Reel`)}
                                >
                                    <video
                                        className='reel-video'
                                    >
                                        <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />
                                    </video>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div className='ubmain-profile-div-2-0'>
                        Post
                    </div>

                    <div className='submain-profile-div1-5-post'>
                        <div className='submain-profile-div1-5-post-1'>
                            {allposts.map(post => (
                                <div className='submain-profile-div1-5-post-1-1' key={post.id}>
                                    <div className='submain-profile-div1-5-post-1-1-1' onClick={() => navigate(`/content-details/${post.id}/Post`)}>
                                        <img src={`data:image/jpeg;base64,${post.post_image}`} alt="Post" className='post-image' />
                                    </div>
                                    <div className='submain-profile-div1-5-post-1-1-2'>
                                        <div className='submain-profile-div1-5-post-1-1-2-1'>
                                            <div className='submain-profile-div1-5-post-1-1-2-1-1'>
                                                {profileImages[post.username] ? (
                                                    <img src={profileImages[post.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: "50px" }} />
                                                ) : (
                                                    <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='submain-profile-div1-5-post-1-1-2-2'>
                                            {post.username}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='ubmain-profile-div-2-0'>
                        Videos
                    </div>

                    <div className='submain-profile-div1-4'>

                        <div className='submain-profile-div1-4-1'>
                            {allvideos.map(video => (
                                <div className='submain-profile-div1-4-1-1'>

                                    <div key={video.id} className='submain-profile-div1-4-1-1-1'>
                                        {video.thumbnail ? (
                                            <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" style={{ height: "100%", width: "100%", borderRadius: "5px" }} />
                                        ) : (
                                            <video controls>
                                                <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" style={{ height: "100%", width: "100%" }} />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                    <div className='submain-profile-div1-4-1-1-2'>
                                        <div className='submain-profile-div1-4-1-1-2-1'>
                                            {video.video_title}
                                        </div>
                                        <div className='submain-profile-div1-4-1-1-2-2'>
                                            3 days ago 4k views
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>

        // <div ref={containerRef}>
        //     {video ? (
        //         <div className="video-details">
        //             {renderVideoItem(video)}
        //         </div>
        //     ) : (
        //         <p>Loading...</p>
        //     )}

        //     <div>
        //         <h3>Other Videos</h3>
        //         <div className="other-videos">
        //             {otherVideos.map(otherVideo => renderVideoItem(otherVideo))}
        //         </div>
        //     </div>
        // </div>
    );
}

export default Video;