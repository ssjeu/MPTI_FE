// 하단 네비게이션바
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ReactComponent as Home } from "../images/footer/home.svg";
import { ReactComponent as Community } from "../images/footer/people.svg";
import { ReactComponent as Chat } from "../images/footer/chat-bubble-outline.svg";
import { ReactComponent as Mypage } from "../images/footer/person.svg";

const Footer = () => {
  //   const params = useParams();
  //   const id = params.index;
  //   console.log(id);
  //   const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  // 현재 선택된 아이콘
  //   const activeHome = "/";
  //   const activeCommunity = "/community";
  //   const activeChat = "/chatlist";
  //   const activeMypage = "/my";

  const [activeHome, setActiveHome] = useState("/");
  const [activeCommunity, setActiveCommunity] = useState([
    "/community",
    "/posts/:index",
  ]);
  const [activeChat, setActiveChat] = useState(["/chatlist", "/chat"]);
  const [activeMypage, setActiveMypage] = useState("/my");

  // 하단 탭 없는 페이지 설정
  if (location === "/login") return null;
  else if (location === "/join") return null;
  else if (location === "/info") return null;
  else if (location === "/info/change") return null;
  else if (location === "/chatprofile") return null;
  else if (location === "/my/profile") return null;
  else if (location === "/postwrite") return null;
  else if (location === "/mbtifilter") return null;
  else if (location === "/test") return null;
  else if (location === "/test/mbti") return null;
  else if (location === "/community/notice") return null;

  return (
    <FooterWrap>
      <FooterMenu>
        <Home
          className="icons"
          style={{ fill: location === activeHome ? "#64be72" : "#adadad" }}
          onClick={() => navigate("/")}
        />
        <Community
          className="icons"
          onClick={() => navigate("/community")}
          style={{
            fill:
              location === activeCommunity[0] || location === activeCommunity[1]
                ? "#64be72"
                : "#adadad",
          }}
        />
        <Chat
          className="icons"
          style={{
            fill:
              location === activeChat[0] || location === activeChat[1]
                ? "#64be72"
                : "#adadad",
          }}
          onClick={() => navigate("/chatlist")}
        />
        <Mypage
          className="icons"
          style={{ fill: location === activeMypage ? "#64be72" : "#adadad" }}
          onClick={() => navigate("/my")}
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
