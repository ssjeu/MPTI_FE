import "./css/App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Main from "./pages/Main";
import ChatProfile from "./pages/ChatProfile";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import Community from "./pages/Community";
import PostDetail from "./pages/PostDetail";
import PostWrite from "./pages/PostWrite";
import PostUpdate from "./pages/PostUpdate";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";
import KakaoLogin from "./components/KakaoLogin";
import { Header } from "./components/Header";
import Mypage from './pages/Mypage';

function App() {
  //   const test = useSelector((state) => state);
  //   console.log(test);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chatprofile" exact element={<ChatProfile />} />
        <Route path="/chat" exact element={<Chat />} />
        <Route path="/chatlist" exact element={<ChatList />} />
        <Route path="/community" exact element={<Community />} />
        <Route path="/posts/:index" element={<PostDetail />} />
        <Route path="/postwrite" exact element={<PostWrite />} />
        <Route path="/posts/:index/update" exact element={<PostUpdate />} />
        <Route path='/my' element={<Mypage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/join" element={<SignUp />} />
        <Route path="/info" element={<UserInfo />} />
        <Route path="/api/kakao/callback" element={<KakaoLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
