import React from 'react';
import styled from 'styled-components';

import { emailCheck_reg, passwordCheck_reg } from '../shared/regExp';
import { useDispatch } from 'react-redux';
import { signUpDB } from '../redux/modules/user';
import { useNavigate } from 'react-router-dom';

import logo from '../images/logo/Group 14@2x.png';

import Input01 from '../elements/Input01';
import Button01 from '../elements/Button01';

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');

  const [isNext, setIsNext] = React.useState(1);

  // 뒤로가기로 해당 페이지 가기 막기
  // window.history.forward();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = (e) => {
    setEmail(e.target.value);
  };
  const userName = (e) => {
    setName(e.target.value);
  };
  const userPassword = (e) => {
    setPassword(e.target.value);
  };
  const userPasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  // 버튼 클릭 시
  const signUp = () => {
    if (isNext === 1 && email === '') {
      alert('이메일을 입력해주세요!');
      return;
    }

    if (isNext === 1 && !emailCheck_reg(email)) {
      alert('이메일 형식을 확인해주세요.');
      return;
    } else if (isNext === 1 && emailCheck_reg(email)) {
      setIsNext(2);
      return;
    }

    if (isNext === 2 && name === '') {
      alert('이름을 입력해주세요!');
      return;
    } else if (isNext === 2 && name !== '') {
      setIsNext(3);
      return;
    }

    if (isNext === 3 && (password === '' || passwordCheck === '')) {
      alert('비밀번호를 입력해주세요!');
      return;
    }

    if (isNext === 3 && !passwordCheck_reg(password)) {
      alert(
        '비밀번호 형식을 확인해주세요.\n영문, 숫자, 특수문자 포함 8자리 이상입니다!'
      );
      return;
    }

    if (isNext === 3 && password !== passwordCheck) {
      alert('비밀번호가 달라요! 다시 확인해주세요.');
      return;
    }

    console.log(email, name, password, passwordCheck);
    dispatch(signUpDB(email, name, password, passwordCheck));
  };

  return (
    <Container className='container'>
      <Logo>
        <img className='logo' src={logo} alt='' />
      </Logo>

      <Title className='text-style-kr'>
        <p>
          믑티를 빛내주실✨
          <br />
          정말 멋진 분이 오셨네요!
        </p>
      </Title>
      {isNext === 1 ? (
        <>
          <SubTitle>먼저 이메일이 필요해요 :)</SubTitle>
          <Input01 placeholder='이메일' type='text' _onChange={userEmail} />
        </>
      ) : null}
      {isNext === 2 ? (
        <>
          <SubTitle>멋진 이름을 입력해주세요 :)</SubTitle>
          <Input01 placeholder='이름' type='text' _onChange={userName} />
        </>
      ) : null}
      {isNext === 3 ? (
        <>
          <SubTitle>이번이 마지막 단계 입니다!</SubTitle>
          <Input01
            margin='0 0 15px 0'
            placeholder='영문, 숫자, 특수문자 포함 8자리 이상'
            type='password'
            _onChange={userPassword}
          />
          <Input01
            placeholder='다시 한번 입력해주세요.'
            type='password'
            _onChange={userPasswordCheck}
          />
        </>
      ) : null}

      <Button01
        _className='hover-btn1'
        color='#fff'
        margin='43px 0 0 0'
        backgroundColor='#64be72'
        _onClick={() => {
          signUp();
        }}
      >
        {isNext === 3 ? '회원가입 하기' : '다음으로'}
      </Button01>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;

  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

const Logo = styled.div`
  margin-top: 58px;
  margin-bottom: 49.7px;
  display: flex;

  justify-content: center;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 64px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #adadad;
  letter-spacing: -0.8px;
  margin-bottom: 11px;
`;
export default SignUp;
