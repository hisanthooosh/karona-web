import React, { useState } from 'react'
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
import axios from 'axios';
import { useEffect } from 'react'
import "../Static/Css/Message.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import ChatRoom from './ChatRoom'



const Message = () => {

    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);
    const navigate = useNavigate('');
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [chatrooms, setChatrooms] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [isModalmesOpen, setIsModalmesOpen] = useState(false);
    const [selectedChatroom, setSelectedChatroom] = useState(null);


    const handleModalmesOpen = (username) => {
        setSelectedChatroom(username);
        setIsModalmesOpen(true);
    };
    const handleModalmesClose = () => {
        setIsModalmesOpen(false);
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
    const fetchUsername = () => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            console.error('Username not found in localStorage');
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

    useEffect(() => {
        fetchUsers();
        fetchChatrooms();
        const interval = setInterval(fetchNewMessages, 5000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9889/get-all-usernames');
            setUsers(response.data.user_profiles || []); // Ensure users or an empty array
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchChatrooms = async () => {
        try {
            const username = localStorage.getItem('username'); // Get current username
            const response = await axios.get(`http://localhost:9889/chatrooms/${username}`);
            setChatrooms(response.data.chatrooms || []); // Ensure chatrooms or an empty array
        } catch (error) {
            console.error('Error fetching chatrooms:', error);
        }
    };

    const fetchNewMessages = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.get(`http://localhost:9889/messages/${username}`);
            setNewMessages(response.data.messages || []); // Ensure messages or an empty array
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const handleCreateGroup = async () => {
        try {
            const response = await axios.post('http://localhost:9889/create-group', {
                groupName,
                groupMembers: selectedUsers
            });
            console.log('Group created:', response.data);
            // Reset modal state after successful creation
            setGroupName('');
            setSelectedUsers([]);
            setShowModal(false);
            fetchChatrooms(); // Refresh chatrooms after creating a group
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleUserClick = (username) => {
        // Add or remove user from selectedUsers list
        if (selectedUsers.includes(username)) {
            setSelectedUsers(selectedUsers.filter(user => user !== username));
        } else {
            setSelectedUsers([...selectedUsers, username]);
        }
    };

    const renderGroupProfilePics = (members) => {
        return members.map(member => {
            const user = users.find(user => user.username === member);
            if (user && user.profile_pic) {
                return (
                    <img
                        key={member}
                        src={`data:image/jpeg;base64,${user.profile_pic}`}
                        alt={member}
                        className="group-member-pic"
                        style={{ height: 30, width: 30, borderRadius: '50%' }}
                    />
                );
            } else {
                return null; // Handle case where user or profile_pic is undefined
            }
        });
    };


    return (

        <div className='home-body'>

            {showModal && (
                <div className="modal-group">
                    <div className="modal-content-group">

                        <div className='modal-content-group-1'>
                            <div className='modal-content-group-1-1'>
                                <h3>Create Group</h3>
                            </div>
                            <div className='modal-content-group-1-2' onClick={toggleModal}>
                                X
                            </div>
                        </div>


                        <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }}>
                            <div className='modal-content-group-1'>
                                <input type="text" placeholder='Group name' value={groupName} className='input-group-name' onChange={(e) => setGroupName(e.target.value)} />
                            </div>

                            <h4>Select Members:</h4>
                            <ul className="user-list-group">
                                {users.map(user => (
                                    <li key={user.username} className="user-group">


                                        <label className='user-group001'>
                                            <div className="user-group001-1">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.username)}
                                                    onChange={() => handleUserClick(user.username)}
                                                />
                                            </div>
                                            <div className="user-group001-2">
                                                {user.profile_pic && (
                                                    <img src={`data:image/jpeg;base64,${user.profile_pic}`} alt={user.username} style={{ height: 50, width: 50, borderRadius: '50%' }} />
                                                )}
                                            </div>
                                            <div className="user-group001-3">
                                                {user.username}
                                            </div>
                                        </label>

                                    </li>
                                ))}
                            </ul>
                            <button type="submit">Create Group</button>
                        </form>
                    </div>
                </div>
            )}





            <section className='home-body-nav'>
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
                    <div className='home-body-nav-1-1-home'>
                        <FiSend />
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
            <section className='message-section1'>
                <div className='message-section1-1'>
                    <div className='message-section1-1-inner'>
                        <div className='message-section1-1-inner-1'>
                            <IoMdArrowRoundBack />
                        </div>
                        <div className='message-section1-1-inner-2'>
                            {username}<FaAngleDown />
                        </div>
                        <div className='message-section1-1-inner-3'>
                            <FaPenToSquare onClick={toggleModal} />
                        </div>
                    </div>
                </div>
                <div className='message-section1-2'>
                    <div className='message-section1-2-inner'>
                        Search...
                    </div>
                </div>
                <div className='message-section1-3'>

                </div>
                <div className='message-section1-4'>
                    <div className='message-section1-4-inner'>
                        <div className='message-section1-4-inner-1'>
                            Message
                        </div>
                        <div className='message-section1-4-inner-2'>
                            Request
                        </div>
                    </div>
                </div>
                <div className='message-section1-5'>
                    <ul className="user-list">
                        {users.map(user => (
                            <li key={user.username} className="user">
                                <div className='message-section1-5-1'>

                                    <div className='message-section1-5-1-1'>
                                        <div className='message-section1-5-1-1-dp'>

                                            <Link to={`/chatroom/${user.username}`}>
                                                {user.profile_pic && (
                                                    <img src={`data:image/jpeg;base64,${user.profile_pic}`} alt={user.username} style={{ height: "100%", width: "100%", borderRadius: '50%' }} />
                                                )}

                                            </Link>

                                        </div>
                                    </div>
                                    <div className='message-section1-5-1-2' onClick={() => handleModalmesOpen(user.username)}>
                                        <div className='message-section1-5-1-2-1'>
                                            {user.username}
                                        </div>
                                        <div className='message-section1-5-1-2-2'>
                                            message . 2min
                                        </div>
                                    </div>

                                    {/* {showModal && (
                                        <div className="modal-group">
                                            <div className="modal-content-group">
                                                <span className="close-group" onClick={toggleModal}>×</span>
                                                <h3>Create Group</h3>
                                                <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }}>
                                                    <label htmlFor="groupName">Group Name:</label>
                                                    <input
                                                        type="text"
                                                        id="groupName"
                                                        value={groupName}
                                                        onChange={(e) => setGroupName(e.target.value)}
                                                    />
                                                    <h4>Select Members:</h4>
                                                    <ul className="user-list-group">
                                                        {users.map(user => (
                                                            <li key={user.username} className="user-group">
                                                                <label>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedUsers.includes(user.username)}
                                                                        onChange={() => handleUserClick(user.username)}
                                                                    />
                                                                    {user.profile_pic && (
                                                                        <img src={`data:image/jpeg;base64,${user.profile_pic}`} alt={user.username} style={{ height: 50, width: 50, borderRadius: '50%' }} />
                                                                    )}
                                                                    <span>{user.username}</span>
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <button type="submit">Create Group</button>
                                                </form>
                                            </div>
                                        </div>
                                    )} */}
                                    {selectedUsers.length > 0 && (
                                        <div className="group-profile-pics">
                                            <h3>Group Members:</h3>
                                            {renderGroupProfilePics(selectedUsers)}
                                        </div>
                                    )}
                                    <ul className="chatroom-list">
                                        {chatrooms.map(chatroom => (
                                            <li key={chatroom.id} className="chatroom">
                                                <Link to={`/chatroom/${chatroom.id}`}>
                                                    {chatroom.is_group && (
                                                        <div className="group-profile-pics-small">
                                                            {renderGroupProfilePics(chatroom.members)}
                                                        </div>
                                                    )}
                                                    <h4>{chatroom.name}</h4>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            {isModalmesOpen && selectedChatroom && (
               


                <div className="modalmessageoo1">
                    <div className="modalmessageoo1-1">
                        <span className="closemessgae" onClick={() => handleModalmesClose(false)}> <p>X</p> </span>
                        <ChatRoom username={selectedChatroom} />
                    </div>
                </div>
            )}

        </div>

    )
}

export default Message
