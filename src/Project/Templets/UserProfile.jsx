import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../Static/Css/Oprofile.css"
import { FaHistory } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { FiSend } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaMicrophone } from "react-icons/fa";


const UserProfile = () => {
    const { username } = useParams();
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [show, setShow] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [totalContentCount, setTotalContentCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [reels, setReels] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    const [following, setFollowing] = useState({});
    const [usernames, setUsernames] = useState([]);



    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const [nameResponse, imageResponse, bioResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:9889/profile/name/${username}`),
                    axios.get(`http://127.0.0.1:9889/profile/image/${username}`, { responseType: 'arraybuffer' }),
                    axios.get(`http://127.0.0.1:9889/profile/bio/${username}`)
                ]);

                setName(nameResponse.data.name);

                const imageData = btoa(new Uint8Array(imageResponse.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                setProfileImage(`data:image/png;base64,${imageData}`);

                setBio(bioResponse.data.bio);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setProfileImage('');
            }
        };

        const fetchUserCounts = async () => {
            try {
                const [followersResponse, followingResponse, contentCountResponse, followStateResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:9889/profile/followers-count/${username}`),
                    axios.get(`http://127.0.0.1:9889/profile/following-count/${username}`),
                    axios.get(`http://127.0.0.1:9889/profile/content-count/${username}`),
                    axios.post(`http://127.0.0.1:9889/follow/check`, {
                        follower: localStorage.getItem('username'),
                        followed: username,
                    })
                ]);

                setFollowersCount(followersResponse.data.followersCount);
                setFollowingCount(followingResponse.data.followingCount);
                setTotalContentCount(contentCountResponse.data.totalCount);
                setIsFollowing(followStateResponse.data.isFollowing);
            } catch (error) {
                console.error('Error fetching user counts:', error);
            }
        };

        const fetchUserContent = async () => {
            try {
                const postsResponse = await axios.get(`http://127.0.0.1:9889/get-posts-by-username`, { params: { username } });
                console.log('Posts Response:', postsResponse.data); // Debugging log

                setPosts(postsResponse.data.posts);

                const reelsResponse = await axios.get(`http://127.0.0.1:9889/get-reels-by-username`, { params: { username } });
                setReels(reelsResponse.data.reels.map(reel => ({ ...reel, isLiked: false, likes: reel.likes || 0 })));

                const videosResponse = await axios.get(`http://127.0.0.1:9889/get-videos-by-username`, { params: { username } });

                setVideos(videosResponse.data.videos.map(video => ({ ...video, isLiked: false, likes: video.likes || 0 })));

            } catch (error) {
                console.error('Error fetching user content:', error);
            }
        };

        fetchProfileData();
        fetchUserCounts();
        fetchUserContent();
    }, [username]);

    const handleFollow = async () => {
        try {
            await axios.post('http://127.0.0.1:9889/follow', {
                follower: localStorage.getItem('username'),
                followed: username,
            });
            setIsFollowing(!isFollowing);
            setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };

    return (
        // < >

        <div className='userprofile-body' >
            <div className={show ? 'space-toggle' : null} style={{ height: "100vh", width: "100%", display: "flex" }}>
                <section className='home-body-nav'>
                    <div className='home-body-nav-1'>
                        <div className='home-body-nav-1-1'>
                            <div className='home-body-dp'>
                                <img src={profileImage} alt="" className='home-profile-pic-div' />
                            </div>
                        </div>
                        <div className='home-body-nav-1-2'>
                            {username}
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

                <section className='userprofile-mainbody'>
                    <div className='userprofile-mainbody-1'>
                        <div className='userprofile-mainbody-1-1'>
                            <div className='userprofile-mainbody-1-1-dp'>
                                <img src={profileImage} alt="User Profile" style={{ height: "100%", width: "100%", borderRadius: "50%" }} />
                            </div>
                        </div>
                        <div className='userprofile-mainbody-1-2'>
                            <div className='userprofile-mainbody-1-2-1'>
                                <div className='userprofile-mainbody-1-2-1-2'>
                                    <p>{username}</p>
                                </div>
                                <div className='userprofile-mainbody-1-2-1-1'>
                                    <button onClick={handleFollow} className='userprofilefollowbtn'>
                                        {isFollowing ? 'Unfollow' : 'Follow'}
                                    </button>
                                </div>
                                <div className='userprofile-mainbody-1-2-1-1'>
                                    <button className='userprofilefollowbtn'>Messgae</button>
                                </div>
                                <div className='userprofile-mainbody-1-2-1-3'>
                                    <IoIosMore />
                                </div>
                            </div>

                            <div className='userprofile-mainbody-1-2-2'>
                                <div className='userprofile-mainbody-1-2-2-1'>
                                    <div className='userprofile-mainbody-1-2-2-1-1'>
                                        <div className="userprofile-mainbody-1-2-2-1-1-inner">
                                            {totalContentCount}
                                        </div>
                                        <div className="userprofile-mainbody-1-2-2-1-1-inner">
                                            Posts
                                        </div>
                                    </div>
                                </div>
                                <div className='userprofile-mainbody-1-2-2-1'>
                                    <div className='userprofile-mainbody-1-2-2-1-1'>
                                        <div className="userprofile-mainbody-1-2-2-1-1-inner">
                                            {followersCount}
                                        </div>
                                        <div className="userprofile-mainbody-1-2-2-1-1-inner">
                                            Followers
                                        </div>
                                    </div>
                                </div>
                                <div className='userprofile-mainbody-1-2-2-1'>
                                    <div className='userprofile-mainbody-1-2-2-1-1'>
                                        <div className="userprofile-mainbody-1-2-2-1-1-inner">
                                            {followingCount}
                                        </div>
                                        <div className="userprofile-mainbody-1-2-2-1-1-inner">
                                            Following
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="userprofile-mainbody-2">
                        <div className="userprofile-mainbody-2-1">
                            {name}
                        </div>
                        <div className="userprofile-mainbody-2-2">
                            {bio}
                        </div>
                        <div className="userprofile-mainbody-2-3">
                            https://lletsloot.com
                        </div>
                    </div>

                    <div className='userprofile-mainbody-3'>
                        <Tabs className="c-h-e-p" >
                            <TabList className="c-h-e-1-p" >
                                <Tab className="c-h-e-1-1-p"> Post</Tab>
                                <Tab className="c-h-e-1-1-p">Reels</Tab>
                                <Tab className="c-h-e-1-1-p">Videos</Tab>
                                <Tab className="c-h-e-1-1-p">Playlist</Tab>
                                <Tab className="c-h-e-1-1-p">Live</Tab>
                            </TabList>
                            <TabPanel>

                                {activeTab === 'posts' && (
                                    <div className='profileuserspost'>
                                        {

                                            posts.length > 0 ? (
                                                posts.map(post => (
                                                    <div className='profileuserspost-1' style={{ display: 'flex' }}>

                                                        <div key={post.id} className="post">
                                                            <img src={`data:image/jpeg;base64,${post.post_image}`} alt="Post" className="post-image" style={{ height: "100%", width: "100%" }} onClick={(e) => navigate(`/post/${post.id}`)} />
                                                        </div>

                                                    </div>
                                                ))
                                            ) : (
                                                <p>No posts available.</p>
                                            )

                                        }
                                    </div>
                                )}


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
                                playlist
                            </TabPanel>
                            <TabPanel>
                                live
                            </TabPanel>

                        </Tabs>
                    </div>
                </section>
                <section className='userprofile-submainbody'>


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
                    <div className='submain-profile-div1-3'>

                        <div className='submain-profile-div1-3-1'>

                            <div className='submain-profile-div1-3-1-1'>
                                <ul style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
                                    {usernames
                                        .filter(user => user.username !== username) // Filter out the locally stored username
                                        .map((user, index) => (
                                            <li key={index} >
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
                                            </li>
                                        ))}
                                </ul>
                            </div>

                        </div>

                    </div>
                    <div className='ubmain-profile-div-2-0'>
                        Videos
                    </div>

                    <div className='submain-profile-div1-4'>

                        <div className='submain-profile-div1-4-1'>
                            {videos.map(video => (
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

        </div>

        // <main className={show ? 'space-toggle' : null}>

        //     <div className='contentfeed'>
        //         <div className="explorediv1">
        //             <div className='body-profile'>
        //                 <section className="profilehead">
        //                     <div className="profilehead1">
        //                         <div className='header-toggle1' onClick={() => setShow(!show)}>
        //                             <i className={`fa-solid fa-arrow-right ${show ? 'fa-solid fa-xmark' : null}`}></i>
        //                         </div>
        //                         <div className="profileid">
        //                             <p>{username}</p>
        //                         </div>
        //                     </div>
        //                     <div className="profilehead2">
        //                         <button onClick={handleFollow}>
        //                             {isFollowing ? 'Unfollow' : 'Follow'}
        //                         </button>
        //                     </div>
        //                 </section>
        //                 <section className="acountinfo">
        //                     <div className="acountdp">
        //                         <img className='dp' src={profileImage} alt="User Profile" style={{ height: 100, width: 100, borderRadius: 50 }} />
        //                     </div>
        //                     <div className="acountdetails">
        //                         <div className="profilrpost">
        //                             <div className="postpart1">
        //                                 <h2>{totalContentCount}</h2>
        //                             </div>
        //                             <div className="postpart2">
        //                                 <p>Posts</p>
        //                             </div>
        //                         </div>
        //                         <div className="profilefollowers">
        //                             <div className="postpart1">
        //                                 <h2>{followersCount}</h2>
        //                             </div>
        //                             <div className="postpart2">
        //                                 <p                    >Followers</p>
        //                             </div>
        //                         </div>
        //                         <div className="profilefollowing">
        //                             <div className="postpart1">
        //                                 <h2>{followingCount}</h2>
        //                             </div>
        //                             <div className="postpart2">
        //                                 <p>Following</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </section>
        //                 <section className="profilebio">
        //                     <div className="bio" style={{ width: 500, height: 50, fontSize: 15 }}>
        //                         <p>{name}</p>
        //                         <p>{bio}</p>
        //                     </div>
        //                 </section>
        //                 <section className="user-content">
        //                     <div className="tabs">
        //                         <button className={activeTab === 'posts' ? 'active' : ''} onClick={() => setActiveTab('posts')}>Posts</button>
        //                         <button className={activeTab === 'reels' ? 'active' : ''} onClick={() => setActiveTab('reels')}>Reels</button>
        //                         <button className={activeTab === 'videos' ? 'active' : ''} onClick={() => setActiveTab('videos')}>Videos</button>
        //                     </div>
        //                     <div className="tab-content">
        //                         {activeTab === 'posts' && (
        //                             <div className="posts" style={{ display: 'flex' }}>

        //                                 {posts.length > 0 ? (
        //                                     posts.map(post => (
        //                                         <div key={post.id} className="post">
        //                                             <img src={`data:image/jpeg;base64,${post.post_image}`} alt="Post" className="post-image" style={{ height: 100, width: 100 }} onClick={(e) => navigate(`/post/${post.id}`)} />
        //                                             <div className="post-details">
        //                                                 <div className="post-actions">


        //                                                 </div>

        //                                             </div>
        //                                         </div>
        //                                     ))
        //                                 ) : (
        //                                     <p>No posts available.</p>
        //                                 )}
        //                             </div>
        //                         )}
        //                         {activeTab === 'reels' && (
        //                             <div className="reels">

        //                                 {reels.map(reel => (
        //                                     <div key={reel.id} className="reel-item" onClick={(e) => navigate(`/reel/${reel.id}`)}>

        //                                         <video controls style={{ height: 100, width: 100 }}>
        //                                             <source src={`data:video/mp4;base64,${reel.reel}`} type="video/mp4" />
        //                                         </video>
        //                                     </div>
        //                                 ))}


        //                             </div>
        //                         )}
        //                         {activeTab === 'videos' && (
        //                             <div className="videos">
        //                                 {videos.map((video) => (
        //                                     <div key={video.id} className="video-item">

        //                                         {/* Displaying thumbnail if available, otherwise the video itself */}
        //                                         {video.thumbnail ? (
        //                                             <img src={`data:image/jpeg;base64,${video.thumbnail}`} alt="Thumbnail" style={{ height: 100, width: 100 }} onClick={(e) => navigate(`/video/${video.id}`)} />
        //                                         ) : (
        //                                             <video controls style={{ height: 100, width: 100 }}>
        //                                                 <source src={`data:video/mp4;base64,${video.video}`} type="video/mp4" onClick={(e) => navigate(`/video/${video.id}`)} />
        //                                                 Your browser does not support the video tag.
        //                                             </video>
        //                                         )}



        //                                     </div>
        //                                 ))}

        //                             </div>
        //                         )}
        //                     </div>
        //                 </section>
        //             </div>
        //         </div>
        //     </div>
        // </main>
        // </>
    );
};

export default UserProfile;