// 1:1 실시간 채팅
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInfoDB } from "../redux/modules/userInfo";
import { actionCreators as chatActions } from "../redux/modules/chat";
import ChatWrite from "../components/chat/ChatWrite";

import "../css/component.css";
import ChatNotice from "../elements/ChatNotice";
import { ReactComponent as ExitSvg } from "../images/icons/exit_to_app_FILL0_wght400_GRAD0_opsz20.svg";

const Chat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const room = location.state.room;
  const recevierUser = location.state.data;

  const token = sessionStorage.getItem("is_login");

  // 채팅 메세지
  const [chat, onChangeChat, setChat] = useInput("");
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim()) {
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

  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    const eventSource = new EventSource(
      `http://3.35.170.203/api/message/` + room.roomId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      { withCredentials: true } 
    );

    // dispatch(chatActions.getMessageAC(room.roomId));
    // 서버로부터 데이터가 오면
    eventSource.addEventListener("message", function (e) {
      console.log(e.data);
    });

    // connection되면
    eventSource.addEventListener("open", function (e) {
      // Connection was opened.
    });

    // error 나면
    eventSource.addEventListener("error", function (e) {
      if (e.readyState == EventSource.CLOSED) {
        // Connection was closed.
      }
    });
  }, []);

  return (
    <div>
      <BackgroundColor />
      <ChatWithTitle className="contents-container">
        <div style={{ width: "16px" }} />
        {recevierUser.nickname}{" "}
        <ExitSvg
          style={{
            fill: "var(--gray4)",
          }}
          onClick={exitRoom}
        />
      </ChatWithTitle>

      {room.members.length === 1 ? (
        <ChatNotice text="상대방이 채팅방을 나갔습니다." />
      ) : null}

      <ChatWrite
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </div>
  );
};

const BackgroundColor = styled.div`
  background-color: var(--maincolor);
  width: 100%;
  height: 110px;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
`;

const ChatWithTitle = styled.div`
  display: flex;
  height: 52px;
  border-bottom: 1px solid var(--gray1);
  align-items: center;
  justify-content: space-between;
  margin-top: -14px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.8px;
`;

export default Chat;
