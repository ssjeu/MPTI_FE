// 하단 네비게이션바
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ReactComponent as Home } from "../images/footer/home.svg";
import { ReactComponent as Community } from "../images/footer/people.svg";
import { ReactComponent as Chat } from "../images/footer/chat-bubble-outline.svg";
import { ReactComponent as Mypage } from "../images/footer/person.svg";

const Footer = () => {
  const navigate = useNavigate();

  // 현재 선택된 아이콘
  const [activeNav, setActiveNav] = useState(0);

  // 하단 탭 없는 페이지 설정
  const location = useLocation().pathname;
  if (location === "/login") return null;
  else if (location === "/join") return null;
  else if (location === "/info") return null;

  return (
    <FooterWrap>
      <FooterMenu>
        <Home
          className="icons"
          style={{ fill: activeNav === 0 ? "#64be72" : "#adadad" }}
          onClick={() => {
            setActiveNav(0);
            navigate("/");
          }}
        />
        <Community
          className="icons"
          onClick={() => {
            setActiveNav(1);
            navigate("/community");
          }}
          style={{ fill: activeNav === 1 ? "#64be72" : "#adadad" }}
        />
        <Chat
          className="icons"
          style={{ fill: activeNav === 2 ? "#64be72" : "#adadad" }}
          onClick={() => {
            setActiveNav(2);
          }}
        />
        <Mypage
          className="icons"
          style={{ fill: activeNav === 3 ? "#64be72" : "#adadad" }}
          onClick={() => {
            setActiveNav(3);
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  box-shadow: 0 0 1px 0 var(--gray4);
  z-index: 1;
`;

const FooterMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-tap-highlight-color: transparent !important;

  .icons {
    width: 20px;
    padding: 15px 10px;
    margin: 0 20px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Footer;
