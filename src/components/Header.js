import React, { useState } from "react";
import styled from "styled-components";
import "../css/component.css";
import logo from "../images/logo/Group 14@2x.png";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Logo from "../images/logo@2x.png";
import Alarm from "../images/notifications-none@3x.png";
import Back from "../images/keyboard-arrow-left@3x.png";

export const UserInfoHeader = (props) => {
  const { margin } = props;

  return (
    <>
      <LogoStyle className="logo" src={logo} alt="" margin={margin} />
    </>
  );
};

export const Header = () => {
  const navigate = useNavigate();

  // 공통 헤더 없는 페이지 설정
  const location = useLocation().pathname;
  if (location === "/login") return null;
  else if (location === "/join") return null;
  else if (location === "/info") return null;

  const goBack = () => {
    if (location !== "/" && location !== "/community") navigate(-1);
  };

  return (
    <HeaderWrap className="container">
      <BackIcon
        onClick={goBack}
        className={
          location === "/" || location === "/community" ? "hide" : null
        }
      >
        <img src={Back} alt="logo" width="24px" />
      </BackIcon>
      <div>
        <img src={Logo} alt="logo" width="85px" />
      </div>
      <div>
        <img src={Alarm} alt="alarm" width="24px" />
      </div>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  background-color: white;
  margin: 58px 0 36px 0;
  display: flex;
  justify-content: space-between;
`;

const LogoStyle = styled.img`
  margin: ${(props) => props.margin};
`;

const BackIcon = styled.div.attrs((props) => ({
  className: props.className,
}))`
  &.hide {
    opacity: 0;
  }
`;

// 스크롤 고정시

// const HeaderWrap = styled.div`
//   position: fixed;
//   background-color: white;
//   width: 100%;
//   height: 40px;
//   padding-top: 60px;
//   display: flex;
//   justify-content: space-between;
// `;
