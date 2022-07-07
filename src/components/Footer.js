// 하단 네비게이션바
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Home from '../images/footer/home@3x.png';
import Community from '../images/footer/people@3x.png';
import Chat from '../images/footer/chat-bubble-outline@3x.png';
import Mypage from '../images/footer/person@3x.png';

const Footer = () => {
  const navigate = useNavigate();

  // 현재 선택된 아이콘
  const [activeNav, setActiveNav] = useState(1);

  const location = useLocation();
  if (location.pathname === '/login') return null;
  else if (location.pathname === '/join') return null;
  else if (location.pathname === '/info') return null;

  return (
    <FooterWrap>
      <FooterMenu>
        <img
          src={Home}
          alt='home'
          onClick={() => {
            setActiveNav(1);
            navigate('/');
          }}
        />
        <img
          src={Community}
          alt='community'
          onClick={() => {
            setActiveNav(2);
            navigate('/community');
          }}
        />
        <img
          src={Chat}
          alt='Chat'
          onClick={() => {
            setActiveNav(3);
          }}
        />
        <img
          src={Mypage}
          alt='Mypage'
          onClick={() => {
            setActiveNav(4);
          }}
        />
      </FooterMenu>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  background-color: white;
  width: 100%;
  height: 80px;
  display: table;
  align-items: center;
  position: fixed;
  bottom: 0;
  box-shadow: 0 0 1px 0 var(--gray4);
  z-index: 1;
`;

const FooterMenu = styled.div`
  display: table-cell;
  vertical-align: middle;

  & img {
    width: 20px;
    padding: 15px 15px;
    margin: 0 15px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Footer;
