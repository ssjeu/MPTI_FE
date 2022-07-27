// 1:1 실시간 채팅
import React, { useCallback, useEffect, useState, createElement } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

import useInput from "../hooks/useInput";
import ChatArea from "../components/chat/ChatArea";
import ChatWrite from "../components/chat/ChatWrite";
import ChatNotice from "../elements/ChatNotice";

import "../css/component.css";
import { ReactComponent as ExitSvg } from "../images/icons/exit_to_app_FILL0_wght400_GRAD0_opsz20.svg";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state.room;
  const recevierUser = location.state.data;

  // 채팅 메세지 입력
  const [chat, onChangeChat, setChat] = useInput("");
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (room && chat?.trim()) {
        setChat(chat.replace(/(?:\r\n|\r|\n)/g, "<br>"));
        dispatch(chatActions.sendMessageAC(room.roomId, chat));
        setChat("");
        console.log("submit");
      }
    },
    [chat]
  );

  const exitRoom = async () => {
    dispatch(chatActions.exitRoomAC(room.roomId));
  };

  return (
    <ChatWrap>
      <BackgroundColor />
      <ChatWithTitle className="contents-container">
        <div style={{ width: "16px" }} />
        <ChatUser
          onClick={() =>
            navigate("/chatprofile", {
              state: { data: recevierUser, from: "chat" },
            })
          }
        >
          {recevierUser.nickname}
        </ChatUser>
        <Icon>
          <ExitSvg
            style={{
              fill: "var(--gray4)",
            }}
            onClick={exitRoom}
          />
        </Icon>
      </ChatWithTitle>

      <ChatArea room={room} />

      {room && room.members.length === 1 ? (
        <ChatNotice text="상대방이 채팅방을 나갔습니다." />
      ) : null}

      <ChatWrite
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </ChatWrap>
  );
};

const ChatWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
`;

const BackgroundColor = styled.div`
  background-color: var(--maincolor);
  width: 100%;
  height: 124px;
  z-index: -1;
  position: absolute;
  top: -124px;
  left: 0;
`;

const ChatWithTitle = styled.div`
  display: flex;
  height: 52px;
  border-bottom: 1px solid var(--gray1);
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.8px;
  margin-bottom: 12px;
`;

const ChatUser = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`;

export default Chat;
