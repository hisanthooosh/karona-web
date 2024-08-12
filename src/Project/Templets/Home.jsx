import React, { useState } from 'react'
import "../Static/Css/Home.css"
import logo from "../Images/mylogo.svg.png"
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import { useEffect } from 'react'
import { HiMiniPhoto } from "react-icons/hi2";
import { PiFilmReelLight } from "react-icons/pi";
import { GoVideo } from "react-icons/go";
import { MdLiveTv } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoReorderThree } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import ViewSharesModal from './ViewSharesModal';
import UploadShareModal from './UploadShareModal';
import BuyShareModal from './BuyShareModal';
import { RiMovie2Fill } from "react-icons/ri";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);
    const [isModalPostOpen, setIsModalPostOpen] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [following, setFollowing] = useState({});

    const [isOpennavbody, setIsOpennavbody] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [isModalOpenmovie, setIsModalOpenmovie] = useState(false);

    const openModalmovie = () => {
        setIsModalOpenmovie(true);
    };

    const closeModalmovie = () => {
        setIsModalOpenmovie(false);
    };

    const handleDistributorClick = () => navigate('/UploadShareModal');
    const handleUserClick = () => setModalType('user');

    const openModalnavbody = () => {
        setIsOpennavbody(true);
    };

    const closeModalnavbody = () => {
        setIsOpennavbody(false);
    };
    const [followingUsers, setFollowingUsers] = useState([]);



    useEffect(() => {
        const fetchFollowingUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9889/following', {
                    params: { username: localStorage.getItem('username') }
                });
                setFollowingUsers(response.data.following);
            } catch (error) {
                console.error('Error fetching following users:', error);
            }
        };

        fetchFollowingUsers();
    }, []);


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
    const navigate = useNavigate('');
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

            updatedUsers.forEach(user => {
                checkFollowState(user.username)
            })

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

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-posts');
                const postsData = response.data.posts.map(post => ({ ...post, isLiked: false, likes: post.likes || 0 }));

                const fetchComments = async (postId) => {
                    try {
                        const commentResponse = await axios.get(`http://localhost:9889/comments/Post/${postId}`);
                        return commentResponse.data;
                    } catch (error) {
                        console.error(`Error fetching comments for post ${postId}:, error`);
                        return [];
                    }
                };

                const requests = postsData.map(async (post) => {
                    const comments = await fetchComments(post.id);
                    post.comments = comments;
                    post.commentsCount = comments.length;

                    if (post.username && !followingUsers.includes(post.username)) {
                        // Optionally, check follow state if required
                        await checkFollowState(post.username);
                    }
                });

                await Promise.all(requests);

                setPosts(postsData);

                fetchProfileImages(postsData);

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [followingUsers]);

    const followingPosts = posts.filter(post => followingUsers.includes(post.username));
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9889/get-all-posts');
    //             setPosts(response.data.posts.map(post => ({ ...post, isLiked: false, likes: post.likes || 0 })));
    //             fetchProfileImages(response.data.posts)
    //             // Initialize isLiked state for each post
    //             // checkLikedState(response.data.posts);
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //         }
    //     };

    //     fetchPosts();
    // }, []);

    const [reels, setReels] = useState([]);
    // useEffect(() => {
    //     const fetchReels = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9889/get-all-reels');
    //             const reelsData = response.data.reels.map(reel => ({ ...reel, isLiked: false, likes: reel.likes || 0 }));
    //             setReels(reelsData);
    //             fetchProfileImages(reelsData);
    //         } catch (error) {
    //             console.error('Error fetching reels:', error);
    //         }
    //     };

    //     fetchReels();
    // }, []);


    useEffect(() => {
        const fetchReels = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-reels');
                const reelsData = response.data.reels.map(reel => ({ ...reel, isLiked: false, likes: reel.likes || 0 }));

                const fetchComments = async (reelId) => {
                    try {
                        const commentResponse = await axios.get(`http://localhost:9889/comments/Reel/${reelId}`);
                        return commentResponse.data;
                    } catch (error) {
                        console.error(`Error fetching comments for reel ${reelId}:, error`);
                        return [];
                    }
                };

                const requests = reelsData.map(async (reel) => {
                    const comments = await fetchComments(reel.id);
                    reel.comments = comments;
                    reel.commentsCount = comments.length;

                    if (reel.username && !followingUsers.includes(reel.username)) {
                        // Optionally, check follow state if required
                        await checkFollowState(reel.username);
                    }
                });

                await Promise.all(requests);

                setReels(reelsData);

                fetchProfileImages(reelsData);

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchReels();
    }, [followingUsers]);

    const followingReels = reels.filter(reel => followingUsers.includes(reel.username));

    const [profileImages, setProfileImages] = useState({});
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

    const [videos, setVideos] = useState([]);
    // useEffect(() => {
    //     const fetchVideos = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9889/get-all-videos');
    //             const videosData = response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 }));
    //             setVideos(videosData);
    //             fetchProfileImagesv(videosData);
    //         } catch (error) {
    //             console.error('Error fetching videos:', error);
    //         }
    //     };

    //     fetchVideos();
    // }, []);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-videos');
                const videosData = response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 }));

                const fetchComments = async (videoId) => {
                    try {
                        const commentResponse = await axios.get(`http://localhost:9889/comments/Video/${videoId}`);
                        return commentResponse.data;
                    } catch (error) {
                        console.error(`Error fetching comments for video ${videoId}:, error`);
                        return [];
                    }
                };

                const requests = videosData.map(async (video) => {
                    const comments = await fetchComments(video.id);
                    video.comments = comments;
                    video.commentsCount = comments.length;

                    if (video.username && !followingUsers.includes(video.username)) {
                        // Optionally, check follow state if required
                        await checkFollowState(video.username);
                    }
                });

                await Promise.all(requests);

                setVideos(videosData);

                fetchProfileImages(videosData);

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchVideos();
    }, [followingUsers]);

    const followingVideos = reels.filter(reel => followingUsers.includes(reel.username));

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


    return (

        <div className='home-body'>
            <section className='home-body-nav'>
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
                    <div className='home-body-nav-1-1-home'>
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
                        <SlLogout onClick={(e) => navigate('/')} />
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
                <div className='home-body-body-headder'>
                    <div className='home-body-body-headder-1-navbtn'>
                        <IoReorderThree onClick={openModalnavbody} />
                    </div>
                    <div className='home-body-body-headder-1'>
                        <img src={logo} alt="" className='home-body-body-headder-1-logo' />
                    </div>
                    <div className='home-body-body-headder-2'>
                        <input type="text" className='home-body-body-headder-2-searchbar' placeholder='Search...' />
                    </div>

                    <div className='home-body-body-headder-3' onClick={handleModalOpen}>
                        <LuBellRing />
                    </div>
                    <div className='home-body-body-headder-3-3' onClick={handleModalPostOpen}>
                        <div className="home-body-body-headder-3-3-1">
                            <div className="home-body-body-headder-3-2-1">
                                <AiOutlineVideoCameraAdd />
                            </div>
                            <div className="home-body-body-headder-3-2-2">
                                &nbsp; CREATE
                            </div>
                        </div>
                    </div>
                    <div className='home-body-body-headder-3-3'>
                        <div className='home-body-body-headder-3-3-inner' onClick={openModalmovie}>
                            <RiMovie2Fill /> cinema
                        </div>

                    </div>
                </div>

                <div className='home-body-body-Tab'>
                    <Tabs className="c-h-e" >
                        <TabList className="c-h-e-1" >
                            <Tab className="c-h-e-1-1"> Explore</Tab>
                            <Tab className="c-h-e-1-1">Following</Tab>
                        </TabList>
                        <TabPanel>
                            <div>


                                {modalType === 'distributor' && <UploadShareModal onClose={() => setModalType(null)} />}
                                {modalType === 'user' && (
                                    <div>
                                        <button onClick={(e) => navigate('/ViewShareModal')}>View Share Status</button>
                                        <button onClick={(e) => navigate('/BuyShareModal')}>Buy Share</button>
                                    </div>
                                )}

                            </div>
                            <div className='suggesttopics-home'>
                                <div className='suggesttopics-home-inner'>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>All</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Music</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Movies</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Gamming</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Travelling</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Tech</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Moto vlog</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>cars</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>bikes</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Tech</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>comedy</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>news</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>computer programing</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>teaser</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Tech</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>rewies</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>love</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Politics</p>
                                    </div>
                                    <div className='suggesttopics-home-inner-1'>
                                        <p>Tech</p>
                                    </div>
                                </div>
                            </div>
                            <div className='home-explore-post-postheadding'>
                                Posts
                            </div>
                            <div className='home-explore-post-10001 ' style={{ display: 'flex', flexDirection: 'row' }}>
                                {posts.map(post => (
                                    <div className='home-explore-post-100011' >
                                        <div key={post.id} className='home-explore-post-10001-1'>
                                            <div className='home-explore-post-10001-1-1' onClick={() => navigate(`/content-details/${post.id}/Post`)}>
                                                <img src={`data:image/jpeg;base64,${post.post_image}`} alt="Post" className='post-image' />
                                            </div>
                                            <div className='home-explore-post-10001-1-2'>
                                                <div className='home-explore-post-10001-1-2-1'>
                                                    <div className='home-explore-post-10001-1-2-1-1'>
                                                        {profileImages[post.username] ? (
                                                            <img src={profileImages[post.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: "50px" }} />
                                                        ) : (
                                                            <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='home-explore-post-10001-1-2-2'>
                                                    {post.username}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-post-10001 ' style={{ display: 'flex', flexDirection: 'row' }}>
                                {posts.map(post => (
                                    <div className='home-explore-post-100011' >
                                        <div key={post.id} className='home-explore-post-10001-1'>
                                            <div className='home-explore-post-10001-1-1' onClick={() => navigate(`/content-details/${post.id}/Post`)}>
                                                <img src={`data:image/jpeg;base64,${post.post_image}`} alt="Post" style={{ height: "100%", width: "100%" }} />
                                            </div>
                                            <div className='home-explore-post-10001-1-2'>
                                                <div className='home-explore-post-10001-1-2-1'>
                                                    <div className='home-explore-post-10001-1-2-1-1'>
                                                        {profileImages[post.username] ? (
                                                            <img src={profileImages[post.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: "50px" }} />
                                                        ) : (
                                                            <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='home-explore-post-10001-1-2-2'>
                                                    {post.username}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-post-postheadding'>
                                Reels
                            </div>
                            <div className='home-explore-reels-reels' style={{ display: 'flex', flexDirection: 'row' }}>
                                {reels.map(reel => (
                                    <div className='home-explore-reels-reels-1' onClick={() => navigate(`/content-details/${reel.id}/Reel`)}>
                                        <div className='home-explore-reels-reels-1-1'>
                                            <video
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover", // Ensure video covers the container
                                                    borderRadius: "5px"
                                                }}
                                            >
                                                <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />
                                            </video>

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-reels-reels' style={{ display: 'flex', flexDirection: 'row' }}>
                                {reels.map(reel => (
                                    <div className='home-explore-reels-reels-1' onClick={() => navigate(`/content-details/${reel.id}/Reel`)}>
                                        <div className='home-explore-reels-reels-1-1'>
                                            <video
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover", // Ensure video covers the container
                                                    borderRadius: "5px"
                                                }}
                                            >
                                                <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-post-postheadding'>
                                People you may know
                            </div>
                            <div className='home-explore-people-people'>
                                <ul style={{ display: 'flex', flexDirection: 'row', height: "100%", listStyleType: "none" }}>

                                    {usernames
                                        .filter(user => user.username !== username) // Filter out the locally stored username
                                        .map((user, index) => (
                                            <li key={index} >
                                                <div className='home-explore-people-people-1'>
                                                    <div className='home-explore-people-people-1-1'>
                                                        <div className='home-explore-people-people-1-1-1'>
                                                            <Link to={`/userprofile/${user.username}`}> <img src={`data:image/jpeg;base64,${user.profile_pic}`} alt='Profile Pic' style={{ height: "100%", width: "100%", borderRadius: "50px" }} /></Link>
                                                        </div>
                                                    </div>
                                                    <div className='home-explore-people-people-1-3'>
                                                        {user.username}
                                                    </div>
                                                    <div className='home-explore-people-people-1-2'>
                                                        <button onClick={() => handleFollow(user.username)} className='home-explore-people-people-1-2-btn'>{following[user.username] ? 'Following' : 'Follow'}</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className='home-explore-post-postheadding'>
                                Videos
                            </div>
                            <div className='home-explore-video-video' style={{ display: 'flex', flexDirection: 'row' }}>
                                {videos.map(video => (
                                    <div key={video.id} className='home-explore-video-video-1' onClick={() => navigate(`/content-details/${video.id}/Video`)} >
                                        <div className='home-explore-video-video-1-1'>
                                            {video.thumbnail ? (
                                                <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" style={{ height: "100%", width: "100%", borderRadius: "5px" }} />
                                            ) : (
                                                <video controls>
                                                    <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" style={{ height: "100%", width: "100%" }} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                        <div className='home-explore-video-video-1-2'>
                                            <div className='home-explore-video-video-1-2-1'>
                                                <div className='home-explore-video-video-1-2-1-1'>
                                                    {profileImagesv[video.username] ? (
                                                        <img src={profileImagesv[video.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: '50%', marginRight: 10 }} className='dp-in-home-video' />
                                                    ) : (
                                                        <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='home-explore-video-video-1-2-2'>
                                                <div className='home-explore-video-video-1-2-2-1'>
                                                    {video.video_title}
                                                </div>
                                                <div className='home-explore-video-video-1-2-2-2'>
                                                    {video.username} 2k views
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-video-video' style={{ display: 'flex', flexDirection: 'row' }}>
                                {videos.map(video => (
                                    <div key={video.id} className='home-explore-video-video-1'>
                                        <div className='home-explore-video-video-1-1'>
                                            {video.thumbnail ? (
                                                <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" style={{ height: "100%", width: "100%", borderRadius: "5px" }} />
                                            ) : (
                                                <video controls>
                                                    <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" style={{ height: "100%", width: "100%" }} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                        <div className='home-explore-video-video-1-2'>
                                            <div className='home-explore-video-video-1-2-1'>
                                                <div className='home-explore-video-video-1-2-1-1'>
                                                    {profileImagesv[video.username] ? (
                                                        <img src={profileImagesv[video.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: '50%', marginRight: 10 }} className='dp-in-home-video' />
                                                    ) : (
                                                        <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='home-explore-video-video-1-2-2'>
                                                <div className='home-explore-video-video-1-2-2-1'>
                                                    {video.video_title}
                                                </div>
                                                <div className='home-explore-video-video-1-2-2-2'>
                                                    {video.username} 2k views
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-video-video' style={{ display: 'flex', flexDirection: 'row' }}>
                                {videos.map(video => (
                                    <div key={video.id} className='home-explore-video-video-1'>
                                        <div className='home-explore-video-video-1-1'>
                                            {video.thumbnail ? (
                                                <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" style={{ height: "100%", width: "100%", borderRadius: "5px" }} />
                                            ) : (
                                                <video controls>
                                                    <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" style={{ height: "100%", width: "100%" }} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                        <div className='home-explore-video-video-1-2'>
                                            <div className='home-explore-video-video-1-2-1'>
                                                <div className='home-explore-video-video-1-2-1-1'>
                                                    {profileImagesv[video.username] ? (
                                                        <img src={profileImagesv[video.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: '50%', marginRight: 10 }} className='dp-in-home-video' />
                                                    ) : (
                                                        <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='home-explore-video-video-1-2-2'>
                                                <div className='home-explore-video-video-1-2-2-1'>
                                                    {video.video_title}
                                                </div>
                                                <div className='home-explore-video-video-1-2-2-2'>
                                                    {video.username} 2k views
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                            <div className='home-explore-post-postheadding'>
                                Posts
                            </div>
                            <div className='home-explore-post-10001 ' style={{ display: 'flex', flexDirection: 'row' }}>
                                {followingPosts.map(post => (
                                    <div className='home-explore-post-100011' >
                                        <div key={post.id} className='home-explore-post-10001-1'>
                                            <div className='home-explore-post-10001-1-1' onClick={() => navigate(`/content-details/${post.id}/Post`)}>
                                                <img src={`data:image/jpeg;base64,${post.post_image}`} alt="Post" className='post-image' />
                                            </div>
                                            <div className='home-explore-post-10001-1-2'>
                                                <div className='home-explore-post-10001-1-2-1'>
                                                    <div className='home-explore-post-10001-1-2-1-1'>
                                                        {profileImages[post.username] ? (
                                                            <img src={profileImages[post.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: "50px" }} />
                                                        ) : (
                                                            <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='home-explore-post-10001-1-2-2'>
                                                    {post.username}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-post-postheadding'>
                                Reels
                            </div>
                            <div className='home-explore-reels-reels' style={{ display: 'flex', flexDirection: 'row' }}>
                                {followingReels.map(reel => (
                                    <div className='home-explore-reels-reels-1' onClick={() => navigate(`/content-details/${reel.id}/Reel`)}>
                                        <div className='home-explore-reels-reels-1-1'>
                                            <video
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover", // Ensure video covers the container
                                                    borderRadius: "5px"
                                                }}
                                            >
                                                <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />
                                            </video>

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='home-explore-post-postheadding'>
                                Videos
                            </div>
                            <div className='home-explore-video-video' style={{ display: 'flex', flexDirection: 'row' }}>
                                {followingVideos.map(video => (
                                    <div key={video.id} className='home-explore-video-video-1' onClick={() => navigate(`/content-details/${video.id}/Video`)} >
                                        <div className='home-explore-video-video-1-1'>
                                            {video.thumbnail ? (
                                                <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" style={{ height: "100%", width: "100%", borderRadius: "5px" }} />
                                            ) : (
                                                <video controls>
                                                    <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" style={{ height: "100%", width: "100%" }} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                        <div className='home-explore-video-video-1-2'>
                                            <div className='home-explore-video-video-1-2-1'>
                                                <div className='home-explore-video-video-1-2-1-1'>
                                                    {profileImagesv[video.username] ? (
                                                        <img src={profileImagesv[video.username]} alt="Profile" style={{ height: "100%", width: "100%", borderRadius: '50%', marginRight: 10 }} className='dp-in-home-video' />
                                                    ) : (
                                                        <div style={{ height: 40, width: 40, borderRadius: '50%', backgroundColor: 'gray', marginRight: 10 }}></div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='home-explore-video-video-1-2-2'>
                                                <div className='home-explore-video-video-1-2-2-1'>
                                                    {video.video_title}
                                                </div>
                                                <div className='home-explore-video-video-1-2-2-2'>
                                                    {video.username} 2k views
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </section>
            {isModalOpen && (
                <div className='modal' onClick={handleModalClose}>
                    <div className='modal-content' >

                        <div className='modal-content-noti'>
                            <div className='modal-content-noti-1'>
                                Notifications
                            </div>
                            <div className='modal-content-noti-2'>
                                <span className='close-button' onClick={handleModalClose}>&times;</span>
                            </div>
                        </div>

                        <div className='modal-content-1'>

                        </div>
                    </div>
                </div>
            )}
            {isModalVoiceOpen && (
                <div className='modal' onClick={handleModalVoiceClose}>
                    <div className='modal-content-voice' >

                        <div className='modal-content-voice-inner'>
                            <div className='modal-content-voice-inner-1'>
                                <FaMicrophone />
                            </div>
                            <div className='modal-content-voice-inner-2'>
                                Speak something
                            </div>
                            <div className='modal-content-voice-inner-3'>
                                <span className='close-button' onClick={handleModalVoiceClose}>&times;</span>
                            </div>
                        </div>

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
            {isModalOpenmovie && (
                <div className="modal-overlay-movie" onClick={closeModalmovie}>
                    <div className="modal-content-movie">
                        <div className="movie" onClick={handleDistributorClick}> DISTRIBUTORS</div>
                        <div className="movie" onClick={handleUserClick}>INVESTER</div>


                    </div>
                </div>
            )}

            {isOpennavbody && (
                <div className="modal-overlay1">
                    <div className="modal-content1">


                        <div className='modal-content1-1'>
                            <IoClose onClick={closeModalnavbody} />
                        </div>
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
                        <div className='modal-content1-1'>
                            <IoHomeSharp />
                        </div>
                        <div className='modal-content1-1'>
                            <TfiVideoClapper onClick={(e) => navigate('/Reels')} /> <br />
                        </div>
                        <div className='modal-content1-1'>
                            <FiSend onClick={(e) => navigate('/Message')} />
                        </div>
                        <div className='modal-content1-1'>
                            <FaFireAlt onClick={(e) => navigate('/Trending')} />
                        </div>
                        <div className='modal-content1-1'>
                            <FaRegBookmark onClick={(e) => navigate('/Saved')} />
                        </div>
                        <div className='modal-content1-1'>
                            <FaHistory onClick={(e) => navigate('/History')} />
                        </div>
                        <div className='modal-content1-1'>
                            <SlLogout onClick={(e) => navigate('/')} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
