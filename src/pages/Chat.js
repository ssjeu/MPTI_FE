// 1:1 실시간 채팅
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

import "../css/component.css";
import useInput from "../hooks/useInput";
import ChatArea from "../components/chat/ChatArea";
import ChatWrite from "../components/chat/ChatWrite";
import ChatNotice from "../elements/ChatNotice";

import { ReactComponent as ExitSvg } from "../images/icons/exit_to_app_FILL0_wght400_GRAD0_opsz20.svg";
import { ReactComponent as BackSvg } from "../images/header/keyboard-arrow-left.svg";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state.room;
  const recevierUser = location.state.data;

  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);
  const [chat, onChangeChat, setChat] = useInput("");

  useEffect(() => {
    // 스크롤 감시, 상단 고정
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    if (scrollY > 68) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  };

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (room && chat?.trim()) {
        setChat(chat.replace(/(?:\r\n|\r|\n)/g, "<br/>"));
        dispatch(chatActions.sendMessageAC(room.roomId, chat));
        setChat("");
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
      <ChatWithTitle
        className={
          scrollActive ? "contents-container fixedBox" : "contents-container"
        }
      >
        <Left>
          {scrollActive ? (
            <div onClick={() => navigate(-1)}>
              <BackSvg style={{ fill: "var(--gray4)" }} />
            </div>
          ) : null}
        </Left>
        <ChatUser
          onClick={() =>
            navigate("/chatprofile", {
              state: { data: recevierUser, from: "chat" },
            })
          }
        >
          {recevierUser.nickname}
        </ChatUser>
        <Icon onClick={exitRoom}>
          나가기
          <ExitSvg style={{ fill: "var(--gray4)", marginLeft: "4px" }} />
        </Icon>
      </ChatWithTitle>

      {room && room.members.length === 1 ? (
        <NoticeWrap className={scrollActive ? "fixedBox" : null}>
          <ChatNotice text={recevierUser.nickname} />
        </NoticeWrap>
      ) : null}

      <ChatArea room={room} className="content" />

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
  min-height: calc(100vh - 124.5px);
  height: auto;
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
  width: 100%;
  height: 52px;
  background-color: white;
  border-bottom: 1px solid var(--gray1);
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.8px;
  margin-bottom: 12px;

  &:hover {
    background-color: var(--subcolor);
  }

  &.fixedBox {
    position: sticky;
    z-index: 999;
    top: 0;
    right: 0;
  }
`;

const Left = styled.div`
  width: 60px;
  display: flex;
  align-items: center;

  & div:hover {
    cursor: pointer;
  }
`;

const ChatUser = styled.div`
  &:hover {
    cursor: pointer;
    color: var(--maincolor);
    font-weight: bold;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  font-size: 12px;
  color: var(--gray4);

  &:hover {
    cursor: pointer;
  }
`;

const NoticeWrap = styled.div`
  &.fixedBox {
    position: sticky;
    z-index: 999;
    top: 52px;
    right: 0;
  }
`;

export default Chat;
