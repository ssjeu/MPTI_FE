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
import { ReactComponent as BlockSvg } from "../images/icons/flag.svg";
import { ReactComponent as ExitSvg } from "../images/icons/exit_to_app_FILL0_wght400_GRAD0_opsz20.svg";

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // 채팅 메세지
  const [chat, onChangeChat, setChat] = useInput("");
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim()) {
        dispatch(chatActions.sendMessageAC(chat));
        // socket.emit("send_message", { chat, room });
        setChat("");
        console.log("submit");
      }
    },
    [chat]
  );

  // 상대방 정보
  const user2 = location.state.data;

  // Room State
  const [room, setRoom] = useState(user2.userNum);
  const [messageReceived, setMessageReceived] = useState("");

  // 내 정보 -> token 넘겨주면 서버에서 처리
  //   const userNum = sessionStorage.getItem("userNum");
  //   const user1 = useSelector((state) => state.userInfo.user);

  const chats = useSelector((state) => state.chat.list);
  console.log(chats);

  useEffect(() => {
    // socket.emit("join_room", room);
    dispatch(chatActions.getMessageDB());

    // socket.on("receive_message", (data) => {
    //   setMessageReceived(data.message);
    // });
  }, []);

  return (
    <div>
      <BackgroundColor />
      <ChatWithTitle className="contents-container">
        <div style={{ width: "16px" }} />
        {user2.nickname}{" "}
        <ExitSvg
          style={{
            fill: "var(--gray4)",
          }}
        />
      </ChatWithTitle>
      {messageReceived}
      {/* {chats &&
        chats.map((data, index) => <div key={index}>{data.message}</div>)} */}
      {/* <ChatArea /> */}
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
