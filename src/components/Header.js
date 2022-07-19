import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import "../css/component.css";
import Logo from "../images/header/logo@2x.png";

// svg icons + logo
import { ReactComponent as BackSvg } from "../images/header/keyboard-arrow-left.svg";
import { ReactComponent as LogoSvg } from "../images/logo/Group 15.svg";
import { ReactComponent as AlarmSvg } from "../images/header/notifications_none.svg";
import { ReactComponent as CloseSvg } from "../images/header/close.svg";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const goBack = () => {
    if (
      location !== "/" &&
      location !== "/community" &&
      location !== "/chatlist"
    )
      navigate(-1);
  };

  const close = () => {
    navigate(-1);
  };

  return (
    <HeaderWrap className="contents-container">
      <BackIcon
        onClick={goBack}
        className={
          location === "/" ||
          location === "/community" ||
          location === "/login" ||
          location === "/join" ||
          location === "/info" ||
          location === "/info/change" ||
          location === "/my" ||
          location === "/my/profile"
            ? "hide"
            : null
        }
      >
        <BackSvg
          style={{
            fill: location === "/chat" ? "#fff" : "#323232",
          }}
        />
      </BackIcon>

      <LogoIcon className={location === "/login" ? "hide" : null}>
        {location === "/my" || location === "/chat" ? (
          <LogoSvg />
        ) : (
          <img src={Logo} alt="logo" width="85px" />
        )}
      </LogoIcon>

      <AlarmIcon
        className={
          location === "/login" ||
          location === "/join" ||
          location === "/info" ||
          location === "/info/change"
            ? "hide"
            : null
        }
        style={{
          display:
            location === "/login" ||
            location === "/join" ||
            location === "/info/change" ||
            location === "/my/profile"
              ? "none"
              : null,
        }}
      >
        <AlarmSvg
          style={{
            fill:
              location === "/my" || location === "/chat" ? "#fff" : "#323232",
          }}
        />
      </AlarmIcon>

      <CloseIcon
        onClick={close}
        style={{
          display:
            location === "/login" ||
            location === "/join" ||
            location === "/info/change" ||
            location === "/my/profile"
              ? null
              : "none",
        }}
      >
        <CloseSvg />
      </CloseIcon>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  // background-color: white;
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

const CloseIcon = styled.div.attrs((props) => ({
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
