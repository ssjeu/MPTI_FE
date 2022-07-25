import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import AskChatButton from '../elements/MainButton';
import ProfileSwiper from '../components/myprofile/ProfileSwiper';
import Button01 from '../elements/Button01';

const ChatProfile = () => {
  const location = useLocation();
  const data = location.state.data;

  // 유저 나이 구하기
  const birthday = data.birthday && data.birthday.slice(0, 4);
  const today = new Date();
  const user_age = today.getFullYear() - birthday + 1;

  return (
    <Container>
      <ProfileSwiper images={data.profileImages && data.profileImages} />
      <UserInfoArea>
        <div>
          <h3>{data && data.nickname}</h3>
          <span>{user_age}</span>
        </div>
        <span>{data && data.mbti}</span>
        <p>자기소개</p>
        <p>{data && data.introduction}</p>
      </UserInfoArea>
      <Link
        to='/chat'
        state={{ data: data }}
        style={{ textDecoration: 'none' }}
      >
        <ButtonStyled>
          <Button01
            backgroundColor='var(--maincolor)'
            color='#fff'
            margin='0 0 67px 0'
          >
            대화하기
          </Button01>
        </ButtonStyled>
      </Link>
    </Container>

    // <ChatProfileWrap>
    //   <ProfileImageWrap className="contents-container">
    //     <img src={data.userImage} alt="profile"></img>
    //   </ProfileImageWrap>
    //   <ProfileInfoWrap className="container">
    //     <User>
    //       {data.nickname}
    //       <span></span>
    //     </User>
    //     <MBTI>{data.mbti}</MBTI>
    //     <Introduction>
    //       <h4>자기소개</h4>
    //       <div>{data.introduction}</div>
    //     </Introduction>
    //   </ProfileInfoWrap>
    //   <Link
    //     to="/chat"
    //     state={{ data: data }}
    //     style={{ textDecoration: "none" }}
    //   >
    //     <div className="container">
    //       <AskChatButton text="대화하기" />
    //     </div>
    //   </Link>
    // </ChatProfileWrap>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 2.9%;
`;

const UserInfoArea = styled.div`
  box-sizing: border-box;
  padding: 0 5%;
  text-align: left;

  * {
    margin: 0;
  }

  & > div {
    margin-top: 20px;
    margin-bottom: 7px;
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 7px;

    h3 {
      font-size: 26px;
      font-weight: 700;
    }
    span {
      font-size: 22px;
      font-weight: 400;
    }
  }

  & > span {
    color: var(--maincolor);
    border: 1px solid var(--maincolor);
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
    padding: 0 12px;
    margin-top: 7px;
  }

  & > p:nth-of-type(1) {
    font-size: 16px;
    font-weight: 500;
    margin-top: 37px;
    margin-bottom: 12px;
  }

  & > p:nth-of-type(2) {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 57px;
  }
`;

const ButtonStyled = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 3.2%;
`;

// const ChatProfileWrap = styled.div`
//   margin-bottom: 60px;
//   letter-spacing: -0.05em;
// `;

// const ProfileImageWrap = styled.div`
//   & img {
//     width: 100%;
//     border-radius: 4px;
//   }
// `;

// const ProfileInfoWrap = styled.div`
//   text-align: left;
//   margin: 20px 0 40px 0;
// `;

// const User = styled.div`
//   font-weight: 700;
//   font-size: 26px;

//   & span {
//     font-weight: 400;
//     font-size: 22px;
//   }
// `;

// const MBTI = styled.div`
//   color: var(--maincolor);
//   width: 60px;
//   border: 1px solid var(--maincolor);
//   border-radius: 12px;
//   font-weight: 500;
//   font-size: 16px;
//   margin: 8px 0 32px 0;
//   text-align: center;
// `;

// const Introduction = styled.div`
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 21px;
// `;
export default ChatProfile;
