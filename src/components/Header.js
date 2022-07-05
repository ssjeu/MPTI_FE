import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Logo from "../images/logo@2x.png";
import Alarm from "../images/notifications-none@3x.png";
import Back from "../images/keyboard-arrow-left@3x.png";

const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);
  if (location.pathname === "/login") return null;
  else if (location.pathname === "/join") return null;
  else if (location.pathname === "/info") return null;

  return (
    <HeaderWrap>
      <div onClick={() => navigate(-1)}>
        <img src={Back} alt="logo" width="24px" />
      </div>
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
  margin: 58px 20px 36px 20px;
  display: flex;
  justify-content: space-between;
`;

// 스크롤시 고정시

// const HeaderWrap = styled.div`
//   position: fixed;
//   background-color: white;
//   width: 100%;
//   height: 40px;
//   padding-top: 60px;
//   display: flex;
//   justify-content: space-between;
// `;
export default Header;
