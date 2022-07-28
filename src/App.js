import './css/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import MBTITest from './pages/MBTITest';
import MBTITestMain from './pages/MBTITestMain';
import MbtiFriends from './pages/MbtiFriends';
import MbtiFilter from './pages/MbtiFilter';
import ChatProfile from './pages/ChatProfile';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import Community from './pages/Community';
import CommunityNotice from './pages/CommunityNotice';
import PostDetail from './pages/PostDetail';
import PostWrite from './pages/PostWrite';
import PostUpdate from './pages/PostUpdate';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserInfo from './pages/UserInfo';
import KakaoLogin from './components/KakaoLogin';
import Mypage from './pages/Mypage';
import UserInfoChange from './pages/UserInfoChange';
import Myprofile from './pages/Myprofile';

function App() {

  return (
    <div className='App'>
      <div className='wrap'>
        <Header />
        <Routes>
          <Route path='/' exact element={<Main />} />
          <Route path='/test' exact element={<MBTITestMain />} />
          <Route path='/test/mbti' exact element={<MBTITest />} />
          <Route path='/mbtifriends' element={<MbtiFriends />} />
          <Route path='/mbtifilter' element={<MbtiFilter />} />
          <Route path='/chatprofile' exact element={<ChatProfile />} />
          <Route path='/chat' exact element={<Chat />} />
          <Route path='/chatlist' exact element={<ChatList />} />
          <Route path='/community' exact element={<Community />} />
          <Route path='/community/notice' exact element={<CommunityNotice />} />
          <Route path='/posts/:index' element={<PostDetail />} />
          <Route path='/postwrite' exact element={<PostWrite />} />
          <Route path='/posts/:index/update' exact element={<PostUpdate />} />
          <Route path='/my' element={<Mypage />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/join' element={<SignUp />} />
          <Route path='/info' element={<UserInfo />} />
          <Route path='/info/change' element={<UserInfoChange />} />
          <Route path='/my/profile' element={<Myprofile />} />
          <Route path='/api/kakao/callback' element={<KakaoLogin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
