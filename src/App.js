import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Community from "./pages/Community";
import PostWrite from "./pages/PostWrite";
import PostDetail from "./pages/PostDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";
import KakaoLogin from "./components/KakaoLogin";

function App() {
  const test = useSelector((state) => state);
  console.log(test);
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path='/' element={<Main />} />
        <Route path="/community" exact element={<Community />} />
        <Route path="/postwrite" exact element={<PostWrite />} />
        <Route path="/posts/:index" element={<PostDetail />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/join' element={<SignUp />} />
        <Route path='/info' element={<UserInfo />} />
        <Route path='/api/kakao/callback' element={<KakaoLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
