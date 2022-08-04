// 1:1 실시간 채팅 대화, 입력 창
import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { actionCreators as chatActions } from "../../redux/modules/chat";

import "../../css/component.css";
import "../../css/chat.css";
import useInput from "../../hooks/useInput";
import ChatWrite from "../../components/chat/ChatWrite";
import Message from "../../elements/Message";

let prePath = "";

const ChatArea = ({ room }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const userNum = sessionStorage.getItem("userNum");
  const messages = useSelector((state) => state.chat.data);
  const scrollRef = useRef(null);
  const [chat, onChangeChat, setChat] = useInput("");

  const EventSource = NativeEventSource || EventSourcePolyfill;
  global.EventSource = NativeEventSource || EventSourcePolyfill;

  useEffect(() => {
    if (prePath.indexOf("/chat") !== -1) {
      prePath = "";
      window.location.reload();
    }
    prePath = location.pathname; // 지금 주소 /chat
  }, [location]);

  useEffect(() => {
    dispatch(chatActions.getMessagesAC(room.roomId));
    return () => dispatch(chatActions.resetMessageAC());
  }, []);

  useEffect(() => {
    let evtSource;
    if (evtSource !== undefined) {
      evtSource.close();
    }

    // EventSource 생성
    evtSource = new EventSource(
      `https://mptiserver.link/api/message/` + room.roomId
    );

    // 실시간 채팅 메세지
    evtSource.addEventListener("test", function (e) {
      let message = JSON.parse(e.data);

      const chatArea = document.getElementById("chat-content");
      const onWrapDiv = document.createElement("div");
      const onTextDiv = document.createElement("div");
      const onTimeDiv = document.createElement("div");
      const onImgDiv = document.createElement("img");

      message.forEach((a) => {
        onTextDiv.innerHTML = a.content;
        onTimeDiv.innerHTML = a.messageTime.substring(13, 19);

        onWrapDiv.classList.add("commonArea");
        onTextDiv.classList.add("common");
        onTimeDiv.classList.add("time");

        if (Number(a.userNum) === Number(userNum)) {
          onWrapDiv.classList.add("senderArea");
          onTextDiv.classList.add("sender");
        } else {
          onWrapDiv.classList.add("receiverArea");
          onTextDiv.classList.add("receiver");

          onImgDiv.src = a.userImage[0];
          onImgDiv.classList.add("img");
          onWrapDiv.appendChild(onImgDiv);
        }

        onWrapDiv.appendChild(onTextDiv);
        onWrapDiv.appendChild(onTimeDiv);

        chatArea.appendChild(onWrapDiv);

        scrollToBottom();
      });
    });
  }, []);

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

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <ChatAreaWrap ref={scrollRef}>
      <Container id="chat-content" className="contents-container">
        {messages.map((m, index) => {
          if (Number(m.userNum) === Number(userNum))
            return <Message type="sender" data={m} key={index} />;
          else return <Message type="receiver" data={m} key={index} />;
        })}
      </Container>

      <ChatWrite
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </ChatAreaWrap>
  );
};

const ChatAreaWrap = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  align-content: stretch;
  flex-direction: column;
  flex-wrap: wrap;
  padding-bottom: 20px;
  overflow-y: scroll;
  min-height: calc(100vh - 300px);
  height: auto;
`;

export default ChatArea;
