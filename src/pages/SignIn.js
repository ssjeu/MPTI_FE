import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInDB } from '../redux/modules/user';

import '../css/component.css';
import { ReactComponent as PermIdentity } from '../images/icons/perm_identity.svg';
import { ReactComponent as Htttps } from '../images/icons/https.svg';
import character from '../images/character/frame@3x.png';
import logo from '../images/logo/Group 14@2x.png';

import Button01 from '../elements/Button01';
import Button02 from '../elements/Button02';
import HorizontalLine from '../elements/HorizonLine';
import SweetAlert from '../components/sweetAlert/SweetAlert';

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // 뒤로가기로 해당 페이지 가기 막기
  // window.history.forward();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
    if (email === '' || password === '') {
      SweetAlert({ icon: 'error', text: '빈칸을 모두 입력해주세요!' });
      return;
    }
    dispatch(signInDB(email, password));
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  // 카카오 로그인 테스트
  const CLIENT_ID = '	8889cc33c5ac3c4cec9e5da61462fad9';
  const REDIRECT_URI = 'http://3.35.170.203/api/kakao/callback';
  // const REDIRECT_URI = 'http://localhost:3000/oauth/api/kakao/callback';

  const KakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <Container className='container'>
      <Logo className='logo' src={logo} alt='' />
      <div style={{ marginBottom: '45px' }}>
        <span className='text-style-kr' style={{ fontWeight: '300' }}>
          진짜 MBTI 찐친을 만나는 곳,{' '}
          <span style={{ fontWeight: '500' }}>믑티</span>
        </span>
      </div>

      <Character src={character} alt='' />

      <div className='width-wrap'>
        <div className='input-area' style={{ marginBottom: '15px' }}>
          <PermIdentity
            className='icons'
            style={{ fill: email === '' ? '#d9d9d9' : '#64be72' }}
          />
          <input type='text' placeholder='이메일' onChange={inputEmail} />
        </div>

        <div className='input-area'>
          <Htttps
            className='icons'
            style={{ fill: password === '' ? '#d9d9d9' : '#64be72' }}
          />
          <input
            type='password'
            placeholder='비밀번호'
            onChange={inputPassword}
          />
        </div>
      </div>

      <Button01
        _className='hover-btn1'
        color='#fff'
        backgroundColor='#64be72'
        _onClick={login}
        margin='26px 0px 0px 0px'
      >
        로그인
      </Button01>

      <Button02
        text='회원가입'
        margin='16px 0px 64px 0px'
        _onClick={() => {
          navigate('/join');
        }}
      />

      <HorizontalLine text={'간편 로그인'} />

      <Button01
        _className='hover-btn2'
        color='#000'
        backgroundColor='#ffe502'
        _onClick={KakaoLogin}
        margin='27px 0px 14px 0px'
      >
        카카오 계정으로 로그인
      </Button01>
      <p>
        회원가입 시 믑티의 서비스 이용 약관과 개인정보 보호정책에 동의하게
        됩니다.
      </p>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: -120px;

  * {
    box-sizing: border-box;
  }

  input {
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;

    font-weight: 400;
    font-size: 16px;
  }

  input::placeholder {
    color: #adadad;
  }

  .text-style-kr {
    font-size: 15px;
    color: #000;
  }

  .width-wrap {
    width: 100%;
  }

  .input-area {
    padding: 5px;
    border-bottom: 2px solid #64be72;
    display: flex;
  }

  .icons {
    // fill: #d9d9d9;
    margin-right: 5px;
    margin-bottom: 3px;
  }

  p {
    font-size: 10px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.5px;
    color: #d3d3d3;

    margin: 0;
  }
`;

const Logo = styled.img`
  margin-top: 125px;
  margin-bottom: 13.7px;
`;

const Character = styled.img`
  width: 237px;
  height: 112px;
  object-fit: contain;
  margin-bottom: 65px;

  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default SignIn;
