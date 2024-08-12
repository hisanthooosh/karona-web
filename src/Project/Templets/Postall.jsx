import React, { useRef, useState, useCallback } from 'react'
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
import { formatDistanceToNow } from 'date-fns'


const Postall = () => {
  const navigate = useNavigate('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const containerRef = useRef(null)
  const [showOptions, setShowOptions] = useState({});
  const [isbioSectionOpen, setbioSectionOpen] = useState(false);
  const [iscommentSectionOpen, setcommentSectionOpen] = useState(false);
  const { content_id, content_type } = useParams();
  const [selectedContent, setSelectedContent] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);
  const contentRefs = useRef([]);
  const observer = useRef(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const currentUser = localStorage.getItem('username');
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


  useEffect(() => {
    if (selectedContent) {
      fetchProfileImages([selectedContent, ...relatedContent]);
    }
  }, [selectedContent, relatedContent]);

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

  const handleShare = (content_id, content_type) => {

    const shareType = content_type === 'Post' ? 'Post' : 'Reel'; // Determine the type of content being shared
    const shareUrl = `${window.location.origin}/content-details/${content_id}/${content_type}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(` ${shareType} link copied to clipboard!`); // Include content type in the alert message
    }, (err) => {
      console.error('Error copying text: ', err);
    });
  };



  useEffect(() => {
    // Fetch selected content
    const fetchSelectedContent = async () => {
      try {
        const response = await axios.get(`http://localhost:9889/get-content/${content_id}/${content_type}`);
        const contentData = response.data;
        const likesResponse = await axios.post('http://localhost:9889/likes/status', {
          content_ids: [content_id]
        });
        const commentsResponse = await axios.get(`http://localhost:9889/comments/${content_type}/${content_id}`);

        setSelectedContent({
          ...contentData
        });

      } catch (error) {
        console.error('Error fetching selected content', error);
      }
    };

    // Fetch related content
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
          ...item
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


  const renderContentItem = (item, index, isSelected = false) => (
    <div key={item.content_id} className='content-item' style={{ margin: '20px', padding: '10px', border: '2px solid black', position: 'relative' }}>
      <div className="content-details">
        {profileImages[item.username] ? (
          <img src={profileImages[item.username]} alt={`Profile of ${item.username}`} style={{ height: 50, width: 50, borderRadius: '50%' }} />
        ) : (
          <div>No profile image available</div>
        )}
        <div className="username" style={{ position: 'absolute', top: 10, left: 10, color: 'red', zIndex: 1 }}>{'@' + item.username}</div>
        <div className="title">{item.title}</div>
        <div className="description">{item.description}</div>
        <div className="date">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</div>
        {item.content_type === 'Post' && (
          <div>
            <img src={`data:image/png;base64,${item.post_image}`} alt="Post" style={{ height: 100, width: 100 }} />


            <div className='options-button' onClick={(e) => { e.preventDefault(); toggleOptions(item.content_id); }}>
              <i className="fas fa-ellipsis-h"></i>
            </div>
            {renderOptionsMenu(item.content_id, item.content_type)}
          </div>
        )}
        {item.content_type === 'Reel' && (
          <div style={{ position: 'relative' }}>
            <video
              ref={el => contentRefs.current[index] = el}
              controls
              loop
              src={`data:video/mp4;base64,${item.reel}`}
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


  return (

    <div className='home-body'>
      <section className='home-body-nav'>
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
      <section className='home-body-body'>
        <div className='post-body'>


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
        <div className='submain-profile-div-2'>
          <div className='submain-profile-div-2-1'>
          </div>
        </div>
        <div className='submain-profile-div-3'>
          <div className='submain-profile-div-3-1'>
            <div className='submain-profile-div-3-1-i'>
            </div>
          </div>
          <div className='submain-profile-div-3-2'>
            <div className='submain-profile-div-3-2-i'>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Postall
