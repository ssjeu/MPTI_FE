import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../css/component.css";
import logo from "../images/logo/Group 14@2x.png";
import Logo from "../images/header/logo@2x.png";
import Alarm from "../images/header/notifications-none@3x.png";
import Back from "../images/header/keyboard-arrow-left@3x.png";

// svg icons + logo
import { ReactComponent as LogoSvg } from "../images/logo/Group 15.svg";
import { ReactComponent as AlarmSvg } from "../images/icons/notifications_none.svg";

export const UserInfoHeader = (props) => {
  const { margin } = props;

  return (
    <>
      <LogoStyle className="logo" src={logo} alt="" margin={margin} />
    </>
  );
};

export const MypageHeader = (props) => {
  const { margin } = props;
  return (
    <>
      <MypageHeaderStyle margin={margin}>
        <LogoSvg />

        <div>
          <AlarmSvg />
        </div>
      </MypageHeaderStyle>
    </>
  );
};

const MypageHeaderStyle = styled.div`
  margin: ${(props) => props.margin};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 0 4.8%;

  position: relative;

  div {
    position: absolute;
    right: 4.8%;
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  // 공통 헤더 없는 페이지 설정
  if (location === "/info") return null;
  else if (location.pathname === "/info/change") return null;
  else if (location === "/my") return null;

  const goBack = () => {
    if (
      location !== "/" &&
      location !== "/community" &&
      location !== "/chatlist"
    )
      navigate(-1);
  };

  return (
    <HeaderWrap className="contents-container">
      <BackIcon
        onClick={goBack}
        className={
          location === "/" ||
          location === "/community" ||
          location === "/chatlist"
            ? "hide"
            : null
        }
      >
        <img src={Back} alt="logo" width="24px" />
      </BackIcon>
      <LogoIcon className={location === "/login" ? "hide" : null}>
        <img src={Logo} alt="logo" width="85px" />
      </LogoIcon>
      <AlarmIcon
        className={
          location === "/login" || location === "/join" ? "hide" : null
        }
      >
        <img src={Alarm} alt="alarm" width="24px" />
      </AlarmIcon>
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

const LogoIcon = styled.div.attrs((props) => ({
  className: props.className,
}))`
  &.hide {
    opacity: 0;
  }
`;

const AlarmIcon = styled.div.attrs((props) => ({
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
