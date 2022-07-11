import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import "../css/component.css";
import AskChatButton from "../elements/MainButton";
import TestImg from "../images/user-profile.jpeg";

const ChatProfile = () => {
  const navigate = useNavigate();

  return (
    <ChatProfileWrap>
      <ProfileImageWrap className="contents-container">
        <img src={TestImg} alt="profile"></img>
      </ProfileImageWrap>
      <ProfileInfoWrap className="container">
        <User>
          지은 <span>22</span>
        </User>
        <MBTI>ENFP</MBTI>
        <Introduction>
          <h4>자기소개</h4>
          <div>
            안녕하세요! 저는 식물 키우는걸 좋아하고,평소에 책 읽는걸 좋아해요.
            서울 강남역 근처 거주하고 있습니다😃
          </div>
        </Introduction>
      </ProfileInfoWrap>
      <div className="container" onClick={()=>navigate("/chat")}>
        <AskChatButton text="대화요청" />
      </div>
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
