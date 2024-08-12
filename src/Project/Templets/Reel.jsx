import React from 'react'
import "../Static/Css/Reel.css"
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { HiMiniPhoto } from "react-icons/hi2";
import { PiFilmReelLight } from "react-icons/pi";
import { GoVideo } from "react-icons/go";
import { MdLiveTv } from "react-icons/md";
import logo from "../Images/mylogo.svg.png"
import { useState, useRef } from "react"
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { CiFaceSmile } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { formatDistanceToNow } from 'date-fns';


const Reel = () => {
    const navigate = useNavigate('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);
    const [isModalPostOpen, setIsModalPostOpen] = useState(false);
    const [reel, setReel] = useState(null);
    const [otherReels, setOtherReels] = useState([]);
    const { reelId } = useParams();
    const containerRef = useRef(null);
    const [profileImage, setProfileImage] = useState('');
    const [isModalcommentOpen, setIsModalcommentOpen] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [currentReelId, setCurrentReelId] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [likes, setLikes] = useState("")
    const username = localStorage.getItem('username ')
    const [showOptions, setShowOptions] = useState({});
    const [profileImages, setProfileImages] = useState({});

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
    const handleModalPostOpen = () => {
        setIsModalPostOpen(true);
    };

    const handleModalPostClose = () => {
        setIsModalPostOpen(false);
    };

    const handleModalcommentOpen = () => {
        setIsModalcommentOpen(true);
    };
    const handleModalcommentClose = () => {
        setIsModalcommentOpen(false);
    };

    useEffect(() => {
        const fetchReel = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-reel/${reelId}`);
                const reelData = response.data.reel;
                setReel(reelData);

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Error fetching reel:', error);
            }
        };

        const fetchOtherReels = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-reel/${reelId}`);
                const username = response.data.reel.username;
                const otherReelsResponse = await axios.get(`http://localhost:9889/get-reels-by-username?username=${username}`);
                const filteredReels = otherReelsResponse.data.reels.filter(r => r.id !== parseInt(reelId));
                setOtherReels(filteredReels);
                filteredReels.forEach(item => {
                    checkLikedState(item.id);
                    fetchComments(item.id);
                    fetchProfileImages(filteredReels);
                });
            } catch (error) {
                console.error('Error fetching other reels:', error);
            }
        };

        fetchReel();
        fetchOtherReels();
    }, [reelId]);


    const fetchProfileImages = async (reels) => {
        const usernames = [...new Set(reels.map(reel => reel.username))];
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



    const [activeReelId, setActiveReelId] = useState(null);
    const videoRefs = useRef({});
    const handleReelIntersect = (entries) => {
        entries.forEach(entry => {
            const { id } = entry.target.dataset;
            if (entry.isIntersecting) {
                setActiveReelId(id);
                videoRefs.current[id].play();
            } else {
                videoRefs.current[id].pause();
            }
        });
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(handleReelIntersect, options);

        // Observe each video element
        Object.values(videoRefs.current).forEach(ref => observer.observe(ref));

        return () => observer.disconnect();
    }, [reel, otherReels]);


    const fetchComments = async (content_id) => {
        try {
            const response = await fetch(`http://localhost:9889/comments/Reel/${content_id}`);
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
                [`Reel_${content_id}`]: updatedCommentsWithReplies
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
                    content_type: 'Reel',
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
        const updatedComments = comments[`Reel_${content_id}`].map(comment => {
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
            [`Reel_${content_id}`]: updatedComments
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
                    content_type: 'Reel',
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
                content_type: 'Reel',
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
            [`Reel_${content_id}`]: !prevShowComments[`Reel_${content_id}`]
        }));
        if (!showComments[`Reel_${content_id}`]) {
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
            content_type: 'Reel',
            content_id: content_id,
            posted_by: postedBy,
            liked_by: localStorage.getItem('username'),
        })
            .then(response => {
                setReel(prevReel => ({
                    ...prevReel,
                    likes: response.data.likes,
                }));
                setOtherReels(prevOtherReels => prevOtherReels.map(item =>
                    item.id === content_id ? { ...item, likes: response.data.likes } : item
                ));
            })
            .catch(error => console.error('Error liking content:', error));
    };





    const toggleOptions = (content_id) => {
        setShowOptions(prevState => ({
            ...prevState,
            [content_id]: !prevState[content_id],
        }));
    };

    const handleDelete = async (content_id) => {
        try {
            await axios.delete(`http://localhost:9889/delete-reel/${content_id}`);
            navigate('/reels');
        } catch (error) {
            console.error('Error deleting reel:', error);
        }
    };
    const handleShare = (reelId) => {
        setShowShareModal(true);
        setCurrentReelId(reelId);
    };

    const closeModal = () => {
        setShowShareModal(false);
        setCurrentReelId(null);
    };

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        if (currentReelId !== null) {
            switch (platform) {
                case 'whatsapp':
                    window.open(`https://wa.me/?text=Check%20out%20this%20post:%20http://localhost:3000/content-details/${currentReelId}/Reel`);
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=http://localhost:3000/content-details/${currentReelId}/Reel`);
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
                    content_id: currentReelId,
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

    const renderOptionsMenu = (content_id) => (
        <div className="options-menu" style={{ display: showOptions[content_id] ? 'block' : 'none' }}>
            <button onClick={() => handleDelete(content_id)}>Delete Reel</button>
            <button>Edit Reel</button>
            <button onClick={() => handleShare(content_id)}>Share Reel</button>
        </div>
    );

    const renderReelItem = (item) => (
        <div key={item.id} className='content-item-link'>
            <div className='content-item'>
                <div className="content-details" >
                    <video
                        autoPlay
                        loop
                        className='reel-page-reel'
                        ref={ref => { videoRefs.current[item.id] = ref; }}
                        data-id={item.id}
                    >
                        <source src={`data:video/mp4;base64,${item.reel}`} type="video/mp4" />

                    </video>
                    <div className="date">{formatDistanceToNow(new Date(item.reel_creation_datetime), { addSuffix: true })}</div>

                    <div className='reel-page-details-div-likeandall'>
                        <div className='reel-div-main-i-2-1'>

                        </div>
                        <div className='reel-div-main-i-2-2'>
                            <FaRegHeart onClick={(e) => { e.preventDefault(); handleLike(item.id, item.username); }} /> <span>{item.likes}</span>

                        </div>
                        <div className='reel-div-main-i-2-2'>
                            <FaRegComment onClick={() => handleShowComments(item.id)} /> <span>{item.commentsCount}</span>

                        </div>
                        <div className='reel-div-main-i-2-2'>
                            <FiSend onClick={(e) => { e.preventDefault(); handleShare(item.id); }} />
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
                    <div className='reel-page-details-div'>



                        <div className='reel-page-details-div-profile'>
                            <div className='reel-page-details-div-profile-inner'>
                                {/* <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} onClick={(e) => navigate('/Profile')} /> */}
                                {profileImages[reel.username] ? (
                                    <img src={profileImages[reel.username]} alt="Profile" style={{ height: 40, width: 40, borderRadius: '50%', marginRight: 10 }} />
                                ) : (
                                    <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                )}
                            </div>
                        </div>

                        <div className='reel-page-details-div-username'>
                            <div className='reel-page-details-div-username-1'>
                                {'@' + item.username}
                            </div>
                            <div className='reel-page-details-div-username-2'>
                                {item.reel_title}
                            </div>
                        </div>


                    </div>



                </div>




                {/* Options */}
                <div className='options-button' onClick={(e) => { e.preventDefault(); toggleOptions(item.id); }}>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                {renderOptionsMenu(item.id)}


            </div>
            <div className='reel-page-details-div-icons'>
                <div className='reel-page-details-div-icons-inner'>
                    <div className='reel-div-main-i-2-1'>

                    </div>
                    <div className='reel-div-main-i-2-2'>
                        <FaRegHeart />
                    </div>
                    <div className='reel-div-main-i-2-2'>
                        <FaRegComment onClick={handleModalcommentOpen} />
                    </div>
                    <div className='reel-div-main-i-2-2'>
                        <FiSend onClick={(e) => { e.preventDefault(); handleShare(item.id); }} />
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

        </div>
    );

    return (
        <section className='reel-body'>


            <section className='reel-main-body'>
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
                        <MdAddBox onClick={handleModalPostOpen} />
                    </div>
                </div>
                <section className='reel-div-main'>

                    <div ref={containerRef}>
                        {reel ? (
                            <div className="reel-details">
                                {renderReelItem(reel)}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}

                        <div>
                            <h3>Other Reels</h3>
                            <div className="other-reels">
                                {otherReels.map(otherReel => renderReelItem(otherReel))}
                            </div>
                        </div>

                    </div>







                </section>
            </section>
            {isModalcommentOpen && (
                <div className='modal-comment-reel' >
                    <div className='modal-comment-reel-inner'>
                        <div className='modal-comment-reel-inner-1'>
                            Comments 0<IoClose onClick={handleModalcommentClose} />
                        </div>

                        {showComments[`Reel_${reel.id}`] &&
                            <div className="post-comments">
                                {comments[`Reel_${reel.id}`]?.map(comment => (
                                    <div key={comment.id} className="comment">

                                        <div className="comment-content">
                                            <span className="comment-username"><strong>{'@' + comment.commented_by}</strong></span>
                                            <p>{comment.comment}</p>
                                            <div className='comment-actions'>
                                                <i className={comment.isLiked ? 'fas fa-heart' : 'far fa-heart'} onClick={() => likeComment(comment.id, reel.id)}></i> <span>{comment.likes}</span>
                                                {comment.commented_by === localStorage.getItem('username') || reel.username === localStorage.getItem('username') ? (
                                                    <i className='fas fa-trash' onClick={() => deleteComment(comment.id, reel.id)}></i>
                                                ) : null}
                                                <i className='fas fa-reply' onClick={() => toggleReplyInput(comment.id)}></i>

                                            </div>
                                            {showReplyInput[`reply_${comment.id}`] &&
                                                <div className="reply-input">

                                                    {comment.replies.map(reply => (
                                                        <div key={reply.id} className="reply">

                                                            <div className="reply-content">
                                                                <span className="reply-username"><strong>{'@' + reply.commented_by}</strong></span>
                                                                <p>{reply.comment}</p>
                                                                <div className='reply-actions'>
                                                                    <i className={reply.isLiked ? 'fas fa-heart' : 'far fa-heart'} onClick={() => likeComment(reply.id, reel.id)}></i> <span>{reply.likes}</span>
                                                                    {reply.commented_by === localStorage.getItem('username') || reel.username === localStorage.getItem('username') ? (
                                                                        <i className='fas fa-trash' onClick={() => deleteComment(reply.id, reel.id)}></i>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <input type="text" placeholder="Write a reply..." onKeyDown={(e) => handleCommentKeyDown(e, reel.id, reel.username, comment.id)} />
                                                </div>
                                            }

                                        </div>
                                    </div>
                                ))}
                                <div className="comment-input">
                                    <input type="text" placeholder="Write a comment..." onKeyDown={(e) => handleCommentKeyDown(e, reel.id, reel.username)} />
                                </div>
                            </div>
                        }

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

            {showShareModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Select users and platform to share</h2>
                        <div className="user-selection">
                            <h3>Select Users</h3>
                            {users.map(user => (
                                <div key={user.username} className="user-item">
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
                        <div className="platform-options">
                            <h3>Select Platform</h3>
                            <button onClick={() => handlePlatformSelect('whatsapp')}>WhatsApp</button>
                            <button onClick={() => handlePlatformSelect('twitter')}>Twitter</button>
                            {/* Add buttons for other platforms */}
                        </div>
                        <div className="share-actions">
                            <button onClick={handleShareWithUsers}>Share with Selected Users</button>
                        </div>
                    </div>
                </div>
            )}

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
            {isModalPostOpen && (
                <div className='modal-post' onClick={handleModalPostClose}>
                    <div className='modal-content-post' >
                        <div className='modal-content-post-1'>
                            <div className='modal-content-post-1-1'>
                                <div className='modal-content-post-1-1-1'>
                                    <div className='modal-content-post-1-1-1-1 ' onClick={(e) => navigate('/Upost')}>
                                        <p>Post</p> &nbsp;  <HiMiniPhoto style={{ marginTop: "4%" }} />
                                    </div>
                                </div>
                                <div className='modal-content-post-1-1-1'>
                                    <div className='modal-content-post-1-1-1-1' onClick={(e) => navigate('/Ureels')}>
                                        <p>Reel</p> &nbsp;  <PiFilmReelLight style={{ marginTop: "4%" }} />
                                    </div>
                                </div>
                                <div className='modal-content-post-1-1-1'>
                                    <div className='modal-content-post-1-1-1-1' onClick={(e) => navigate('/Uvideo')}>
                                        <p>Video</p> &nbsp;  <GoVideo style={{ marginTop: "4%" }} />
                                    </div>
                                </div>
                                <div className='modal-content-post-1-1-1'>
                                    <div className='modal-content-post-1-1-1-1' onClick={(e) => navigate('/Ulive')}>
                                        <p>Live</p> &nbsp;  <MdLiveTv style={{ marginTop: "2%" }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Reel
