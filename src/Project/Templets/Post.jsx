import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../Static/Css/Home.css"
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { FaMicrophone } from "react-icons/fa";
import axios from 'axios';
import { useEffect } from 'react'
import "../Static/Css/Post.css"
import { IoMdMore } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { CiFaceSmile } from "react-icons/ci";
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = () => {

    const navigate = useNavigate('');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [post, setPost] = useState(null);
    const containerRef = useRef(null)
    const [otherPosts, setOtherPosts] = useState([]);
    const [showOptions, setShowOptions] = useState({});
    const { postId } = useParams();
    const [isbioSectionOpen, setbioSectionOpen] = useState(false);
    const [iscommentSectionOpen, setcommentSectionOpen] = useState(false);
    const [usernames, setUsernames] = useState([]);
    const [profileImages, setProfileImages] = useState({});
    const [reels, setReels] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [likes, setLikes] = useState("")
    const [following, setFollowing] = useState({});

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
    };   useEffect(() => {
        fetchUsernames();
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

            updatedUsers.forEach(user => {
                checkFollowState(user.username)
            })

        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    };

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
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-post/${postId}`);
                const postData = response.data.post;
                setPost(postData);
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        const fetchOtherPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/get-post/${postId}`);
                const username = response.data.post.username;
                const otherPostsResponse = await axios.get(`http://localhost:9889/get-posts-by-username?username=${username}`);
                const filteredPosts = otherPostsResponse.data.posts.filter(p => p.id !== parseInt(postId));
                setOtherPosts(filteredPosts);

            } catch (error) {
                console.error('Error fetching other posts:', error);
            }
        };

        fetchPost();
        fetchOtherPosts();
    }, [postId]);

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

    const [allvideos, setallVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-videos');
                const videosData = response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 }));
                setallVideos(videosData);
                fetchProfileImages(videosData);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
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


    const fetchComments = async (content_id) => {
        try {
            const response = await fetch(`http://localhost:9889/comments/Post/${content_id}`);
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
                [`posts_${content_id}`]: updatedCommentsWithReplies
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
                    content_type: 'Post',
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
        const updatedComments = comments[`posts_${content_id}`].map(comment => {
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
            [`posts_${content_id}`]: updatedComments
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
                    content_type: 'posts',
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
                content_type: 'Post',
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
            [`posts_${content_id}`]: !prevShowComments[`posts_${content_id}`]
        }));
        if (!showComments[`posts_${content_id}`]) {
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
            content_type: 'Post',
            content_id: content_id,
            posted_by: postedBy,
            liked_by: localStorage.getItem('username'),
        })
            .then(response => {
                setPost(prevPost => ({
                    ...prevPost,
                    likes: response.data.likes,
                }));
                setOtherPosts(prevOtherPosts => prevOtherPosts.map(item =>
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
            await axios.delete(`http://localhost:9889/delete-post/${content_id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleShare = (postId) => {
        setShowShareModal(true);
        setCurrentPostId(postId);
    };

    const closeModal = () => {
        setShowShareModal(false);
        setCurrentPostId(null);
    };

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        if (currentPostId !== null) {
            switch (platform) {
                case 'whatsapp':
                    window.open(`https://wa.me/?text=Check%20out%20this%20post:%20http://localhost:3000/content-details/${currentPostId}/Post`);
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=http://localhost:3000/content-details/${currentPostId}/Post`);
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
                    content_id: currentPostId,
                    content_type: 'Post'
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
            <button onClick={() => handleDelete(content_id)}>Delete Post</button>
            <button>Edit Post</button>
            <button onClick={() => handleShare(content_id)}>Share Post</button>
        </div>
    );


    const renderPostItem = (item) => (
        <div key={item.id} className='content-item-link-post' >
            <div className='content-item-post'>
                <div className="content-details-post">
                    <div className='content-details-head'>
                        <div className='content-details-head-dp'>
                            <div className='content-details-head-dp-inner'>
                                {/* <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} onClick={(e) => navigate('/Profile')} /> */}
                                {profileImages[post.username] ? (
                                    <img src={profileImages[post.username]} alt="Profile" style={{ height: 40, width: 40, borderRadius: '50%', marginRight: 10 }} />
                                ) : (
                                    <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                )}
                            </div>

                        </div>
                        <div className='content-details-head-details'>
                            <div className=' content-details-head-details--1'>
                                {item.username}
                            </div>
                            <div className='content-details-head-details--2'>
                                music  and place<p style={{ color: " rgb(134, 131, 131)", marginLeft: "3px" }}>{formatDistanceToNow(new Date(item.post_datetime), { addSuffix: true })}</p>
                            </div>
                        </div>
                        <div className='content-details-head-details-2' onClick={(e) => { e.preventDefault(); toggleOptions(item.id); }}>
                            <IoMdMore />
                        </div>
                    </div>
                    <img src={`data:image/jpeg;base64,${item.post_image}`} alt="Post" style={{ borderRadius: "0%" }} />
                    <div className='content-details-foot'>
                        <div className="date"></div>
                        <div className='content-details-foot-1'>
                            <div className='content-details-foot-1-1'>

                                <FaRegHeart onClick={(e) => { e.preventDefault(); handleLike(item.id, item.username); }} /> <p style={{ fontSize: "small" }}>{item.likes} </p><FaRegComment onClick={() => setcommentSectionOpen(!iscommentSectionOpen)} /><p style={{ fontSize: "small" }}>{item.commentcount} </p><FiSend onClick={(e) => { e.preventDefault(); handleShare(item.id); }} /><p style={{ fontSize: "small" }}>94 </p>
                            </div>
                            <div className='content-details-foot-1-2'>
                                <FaRegBookmark />
                            </div>
                        </div>
                        <div className='content-details-foot-2'>
                            <p>94 </p><p>Likes</p>
                        </div>
                        <div className='content-details-foot-3'>
                            <div className='content-details-foot-3-1'>
                                {item.username}
                            </div>
                            <div className='content-details-foot-3-2'>
                                {item.post_title}
                            </div>
                            <div className='content-details-foot-3-3' onClick={() => setbioSectionOpen(!isbioSectionOpen)} >
                                ...more
                            </div>

                        </div>
                        {isbioSectionOpen && (
                            <div className="content-details-foot-3-3-bio">
                                {item.post_title}
                            </div>
                        )}
                        {iscommentSectionOpen && (
                            <div className="content-details-foot-3-3-comment">
                                <div className='content-details-foot-3-3-comment-0'>
                                    <div className='content-details-foot-3-3-comment-0-inner'>
                                        Comments 0
                                    </div>
                                    {showComments[`posts_${item.id}`] &&
                                        <div className="post-comments">
                                            {comments[`posts_${item.id}`]?.map(comment => (
                                                <div key={comment.id} className="comment">

                                                    <div className="comment-content">
                                                        <span className="comment-username"><strong>{'@' + comment.commented_by}</strong></span>
                                                        <p>{comment.comment}</p>
                                                        <div className='comment-actions'>
                                                            <i className={comment.isLiked ? 'fas fa-heart' : 'far fa-heart'} onClick={() => likeComment(comment.id, item.id)}></i> <span>{comment.likes}</span>
                                                            {comment.commented_by === localStorage.getItem('username') || item.username === localStorage.getItem('username') ? (
                                                                <i className='fas fa-trash' onClick={() => deleteComment(comment.id, item.id)}></i>
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
                                                                                <i className={reply.isLiked ? 'fas fa-heart' : 'far fa-heart'} onClick={() => likeComment(reply.id, item.id)}></i> <span>{reply.likes}</span>
                                                                                {reply.commented_by === localStorage.getItem('username') || item.username === localStorage.getItem('username') ? (
                                                                                    <i className='fas fa-trash' onClick={() => deleteComment(reply.id, item.id)}></i>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <input type="text" placeholder="Write a reply..." onKeyDown={(e) => handleCommentKeyDown(e, item.id, item.username, comment.id)} />
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            ))}
                                            <div className="comment-input">
                                                <input type="text" placeholder="Write a comment..." onKeyDown={(e) => handleCommentKeyDown(e, item.id, item.username)} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='content-details-foot-3-3-comment-inner'>
                                    <div className='content-details-foot-3-3-comment-inner-inner'>
                                        <div className='content-details-foot-3-3-comment-1'>
                                        </div>
                                        <div className='content-details-foot-3-3-comment-2'>
                                            <div className='content-details-foot-3-3-comment-2-1'>
                                                <div className='content-details-foot-3-3-comment-2-1-1'>
                                                    <input type="text" className='content-details-foot-3-3-comment-2-1-1-input' placeholder='Comment you opnion' />
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

    return (

        <div className='home-body-post'>
            <section className='home-body-nav-postnav'>
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
                    <div className='home-body-nav-1-1' onClick={(e) => navigate('/Home')}>
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
            <section className='home-body-body-post'>
                <div className='post-body'>
                    <div ref={containerRef} className='post-body-body-phone'>
                        {post ? (
                            <div className="post-details" >
                                {renderPostItem(post)}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}

                        <div>
                            <h3>Other Posts</h3>
                            <div className="other-posts">
                                {otherPosts.map(otherPost => renderPostItem(otherPost))}
                            </div>
                        </div>
                    </div>
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
                    People you might know
                </div>
                <div className='submain-profile-div1-3'>

                    <div className='submain-profile-div1-3-1'>
                        <ul style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
                            {usernames
                                .filter(user => user.username !== username) // Filter out the locally stored username
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
            </section>
        </div>
    )
}

export default Post
