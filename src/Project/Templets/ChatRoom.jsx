// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { formatDistanceToNow } from 'date-fns';

// const ChatRoom = ({ username }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [contentCache, setContentCache] = useState({});
//     const currentUsername = localStorage.getItem('username');
//     const navigate = useNavigate();

// const [profileImage, setProfileImage] = useState(null);
//     useEffect(() => {
//         fetchProfileImage();
//     }, [username]);

//     const fetchProfileImage = async () => {
//         try {
//             const response = await axios.get(`http://localhost:9889/profile/image/${username}, { responseType: 'arraybuffer' }`);
//             const base64Image = btoa(
//                 new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
//             );
//             setProfileImage(`data:image/jpeg;base64,${base64Image}`);
//         } catch (error) {
//             console.error('Error fetching profile image:', error);
//         }
//     };
//     useEffect(() => {
//         fetchMessages();
//         const interval = setInterval(fetchMessages, 5000);
//         return () => clearInterval(interval);
//     }, [username]);

//     const fetchMessages = async () => {
//         try {
//             const response = await axios.get(`http://localhost:9889/messages/${username}`, {
//                 params: { current_user: currentUsername }
//             });
//             const processedMessages = response.data.messages.map(message => {
//                 if (['Post', 'Reel', 'Video'].includes(message.content_type)) {
//                     const match = message.content.match(/\/contentdetails\/(\d+)\/(\w+)/);
//                     if (match) {
//                         const [, contentId, contentType] = match;
//                         return { ...message, contentId, contentType };
//                     }
//                 }
//                 return message;
//             });
//             setMessages(processedMessages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     const handleSendMessage = async () => {
//         if (newMessage.trim() === '') return;

//         try {
//             const response = await axios.post('http://localhost:9889/messages', {
//                 chatroom_id: username,
//                 sender_id: currentUsername,
//                 receiver_id: username,
//                 content: newMessage,
//                 content_type: 'text'
//             });
//             setNewMessage('');
//             fetchMessages();
//             console.log(response)
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     const handleContentClick = (contentId, contentType) => {
//         navigate(`/content-details/${contentId}/${contentType}`);
//     };

//     const fetchContentData = async (contentId, contentType) => {
//         if (contentCache[`${contentId}-${contentType}`]) {
//             return contentCache[`${contentId}-${contentType}`];
//         }
//         try {
//             const response = await axios.get(`http://localhost:9889/get-content/${contentId}/${contentType}`);
//             const contentData = response.data;
//             setContentCache(prevCache => ({
//                 ...prevCache,
//                 [`${contentId}-${contentType}`]: contentData
//             }));
//             return contentData;
//         } catch (error) {
//             console.error('Error fetching content:', error);
//             return null;
//         }
//     };

//     const renderContent = (message) => {
//         const contentData = contentCache[`${message.contentId}-${message.contentType}`];
//         if (!contentData) {
//             fetchContentData(message.contentId, message.contentType).then(fetchedData => {
//                 if (fetchedData) {
//                     setContentCache(prevCache => ({
//                         ...prevCache,
//                         [`${message.contentId}-${message.contentType}`]: fetchedData
//                     }));
//                 }
//             });
//             return <p>Loading content...</p>;
//         }
//         return (
//             <div key={message.id} onClick={() => handleContentClick(message.contentId, message.contentType)}>

//                 {contentData.post_image && (
//                     <img src={`data:image/png;base64,${contentData.post_image}`} alt="Post" style={{ height: 100, width: 100 }} />
//                 )}
//                 {contentData.reel && (
//                     <video controls>
//                         <source src={`data:video/mp4;base64,${contentData.reel}`} type="video/mp4" />
//                     </video>
//                 )}
//                 {contentData.video && (
//                     <video controls>
//                         <source src={`data:video/mp4;base64,${contentData.video}`} type="video/mp4" />
//                     </video>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="chatroom-container">
//             <h2>Chatroom</h2>
//             {profileImage && <img src={profileImage} alt={`${username}'s profile`} style={{height:100,width:100,borderRadius:50}}/>}
//             <div className="messages">
//                 {messages && messages.map(message => (
//                     <div
//                         key={message.id}
//                         className={`message ${message.sender_id === currentUsername ? 'sent' : 'received'}`}
//                         style={{ alignSelf: message.sender_id === currentUsername ? 'flex-end' : 'flex-start' }}
//                     >
//                         {message.content_type === 'text' ? (
//                             <p>{message.content}</p>
//                         ) : (
//                             renderContent(message)
//                         )}
//                         {/* <small>{message.timestamp}</small> */}
//                         <small>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</small>
//                     </div>
//                 ))}
//             </div>
//             <div className="send-message">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type your message..."
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ChatRoom;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import "../Static/Css/Chatroom.css"

const ChatRoom = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [contentCache, setContentCache] = useState({});
    const currentUsername = localStorage.getItem('username');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {

        const fetchProfileImage = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/profile/image/${username}`, { responseType: 'arraybuffer' });
                const base64Image = btoa(
                    new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                setProfileImage(`data:image/jpeg;base64,${base64Image}`);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };
        fetchProfileImage();
    }, [username]);


    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [username]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:9889/messages/${username}`, {
                params: { current_user: currentUsername }
            });
            const processedMessages = response.data.messages.map(message => {
                if (['Post', 'Reel', 'Video'].includes(message.content_type)) {
                    const match = message.content.match(/\/contentdetails\/(\d+)\/(\w+)/);
                    if (match) {
                        const [, contentId, contentType] = match;
                        return { ...message, contentId, contentType };
                    }
                }
                return message;
            });
            setMessages(processedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const response = await axios.post('http://localhost:9889/messages', {
                chatroom_id: username,
                sender_id: currentUsername,
                receiver_id: username,
                content: newMessage,
                content_type: 'text'
            });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleContentClick = (contentId, contentType) => {
        navigate(`/content-details/${contentId}/${contentType}`);
    };

    const fetchContentData = async (contentId, contentType) => {
        if (contentCache[`${contentId}-${contentType}`]) {
            return contentCache[`${contentId}-${contentType}`];
        }
        try {
            const response = await axios.get(`http://localhost:9889/get-content/${contentId}/${contentType}`);
            const contentData = response.data;
            setContentCache(prevCache => ({
                ...prevCache,
                [`${contentId}-${contentType}`]: contentData
            }));
            return contentData;
        } catch (error) {
            console.error('Error fetching content:', error);
            return null;
        }
    };

    const renderContent = (message) => {
        const contentData = contentCache[`${message.contentId}-${message.contentType}`];
        if (!contentData) {
            fetchContentData(message.contentId, message.contentType);
            return <p>Loading content...</p>;
        }
        return (
            <div key={message.id} onClick={() => handleContentClick(message.contentId, message.contentType)}>
                {contentData.post_image && (
                    <img src={`data:image/png;base64,${contentData.post_image}`} alt="Post" style={{ height: 100, width: 100 }} />
                )}
                {contentData.reel && (
                    <video controls style={{ height: 100, width: 100 }}>
                        <source src={`data:video/mp4;base64,${contentData.reel}`} type="video/mp4" />
                    </video>
                )}
                {contentData.video && (
                    <video controls style={{ height: 100, width: 100 }}>
                        <source src={`data:video/mp4;base64,${contentData.video}`} type="video/mp4" />
                    </video>
                )}
            </div>
        );
    };

    return (
        <div className="chatroom-container">
            
            {profileImage && <img src={profileImage} alt={`${username}'s profile`} style={{ height: 100, width: 100, borderRadius: 50 }} />}
              <div className='username-message'>
                  {username}
              </div>
            <div className="messages">
                {messages && messages.map(message => (
                    <div
                        key={message.id}
                        className={`message ${message.sender_id === currentUsername ? 'sent' : 'received'}`}
                        style={{ alignSelf: message.sender_id === currentUsername ? 'flex-end' : 'flex-start' }}
                    >
                        {message.content_type === 'text' ? (
                            <p>{message.content}</p>
                        ) : (
                            renderContent(message)
                        )}
                        <small>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</small>
                    </div>
                ))}
            </div>
            <div className="send-message">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
