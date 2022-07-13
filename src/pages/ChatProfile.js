import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import "../css/component.css";
import AskChatButton from "../elements/MainButton";

const ChatProfile = () => {
  const location = useLocation();
  const data = location.state.data;

  return (
    <ChatProfileWrap>
      <ProfileImageWrap className="contents-container">
        <img src={data.userImage} alt="profile"></img>
      </ProfileImageWrap>
      <ProfileInfoWrap className="container">
        <User>
          {data.nickname}
          <span></span>
        </User>
        <MBTI>{data.mbti}</MBTI>
        <Introduction>
          <h4>자기소개</h4>
          <div>{data.introduction}</div>
        </Introduction>
      </ProfileInfoWrap>
      <Link
        to="/chat"
        state={{ data: data }}
        style={{ textDecoration: "none" }}
      >
        <div className="container">
          <AskChatButton text="대화하기" />
        </div>
      </Link>
    </ChatProfileWrap>
  );
};

const ChatProfileWrap = styled.div`
  margin-bottom: 60px;
  letter-spacing: -0.05em;
`;

const ProfileImageWrap = styled.div`
  & img {
    width: 100%;
    border-radius: 4px;
  }
`;

const ProfileInfoWrap = styled.div`
  text-align: left;
  margin: 20px 0 40px 0;
`;

const User = styled.div`
  font-weight: 700;
  font-size: 26px;

  & span {
    font-weight: 400;
    font-size: 22px;
  }
`;

const MBTI = styled.div`
  color: var(--maincolor);
  width: 60px;
  border: 1px solid var(--maincolor);
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
  margin: 8px 0 32px 0;
  text-align: center;
`;

const Introduction = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;
export default ChatProfile;
