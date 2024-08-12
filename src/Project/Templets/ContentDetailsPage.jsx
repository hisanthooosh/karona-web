import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { FaRegBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { FaMicrophone } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoMdMore } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiFaceSmile } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { formatDistanceToNow } from 'date-fns'
const ContentDetailsPage = () => {

    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0);
    const [showOptions, setShowOptions] = useState({});
    const [following, setFollowing] = useState({});
    const [selectedComment, setSelectedComment] = useState(null);
    const [profileImages, setProfileImages] = useState({});
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [currentContentId, setCurrentContentId] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [users, setUsers] = useState([]);
    const currentUsername = localStorage.getItem('username');
    const { content_id, content_type } = useParams();
    const [selectedContent, setSelectedContent] = useState(null);
    const [relatedContent, setRelatedContent] = useState([]);
    const contentRefs = useRef([]);
    const observer = useRef(null);
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [isbioSectionOpen, setbioSectionOpen] = useState(false);
    const [iscommentSectionOpen, setcommentSectionOpen] = useState(false);
    const [isModalcommentOpen, setIsModalcommentOpen] = useState(false);

    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-videos');
                const videosData = response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 }));
                setVideos(videosData);
                fetchProfileImagesv(videosData);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchVideos();
    }, []);
    const [profileImagesv, setProfileImagesv] = useState({});
    const fetchProfileImagesv = async (videos) => {
        const usernames = [...new Set(videos.map(video => video.username))];
        const profileImageRequestsv = usernames.map(username =>
            axios.get(`http://localhost:9889/profile/image/${username}`, { responseType: 'blob' })
                .then(response => {
                    const url = URL.createObjectURL(response.data);
                    setProfileImagesv(prevState => ({ ...prevState, [username]: url }));
                })
                .catch(() => {
                    // Handle error or set default profile image if needed
                    setProfileImagesv(prevState => ({ ...prevState, [username]: null }));
                })
        );
        await Promise.all(profileImageRequestsv);
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
    const handleShare = (contentId) => {
        setShowShareModal(true);
        setCurrentContentId(contentId); // Set current content ID for sharing
    };
    const closeModal = () => {
        setShowShareModal(false);
        setCurrentContentId(null); // Reset current content ID when modal is closed
    };
    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        if (currentContentId !== null) {
            const contentType = content_type.charAt(0).toUpperCase() + content_type.slice(1); // Capitalize the first letter of type
            switch (platform) {
                case 'whatsapp':
                    window.open(`https://wa.me/?text=Check%20out%20this%20${contentType.toLowerCase()}: http://localhost:3000/content-details/${currentContentId}/${contentType}`);
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=http://localhost:3000/content-details/${currentContentId}/${contentType}`);
                    break;
                // Add cases for other platforms as needed
                default:
                    break;
            }
        }
        setShowShareModal(false); // Close modal after sharing
    };
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
                    sender_id: currentUsername,
                    receiver_id: userId,
                    content_id: currentContentId,
                    content_type: content_type
                });
                console.log(`Shared ${content_type} ${currentContentId} with user ${userId}`);
            }
            setShowShareModal(false);
            setSelectedUsers([]);
            alert('Content shared successfully');
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    };
    const handleModalcommentOpen = () => {
        setIsModalcommentOpen(true);
    };
    const handleModalcommentClose = () => {
        setIsModalcommentOpen(false);
    };
    const fetchProfileImages = async (posts) => {
        const usernames = [...new Set(posts.map(post => post.username))];
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
        if (selectedContent) {
            fetchProfileImages([selectedContent, ...relatedContent]);
        }
    }, [selectedContent, relatedContent]);
    const handleCommentClick = (commentId) => {
        setSelectedComment(commentId);
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                setCurrentPlayingIndex((prevIndex) => Math.min(prevIndex + 1, relatedContent.length));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [relatedContent]);

    useEffect(() => {
        if (contentRefs.current[currentPlayingIndex]) {
            contentRefs.current.forEach((ref, index) => {
                if (ref) {
                    observer.current.unobserve(ref);
                    if (index === currentPlayingIndex) {
                        observer.current.observe(ref);
                    }
                }
            });
        }
    }, [currentPlayingIndex, relatedContent]);

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

    useEffect(() => {
        const fetchSelectedContent = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-content/${content_id}/${content_type}`);
                const contentData = response.data;
                const likesResponse = await axios.post('http://localhost:9889/likes/status', {
                    content_ids: [content_id],
                    liked_by: localStorage.getItem('username')
                });
                const commentsResponse = await axios.get(`http://localhost:9889/comments/${content_type}/${content_id}`);

                setSelectedContent({
                    ...contentData,
                    isLiked: likesResponse.data[content_id].isLiked,
                    likes: likesResponse.data[content_id].likes,
                    commentsCount: commentsResponse.data.length
                });

                // Update likes state for the current content
                setLikes(prevLikes => ({ ...prevLikes, [content_id]: likesResponse.data[content_id].isLiked }));

                setComments(prevComments => ({
                    ...prevComments,
                    [`${content_type}_${content_id}`]: commentsResponse.data
                }));

                checkFollowState(contentData.username);
            } catch (error) {
                console.error('Error fetching selected content', error);
            }
        };

        const fetchRelatedContent = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-content-by-type/${content_type}?page=${page}`);
                const currentContentId = String(content_id);
                const filteredContent = response.data.content.filter(item => String(item.content_id) !== currentContentId);

                const relatedContentIds = filteredContent.map(item => item.content_id);
                const likesResponse = await axios.post('http://localhost:9889/likes/status', {
                    content_ids: relatedContentIds,
                    liked_by: localStorage.getItem('username')
                });

                const commentsResponses = await Promise.all(
                    relatedContentIds.map(id => axios.get(`http://localhost:9889/comments/${content_type}/${id}`))
                );

                const updatedRelatedContent = filteredContent.map((item, index) => ({
                    ...item,
                    isLiked: likesResponse.data[item.content_id].isLiked,
                    likes: likesResponse.data[item.content_id].likes,
                    commentsCount: commentsResponses[index].data.length
                }));

                setRelatedContent(prevContent => [...prevContent, ...updatedRelatedContent]);

                // Update likes state for related content
                filteredContent.forEach(item => {
                    setLikes(prevLikes => ({
                        ...prevLikes,
                        [item.content_id]: likesResponse.data[item.content_id].isLiked
                    }));
                    checkFollowState(item.username);
                });

            } catch (error) {
                console.error('Error fetching related content', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSelectedContent();
        fetchRelatedContent();
    }, [content_id, content_type, page]); // Ensure dependencies trigger useEffect properly


    const loadMoreContent = useCallback(() => {
        if (!loading) {
            setLoading(true);
            setPage(prevPage => prevPage + 1);
        }
    }, [loading]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight && !loading) {
                loadMoreContent();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreContent, loading]);

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Pause all other videos
                    contentRefs.current.forEach(ref => {
                        if (ref !== entry.target) {
                            ref.pause();
                        }
                    });
                    // Play the current video
                    entry.target.play();
                    // Set the current playing video
                    setCurrentPlaying(entry.target);
                }
            });
        }, { threshold: 0.75 });

        contentRefs.current.forEach(ref => {
            if (ref) observer.current.observe(ref);
        });

        return () => {
            contentRefs.current.forEach(ref => {
                if (ref) observer.current.unobserve(ref);
            });
        };
    }, [relatedContent]);

    const fetchComments = async (content_id, content_type) => {
        try {
            const response = await fetch(`http://localhost:9889/comments/${content_type}/${content_id}`);
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
                [`${content_type}_${content_id}`]: updatedCommentsWithReplies
            }));

        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const addReply = async (content_id, content_type, commentText, parent_id, postedBy) => {
        try {
            const response = await fetch('http://localhost:9889/comment/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content_type: content_type,
                    content_id: content_id,
                    parent_id: parent_id,
                    posted_by: postedBy,
                    comment: commentText,
                    commented_by: localStorage.getItem('username'),
                }),
            });
            const data = await response.json();
            fetchComments(content_id, content_type); // Refresh comments after adding reply
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    const likeComment = async (commentId, contentId, contentType) => {
        const updatedComments = comments[`${contentType}_${contentId}`].map(comment => {
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
            [`${contentType}_${contentId}`]: updatedComments
        });

        const data = {
            comment_id: commentId,
            liked_by: localStorage.getItem('username')  // Replace with how you get the current user's username
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
            fetchComments(contentId, contentType);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteComment = async (comment_id, content_id, content_type) => {
        try {
            const response = await fetch(`http://localhost:9889/comment/${comment_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem('username'), // Assuming username is stored in localStorage
                    content_id: content_id,
                    content_type: content_type,
                }),
            });
            fetchComments(content_id, content_type); // Fetch comments again to update the list
        } catch (error) {
            console.error('Error deleting comment:', error);
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
                    liked_by: localStorage.getItem('username'), // Assuming username is stored in localStorage
                }),
            });
            const data = await response.json();
            return data.isLiked; // Return the like status
        } catch (error) {
            console.error('Error fetching comment liked state:', error);
            return false; // Handle error appropriately
        }
    };

    const addComment = async (content_id, content_type, commentText, postedBy) => {
        try {
            await axios.post('http://localhost:9889/comment', {
                content_type,
                content_id,
                posted_by: postedBy,
                comment: commentText,
                commented_by: localStorage.getItem('username'),
            });
            fetchComments(content_id, content_type);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const checkLikedState = async (content_id) => {
        try {
            const response = await axios.post('http://localhost:9889/like/check', {
                content_id,
                liked_by: localStorage.getItem('username'),
            });
            setLikes(prevLikes => ({ ...prevLikes, [content_id]: response.data.isLiked }));
        } catch (error) {
            console.error('Error fetching liked state:', error);
        }
    };

    const handleLike = (content_id, contentType, postedBy, isSelected) => {
        const isLiked = !likes[content_id]; // Check if the content is currently liked by the user
        setLikes(prevLikes => ({
            ...prevLikes,
            [content_id]: isLiked // Update the like status for the specific content
        }));
        axios.post('http://localhost:9889/like', {
            content_type: contentType,
            content_id,
            posted_by: postedBy,
            liked_by: localStorage.getItem('username'),
            is_liked: isLiked // Send the current like status to the server
        })
            .then(response => {
                // Update likes count based on server response
                if (isSelected) {
                    setSelectedContent(prevContent => ({
                        ...prevContent,
                        likes: response.data.likes,
                    }));
                } else {
                    setRelatedContent(prevRelated => prevRelated.map(item =>
                        item.content_id === content_id ? { ...item, likes: response.data.likes } : item
                    ));
                }
            })
            .catch(error => console.error('Error liking content:', error));
    };

    const handleShowComments = (content_id, content_type) => {
        setShowComments(prevShowComments => ({
            ...prevShowComments,
            [`${content_type}_${content_id}`]: !prevShowComments[`${content_type}_${content_id}`]
        }));
        if (!showComments[`${content_type}_${content_id}`]) {
            fetchComments(content_id, content_type);
        }
    };

    const handleCommentKeyDown = (e, content_id, content_type, postedBy, parent_id = null) => {
        if (e.key === 'Enter') {
            const commentText = e.target.value.trim();
            if (commentText !== '') {
                if (parent_id) {
                    addReply(content_id, content_type, commentText, parent_id, postedBy);
                } else {
                    addComment(content_id, content_type, commentText, postedBy);
                }
                e.target.value = '';
            }
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prevShowReplyInput => ({
            ...prevShowReplyInput,
            [commentId]: !prevShowReplyInput[commentId] // Toggle the visibility
        }));
    };

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

    useEffect(() => {
        fetchUsernames();
        fetchUsername();
    }, []);

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

    const fetchUsername = () => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            console.error('Username not found in localStorage');
        }
    };

    const toggleOptions = (content_id) => {
        setShowOptions(prevState => ({
            ...prevState,
            [content_id]: !prevState[content_id],
        }));
    };

    const renderOptionsMenu = (content_id, content_type) => (
        <div className="options-menu" style={{ display: showOptions[content_id] ? 'block' : 'none' }}>
            {content_type === 'Post' && <button onClick={() => handleShare(content_id, content_type)}>Share Post</button>}
            {content_type === 'Reel' && <button onClick={() => handleShare(content_id, content_type)}>Share Reel</button>}
        </div>
    );

    useEffect(() => {
        const fetchSelectedContent = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-content/${content_id}/${content_type}`);
                const contentData = response.data;
                setSelectedContent({
                    ...contentData,
                });
            } catch (error) {
                console.error('Error fetching selected content', error);
            }
        };

        const fetchRelatedContent = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-content-by-type/${content_type}?page=${page}`);
                const currentContentId = String(content_id);
                const filteredContent = response.data.content.filter(item => String(item.content_id) !== currentContentId);
                const relatedContentIds = filteredContent.map(item => item.content_id);
                const updatedRelatedContent = filteredContent.map((item, index) => ({
                    ...item,
                }));
                setRelatedContent(prevContent => [...prevContent, ...updatedRelatedContent]);
            } catch (error) {
                console.error('Error fetching related content', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSelectedContent();
        fetchRelatedContent();
    }, [content_id, content_type, page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight && !loading) {
                loadMoreContent();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreContent, loading]);

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Pause all other videos
                    contentRefs.current.forEach(ref => {
                        if (ref !== entry.target) {
                            ref.pause();
                        }
                    });
                    // Play the current video
                    entry.target.play();
                    // Set the current playing video
                    setCurrentPlaying(entry.target);
                }
            });
        }, { threshold: 0.75 });

        contentRefs.current.forEach(ref => {
            if (ref) observer.current.observe(ref);
        });

        return () => {
            contentRefs.current.forEach(ref => {
                if (ref) observer.current.unobserve(ref);
            });
        };
    }, [relatedContent]);

    const navigate = useNavigate('');
    const [reels, setReels] = useState([]);

    useEffect(() => {
        const fetchReels = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-reels');
                const reelsData = response.data.reels.map(reel => ({ ...reel, isLiked: false, likes: reel.likes || 0 }));
                setReels(reelsData);
                fetchProfileImages(reelsData);
            } catch (error) {
                console.error('Error fetching reels:', error);
            }
        };

        fetchReels();
    }, []);


    const renderProfileImage = (username) => {
        if (profileImages[username]) {
            return <img src={profileImages[username]} alt="Profile" style={{ height: 40, width: 40, borderRadius: '50%', marginRight: 10 }} />;
        } else {
            return <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>;
        }
    };


    const renderContentItem = (item, index, isSelected = false) => (
        // <div key={item.id} className='content-item-link' >
        <div key={item.content_id} className={`content-item-link ${item.content_type === 'Post' ? 'post-content' : item.content_type === 'Reel' ? 'reel-content' : 'video-content'}`} >
            <div className='content-item-post'  >
                <div className="content-details-post">
                    <div className='content-details-head'>
                        <div className='content-details-head-dp'>
                            <div className='content-details-head-dp-inner'>
                                {renderProfileImage(item.username)}
                            </div>
                        </div>
                        <div className='content-details-head-details'>
                            <div className=' content-details-head-details--1'>
                                {'@' + item.username}
                            </div>
                            <div className='content-details-head-details--2'>
                                @music  and place <p style={{ color: " rgb(134, 131, 131)", marginLeft: "3px" }}> {formatDistanceToNow(new Date(item.date), { addSuffix: true })}</p>
                            </div>
                        </div>
                        <div className='content-details-head-details-2' onClick={(e) => { e.preventDefault(); toggleOptions(item.content_id); }}>
                            <IoMdMore />
                        </div>
                    </div>
                    {item.content_type === 'Post' && (
                        <div>
                            <img src={`data:image/png;base64,${item.post_image}`} alt="Post" style={{ height: "100%", width: "100%", borderRadius: "0%" }} />

                            <div className='options-button' onClick={(e) => { e.preventDefault(); toggleOptions(item.content_id); }}>
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                            {renderOptionsMenu(item.content_id, item.content_type)}
                        </div>
                    )
                    }
                    {item.content_type === 'Reel' && (
                        <div className='reel-content-page' style={{ position: 'relative' }}>
                            <div className="date">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</div>
                            <video
                                ref={el => contentRefs.current[index] = el}

                                loop
                                src={`data:video/mp4;base64,${item.reel}`}
                                style={{ height: "95%", width: "100%", display: 'block', margin: '0 auto', borderRadius: '5%' }}
                            />

                            <div className="username-overlay" style={{ position: 'absolute', top: '86%', left: '17%', color: '#fff', zIndex: '1' }}>
                                {'@' + item.username}
                            </div>
                            <div className="username-overlay" style={{ position: 'absolute', top: '85%', left: '5%', color: '#fff', zIndex: '1' }}>
                                {/* {profileImages[item.username] ? (
                                    <img src={profileImages[item.username]} alt={`Profile of ${item.username}`} style={{ height: "12%", width: "12%", borderRadius: "50%" }} />
                                ) : (
                                    <div>No profile image available</div>
                                )} */}{renderProfileImage(item.username)}
                            </div>
                            <div className="username-overlay" style={{ position: 'absolute', top: '90%', left: '17%', color: '#fff', zIndex: '1', fontSize: "10px" }}>
                                {item.description}
                            </div>
                            <div className='options-button' onClick={(e) => { e.preventDefault(); toggleOptions(item.content_id); }}>
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                            <div className='reel-like-comment-div'>
                                <div className='reel-like-comment-div-1'>

                                </div>
                                <div className='reel-like-comment-div-2'>
                                    <FaRegHeart />
                                </div>
                                <div className='reel-like-comment-div-2'>
                                    <FaRegComment onClick={handleModalcommentOpen} />
                                </div>
                                <div className='reel-like-comment-div-2'>
                                    <FiSend />
                                </div>
                                <div className='reel-like-comment-div-2'>
                                    <FaRegBookmark />
                                </div>
                                <div className='reel-like-comment-div-2'>
                                    <IoMdMore />
                                </div>
                                <div className='reel-like-comment-div-2'>
                                    <CgProfile />
                                </div>
                            </div>
                            {renderOptionsMenu(item.content_id, item.content_type)}
                        </div>

                    )}
                    {item.content_type === 'Video' && (
                        <div style={{ position: 'relative' }}>
                            {renderProfileImage(item.username)}
                            <video
                                ref={el => contentRefs.current[index] = el}
                                controls
                                loop
                                src={`data:video/mp4;base64,${item.video}`}
                                style={{ height: 300, width: 200, display: 'block', margin: '0 auto' }}
                            />
                            <div className="username-overlay" style={{ position: 'absolute', top: '10px', left: '180px', color: 'red', zIndex: '1' }}>
                                {'@' + item.username}
                            </div>
                            <div className='options-button' onClick={(e) => { e.preventDefault(); toggleOptions(item.content_id); }}>
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                            {renderOptionsMenu(item.content_id, item.content_type)}
                        </div>
                    )}
                    <div className='content-details-foot'>
                        <div className='content-details-foot-1'>
                            <div className='content-details-foot-1-1'>
                                <FaRegHeart onClick={() => handleLike(item.content_id, item.content_type, item.username, isSelected)} /> <p style={{ fontSize: "small" }}>{item.likes}</p>
                                {/* <FaRegComment onClick={() => setcommentSectionOpen(!iscommentSectionOpen) }  /> */}
                                <FaRegComment onClick={() => {
                                    setcommentSectionOpen(!iscommentSectionOpen);
                                    handleShowComments(item.content_id, item.content_type);
                                }} />
                                {/* <p style={{ fontSize: "small" }}>94 </p><FiSend /><p style={{ fontSize: "small" }}>94 </p> */}
                                <div className='share-button' onClick={() => handleShare(item.content_id)}>
                                    <i className='fas fa-share'><FiSend /></i>
                                </div>
                            </div>
                            <div className='content-details-foot-1-2'>
                                <FaRegBookmark />
                            </div>
                        </div>
                        <div className='content-details-foot-3'>
                            <div className='content-details-foot-3-1'>
                                {'@' + item.username}
                            </div>
                            <div className='content-details-foot-3-2'>
                                {item.title}
                            </div>
                            <div className='content-details-foot-3-3' onClick={() => setbioSectionOpen(!isbioSectionOpen)} >
                                ...more
                            </div>
                        </div>
                        {isbioSectionOpen && (
                            <div className="content-details-foot-3-3-bio">
                                {item.title}
                            </div>
                        )}
                        {iscommentSectionOpen && (
                            <div className="content-details-foot-3-3-comment">
                                <div className='content-details-foot-3-3-comment-0'>
                                    <div className='content-details-foot-3-3-comment-0-inner'>
                                        Comments 0
                                    </div>
                                </div>
                                {
                                    showComments[`${item.content_type}_${item.content_id}`] &&
                                    <div className='comment-input'>
                                        {/* <input type='text' placeholder='Add a comment...' onKeyDown={(e) => handleCommentKeyDown(e, item.content_id, item.content_type, item.username)} /> */}
                                        <div className='existing-comments'>
                                            {comments[`${item.content_type}_${item.content_id}`] && comments[`${item.content_type}_${item.content_id}`].length > 0 ? (
                                                comments[`${item.content_type}_${item.content_id}`].map((comment, index) => (
                                                    <div key={index} className='comment'>
                                                        <div className='comment-1'>
                                                            <div className='comment-111'>{renderProfileImage(comment.commented_by)} <div></div>  <span>   {`${comment.commented_by}`}</span><span className='comment-2'>{comment.comment}</span></div> <div className='comment-111-1'><FaRegHeart className={comment.isLiked ? <CiHeart /> : <FaRegHeart />} onClick={() => likeComment(comment.id, item.content_id, item.content_type)} /> </div>
                                                        </div>
                                                        <div className='comment-actions'>

                                                            <div className='comment-actions-1'>
                                                                <div className='comment-actions-1-1'>
                                                                    <p>________</p>  <span>{comment.likes}Likes</span>
                                                                </div>
                                                                <div className='comment-actions-1-2'>
                                                                    {comment.commented_by === localStorage.getItem('username') || item.username === localStorage.getItem('username') ? (
                                                                        <CiTrash onClick={() => deleteComment(comment.id, item.content_id, item.content_type)} />
                                                                    ) : null}
                                                                </div>
                                                                <div className='comment-actions-1-1'>
                                                                    <p onClick={() => toggleReplyInput(comment.id)}>replay</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {showReplyInput[comment.id] && (
                                                            <div className='reply-input'>
                                                                <div className='reply-input-inner'>
                                                                    {comment.replies && comment.replies.length > 0 && (
                                                                        <div className='replies'>
                                                                            {comment.replies.map((reply, replyIndex) => (
                                                                                <div key={replyIndex} className='reply'>
                                                                                    {renderProfileImage(reply.commented_by)}
                                                                                    <span className='reply-1'>  {`${reply.commented_by}`} -</span>
                                                                                    <span>{reply.comment}</span>

                                                                                    <div className='comment-actions-1-1'>
                                                                                        <p>________</p>  <span>{comment.likes}Likes</span>
                                                                                    </div>
                                                                                    <div className='comment-actions-1-2'>
                                                                                        {reply.commented_by === localStorage.getItem('username') || item.username === localStorage.getItem('username') ? (
                                                                                            <i className='fas fa-trash' onClick={() => deleteComment(reply.id, item.content_id, item.content_type)}></i>
                                                                                        ) : null}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <input className='reply-comment-input'
                                                                    type='text'
                                                                    placeholder='Add a reply...'
                                                                    onKeyDown={(e) => handleCommentKeyDown(e, item.content_id, item.content_type, item.username, comment.id)}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No comments yet</div>
                                            )}
                                        </div>
                                        <div className='content-details-foot-3-3-comment-2'>
                                            <div className='content-details-foot-3-3-comment-2-1'>
                                                <div className='content-details-foot-3-3-comment-2-1-1'>
                                                    <input type="text" className='content-details-foot-3-3-comment-2-1-1-input' placeholder='Comment you opnion' onKeyDown={(e) => handleCommentKeyDown(e, item.content_id, item.content_type, item.username)} />
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
                                }
                            </div>
                        )}
                        {showShareModal && (
                            <div className="modalshare">
                                <div className="modal-contentshare">
                                    <span className="close" onClick={closeModal}>&times;</span>
                                    <h2>Select users and platform to share</h2>
                                    <div className="user-selectionshare">
                                        <h3>Select Users</h3>
                                        {users.map(user => (
                                            <div key={user.username} className="user-itemshare">
                                                <label>
                                                    {renderProfileImage(user.username)}
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
                                    <div className="platform-optionsshare">
                                        <h3>Select Platform</h3>
                                        <button onClick={() => handlePlatformSelect('whatsapp')}>WhatsApp</button>
                                        <button onClick={() => handlePlatformSelect('twitter')}>Twitter</button>
                                        {/* Add buttons for other platforms */}
                                    </div>
                                    <div className="share-actionsshare">
                                        <button onClick={handleShareWithUsers}>Share with Selected Users</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {renderOptionsMenu(item.id)}
                <div className="interaction-icons">
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-comment"></i>
                    <i className="fas fa-share"></i>
                </div>
            </div>
        </div>
    );
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

        <div className='home-body'>
            <section className='home-body-nav-rellandpost'>
                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1'>
                        <div className='home-body-dp'>
                            <img src={profileImage} alt="" className='home-profile-pic-div' onClick={(e) => navigate('/Profile')} />
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

            <section className='home-body-body-post'>
                <div className='content-details-page'  >
                    {selectedContent && renderContentItem(selectedContent, 0, true)}
                    {relatedContent.map((content, index) => renderContentItem(content, index + 1))}
                </div>
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
                <div className='ubmain-profile-div-2-postall-userssuggesions'>
                    People You might know
                </div>
                <div className='content-details-people-sug'>

                    <div className='content-details-people-sug-1'>

                        <div className='content-details-people-sug-1-1'>
                            <ul style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
                                {usernames
                                    .filter(user => user.username !== username) // Filter out the locally stored username
                                    .map((user, index) => (
                                        <li key={index} >
                                            <div className='content-details-people-sug-1-1-1'>
                                                <div className='content-details-people-sug-1-1-1-1'>
                                                    <Link to={`/userprofile/${user.username}`}> <img src={`data:image/jpeg;base64,${user.profile_pic}`} alt='Profile Pic' style={{ height: "100%", width: "100%", borderRadius: "50px" }} /></Link>

                                                </div>
                                            </div>
                                            <div className='content-details-people-sug-1-1-2'>
                                                {user.username}
                                            </div>
                                            <div className='content-details-people-sug-1-1-2'>
                                                <button onClick={() => handleFollow(user.username)} className='content-details-people-sug-1-1-2-1'>{following[user.username] ? 'Following' : 'Follow'}</button>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                    </div>

                </div>
                <div className='ubmain-profile-div-2-postall-userssuggesions'>
                    Reels
                </div>

                <div className='submain-profile-div-3'>
                    <div className='submain-profile-div-3-1'>
                        <div className='submain-profile-div-3-1-i'>
                            <div className="reel-list-container-postall" >
                                {reels.map(reel => (
                                    <div
                                        key={reel.id}
                                        style={{
                                            height: "99%",
                                            width: "17%",
                                            marginLeft: 5,
                                            position: "relative",
                                            overflow: "hidden",
                                            borderRadius: 5,
                                            border: "1px solid rgb(204, 190, 190)",
                                            cursor: "pointer",
                                            maxWidth: "250px", // Limit maximum width for responsiveness
                                            minWidth: "90px", // Minimum width to ensure content visibility
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
                    </div>
                    <div className='ubmain-profile-div-2-postall-userssuggesions'>
                        Videos
                    </div>
                    <div className='submain-profile-div-3-2'>
                        <div className='submain-profile-div-3-2-i'>
                            {videos.map(video => (
                                <div className='submain-profile-div-3-2-i-c'>
                                    <div key={video.id} className='submain-profile-div-3-2-i-c-1'>
                                        {video.thumbnail ? (
                                            <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" style={{ height: "100%", width: "100%", borderRadius: "5px" }} />
                                        ) : (
                                            <video controls>
                                                <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" style={{ height: "100%", width: "100%" }} />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                    <div className='submain-profile-div-3-2-i-c-2'>
                                        <div className='submain-profile-div-3-2-i-c-2-1'>
                                            {video.video_title}
                                        </div>
                                        <div className='submain-profile-div-3-2-i-c-2-2'>
                                            3 days ago 4k views
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

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
    );
};
export default ContentDetailsPage;


