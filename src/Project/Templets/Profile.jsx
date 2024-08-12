import React, { useState, useEffect } from 'react'
import "../Static/Css/Profile.css"
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { IoSettings } from "react-icons/io5";
import Button from '@mui/material/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaMicrophone } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import PortfolioModal from './PortfolioModal';

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVoiceOpen, setIsModalVoiceOpen] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [totalContentCount, setTotalContentCount] = useState(0);
    const [following, setFollowing] = useState({});
    const [showPortfolio, setShowPortfolio] = useState(false);
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

    useEffect(() => {
        const fetchFollowersCount = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const response = await axios.get(`http://127.0.0.1:9889/profile/followers-count/${storedUsername}`);
                    setFollowersCount(response.data.followersCount);
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching followers count:', error);
            }
        };

        const fetchFollowingCount = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const response = await axios.get(`http://127.0.0.1:9889/profile/following-count/${storedUsername}`);
                    setFollowingCount(response.data.followingCount);
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching following count:', error);
            }
        };

        fetchFollowersCount();
        fetchFollowingCount();
    }, []);


    useEffect(() => {
        const fetchTotalContentCount = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const response = await axios.get(`http://127.0.0.1:9889/profile/content-count/${storedUsername}`);
                    setTotalContentCount(response.data.totalCount);
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching total content count:', error);
            }
        };

        fetchTotalContentCount();
    }, []);

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

    const gotohome = () => {
        navigate('/Home');
    }

    const gotoSettings = () => {
        navigate('/Settings');
    }

    const gotoeditmenu = () => {
        navigate('/Editprofile');
    }

    const gotoportfoliomenu = () => {
        navigate('/Portfolio');
    }

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);

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
        const fetchVideos = async (username) => {
            try {
                const response = await axios.get(`http://localhost:9889/get-videos-by-username?username=${username}`);
                console.log('Videos response:', response.data); // Log the entire response
                setVideos(response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 })));

            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

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
        const fetchBio = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const response = await axios.get(`http://127.0.0.1:9889/profile/bio/${storedUsername}`);
                    console.log('Bio response:', response.data);
                    if ('bio' in response.data) {
                        setBio(response.data.bio);
                    } else {
                        console.error('Bio not found in response:', response.data)
                    }
                } else {
                    console.error('Username not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching bio:', error);
            }
        };
        fetchBio();
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Retrieve username from local storage when component mounts
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            fetchPosts(storedUsername); // Fetch posts data for the logged-in user
        }
    }, []);

    const fetchPosts = async (username) => {
        try {
            const response = await axios.get(`http://localhost:9889/get-posts-by-username?username=${username}`);
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
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

    const [reels, setReels] = useState([]);

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

    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            fetchVideos(storedUsername);
        }
    }, []);
    const fetchVideos = async (username) => {
        try {
            const response = await axios.get(`http://localhost:9889/get-videos-by-username?username=${username}`);
            setVideos(response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 }))); // Initialize isLiked state for each video

        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };
    const [allvideos, setallVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:9889/get-all-videos');
                const videosData = response.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 }));
                setallVideos(videosData);
                fetchProfileImagesv(videosData);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <section className='Profile-body'>
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
                        <SlLogout onClick={(e) => navigate('/')} />
                    </div>

                    <div className='home-body-nav-1-2'>
                        Logout
                    </div>
                </div>

                <div className='home-body-nav-1'>
                    <div className='home-body-nav-1-1' >
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
                            <img src={profileImage} alt="" style={{ height: "100%", width: "100%", borderRadius: "50%" }} />
                        </div>
                    </div>

                    <div className='main-profile-div-i-1-2'>
                        <div className='main-profile-div-i-1-2-1'>
                            <div className='main-profile-div-i-1-2-1-1'>
                                <h1>{username}</h1>
                            </div>

                            <div className='main-profile-div-i-1-2-1-2'>
                                <Link to={'/Editprofile'} >      <Button variant="outlined" style={{ height: "80%", width: "100%" }} className='profilebtn'  >Edit Profile</Button></Link>
                            </div>

                            <div className='main-profile-div-i-1-2-1-2'>
                                <Button variant="outlined" style={{ height: "80%", width: "80%" }} className='profilebtn' onClick={() => navigate(`/portfolio/${username}`)} >Portfoilo</Button>

                 

                            </div>


                            <div className='main-profile-div-i-1-2-1-3'>
                                <IoSettings onClick={(e) => navigate('/Settings')} />
                            </div>
                        </div>

                        <div className='main-profile-div-i-1-2-2'>
                            <div className='main-profile-div-i-1-2-2-1'>
                                <h1>  {totalContentCount}<br />  Post</h1>
                            </div>

                            <div className='main-profile-div-i-1-2-2-1'>
                                <h1>  {followersCount} <br />Followers</h1>
                            </div>

                            <div className='main-profile-div-i-1-2-2-1'>
                                <h1>  {followingCount} <br />Following</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='main-profile-div-i-2'>
                    <div className='main-profile-div-i-2-1'>
                        <div className='main-profile-div-i-2-1-1' >
                            {name}
                        </div>

                        <div className='main-profile-div-i-2-1-2'>
                            {bio}
                        </div>

                        <div className='main-profile-div-i-2-1-1'>
                            https://letsloot.com
                        </div>
                    </div>
                </div>

                <div className='profilebtndiv'>
                    {/* <Link to={'/Editprofile'} style={{ height: "90%", width: "47%" }} >   <Button variant="outlined" className='profilebtn' >Edit Profile</Button></Link>
                    <Button variant="outlined" style={{ height: "90%", width: "45%" }} className='profilebtn'  >Portfoilo</Button> */}
                    <button className='mediabtnprofile'>Edit profile</button>
                    <button className='mediabtnprofile'>Portfoilo</button>



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
                        <section className='posttab-s1' style={{ display: "flex", flexWrap: "wrap" }} >
                            {posts.map((post) => (
                                <img onClick={(e) => navigate(`/Post/${post.id}`)} src={`data:image/jpeg;base64,${post.post_image}`} alt="Post" className='profile-post' />
                            ))}
                        </section>
                    </TabPanel>

                    <TabPanel>
                        <section className='reeltab-s' style={{ display: "flex", flexWrap: "wrap" }} >
                            {reels.map((reel) => (
                                <div key={reel.id} className="reel-item">
                                    <Link to={`/reel/${reel.id}`}>
                                        <video className='postreels'>
                                            <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />
                                        </video>
                                    </Link>
                                </div>
                            ))}
                        </section>
                    </TabPanel>

                    <TabPanel>
                        <div className='video'>
                            {videos.map((video) => (
                                <div key={video.id} className="video-item">
                                    <div onClick={(e) => navigate(`/Video/${video.id}`)} className="video-link">

                                        <div className='video-profile-allvideos'>
                                            <div className='video-profile-allvideos-inner'>
                                                <div className='video-profile-allvideos-inner-1'>
                                                    {video.thumbnail ? (
                                                        <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" className='video-profile-allvideos-inner-1-thumb' />
                                                    ) : (
                                                        <video controls>
                                                            <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}
                                                </div>
                                                <div className='video-profile-allvideos-inner-2'>
                                                    <div className='video-profile-allvideos-inner-2-1'>
                                                        <h3>{video.video_title}</h3>
                                                    </div>
                                                    <div className='video-profile-allvideos-inner-2-2'>
                                                        {/* {new Date(video.video_creation_datetime).toLocaleString()} */}
                                                        12k Views 5 days ago
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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

            </section>
        </section>
    )
}

export default Profile


