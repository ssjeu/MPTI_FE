import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserInfo from './pages/UserInfo';
import './css/font.css';
import Main from './pages/Main';

import { useSelector } from 'react-redux';
import KakaoLogin from './components/KakaoLogin';
import React from 'react';

function App() {
  const test = useSelector((state) => state);
  console.log(test);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/join' element={<SignUp />} />
        <Route path='/info' element={<UserInfo />} />
        <Route path='/api/kakao/callback' element={<KakaoLogin />} />
      </Routes>
    </div>
  );
}

export default App;
