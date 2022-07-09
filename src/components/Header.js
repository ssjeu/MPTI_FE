import React from 'react';
import styled from 'styled-components';
import '../css/component.css';
import logo from '../images/logo/Group 14@2x.png';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Logo from '../images/logo@2x.png';
import Alarm from '../images/notifications-none@3x.png';
import Back from '../images/keyboard-arrow-left@3x.png';

// svg icons + logo
import { ReactComponent as LogoSvg } from '../images/logo/Group 15.svg';
import { ReactComponent as AlarmSvg } from '../images/icons/notifications_none.svg';

export const UserInfoHeader = (props) => {
  const { margin } = props;

  return (
    <>
      <LogoStyle className='logo' src={logo} alt='' margin={margin} />
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

  const location = useLocation();
  console.log(location);
  if (location.pathname === '/login') return null;
  else if (location.pathname === '/join') return null;
  else if (location.pathname === '/info') return null;
  else if (location.pathname === '/my') return null;

  return (
    <HeaderWrap>
      <div onClick={() => navigate(-1)}>
        <img src={Back} alt='logo' width='24px' />
      </div>
      <div>
        <img src={Logo} alt='logo' width='85px' />
      </div>
      <div>
        <img src={Alarm} alt='alarm' width='24px' />
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

const LogoStyle = styled.img`
  margin: ${(props) => props.margin};
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
