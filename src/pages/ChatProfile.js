import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { chatApi } from "../shared/api";

import "../css/component.css";
import AskChatButton from "../elements/MainButton";
import { ReactComponent as FlagSvg } from "../images/icons/flag.svg";

const ChatProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;

  const room = useSelector((state) => state.chat.room);
  console.log("chatProfile", room);

  const [activeFlag, setActiveFlag] = useState(0);

  const createRoom = async () => {
    await chatApi
      .createRoom(data.userNum)
      .then((res) => {
        navigate("/chat", {
          state: { data: data, room: res.data.Room },
        });
      })
      .catch((err) => {
        navigate("/chat", {
          state: { data: data, room: err.response.data.Room },
        });
      });
  };

  const blockUser = () => {
    setActiveFlag(!activeFlag);
  };

  return (
    <ChatProfileWrap>
      <ProfileImageWrap className="contents-container">
        <img src={data.userImage} alt="profile"></img>
      </ProfileImageWrap>

      <ProfileInfoWrap className="container">
        <User>
          <div>{data.nickname}</div>
          <FlagSvg
            style={{ fill: activeFlag ? "#64be72" : "#adadad" }}
            onClick={blockUser}
          />
        </User>
        <MBTI>{data.mbti}</MBTI>
        <Introduction>
          <h3>자기소개</h3>
          <div>{data.introduction}</div>
        </Introduction>
      </ProfileInfoWrap>

      <div className="container" onClick={createRoom}>
        <AskChatButton text="대화하기" />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
