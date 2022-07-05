import React from "react";
import styled from "styled-components";
import Logo from "../images/logo@2x.png";
import Alarm from "../images/notifications-none@3x.png";
import Back from "../images/keyboard-arrow-left@3x.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
