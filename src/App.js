import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Defpage from './Project/Templets/Defpage';
import Signup from './Project/Templets/Signup';
import Reg from './Project/Templets/Reg';
import Login from './Project/Templets/Login';
import Forgotpassword from './Project/Templets/Forgotpassword';
import Recoverphone from './Project/Templets/Recoverphone';
import Recoveremail from './Project/Templets/Recoveremail';
import Changepassword from './Project/Templets/Changepassword';
import Home from './Project/Templets/Home';
import Reels from './Project/Templets/Reels';
import Message from './Project/Templets/Message';
import Trending from './Project/Templets/Trending';
import Saved from './Project/Templets/Saved';
import History from './Project/Templets/History';
import Profile from './Project/Templets/Profile';
import Settings from './Project/Templets/Settings';
import Editprofile from './Project/Templets/Editprofile';
import Upost from './Project/Templets/Upost';
import Ureels from './Project/Templets/Ureels';
import Uvideo from './Project/Templets/Uvideo';
import Ulive from './Project/Templets/Ulive';
import Post from './Project/Templets/Post';
import Postall from './Project/Templets/Postall';
import ContentDetailsPage from './Project/Templets/ContentDetailsPage';
import Reel from './Project/Templets/Reel';
import Otherprofile from './Project/Templets/Otherprofile';
import Video from './Project/Templets/Video';
import Register_page from './Project/Templets/Register_page';
import Register_phone from './Project/Templets/Register_phone';
import Forgetpasswordone from './Project/Templets/Forgetpasswordone';
import Rp_phone from './Project/Templets/Rp_phone';
import Rp_email from './Project/Templets/Rp_email';
import Newchpass from './Project/Templets/Newchpass';
import ChatRoom from './Project/Templets/ChatRoom';
import UserProfile from './Project/Templets/UserProfile';
import UploadShareModal from './Project/Templets/UploadShareModal';
import ViewSharesModal from './Project/Templets/ViewSharesModal';
import BuyShareModal from './Project/Templets/BuyShareModal';
import PortfolioModal from './Project/Templets/PortfolioModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Defpage />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Reg" element={<Reg />} />
        <Route path="Register_page" element={<Register_page />} />
        <Route path="Login" element={<Login />} />
        <Route path="Forgetpasswordone" element={<Forgetpasswordone />} />
        <Route path="Recoverphone" element={<Recoverphone />} />
        <Route path="Rp_phone" element={<Rp_phone />} />
        <Route path="Register_phone" element={<Register_phone />} />
        <Route path="Recoveremail" element={<Recoveremail />} />
        <Route path="Rp_email" element={<Rp_email />} />
        <Route path="Changepassword" element={<Changepassword />} />
        <Route path="Newchpass" element={<Newchpass />} />
        <Route path="Home" element={<Home />} />
        <Route path="Reels" element={<Reels />} />
        <Route path="Message" element={<Message />} />
        <Route path="Trending" element={<Trending />} />
        <Route path="Saved" element={<Saved />} />
        <Route path="History" element={<History />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="Editprofile" element={<Editprofile />} />
        <Route path="Upost" element={<Upost />} />
        <Route path="Ureels" element={<Ureels />} />
        <Route path="Uvideo" element={<Uvideo />} />
        <Route path="Ulive" element={<Ulive />} />
        <Route path="Post/:postId" element={<Post />} />
        <Route path="Postall/:content_id/:content_type" element={<Postall />} />
        <Route path="/content-details/:content_id/:content_type" element={< ContentDetailsPage />} />
        <Route path="reel/:reelId" element={< Reel />} />
        <Route path="Otherprofile" element={< Otherprofile />} />
        <Route path="Video/:videoId" element={< Video />} />
        <Route path='/chatroom/:username' element={< ChatRoom />} />
        <Route path="/userprofile/:username" element={< UserProfile />} />
        <Route path='/UploadShareModal' element={<UploadShareModal/>} />

         <Route path='/ViewShareModal' element= {< ViewSharesModal/>}/>

         <Route path='/BuyShareModal' element = {<BuyShareModal/>} />

         <Route path="/portfolio/:username" element={<PortfolioModal />} />
      </Routes>
    </Router>
  );
}

export default App;
