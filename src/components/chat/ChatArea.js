// 1:1 실시간 채팅 대화내역
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { actionCreators as chatActions } from "../../redux/modules/chat";

import "../../css/component.css";
import "../../css/chat.css";
import Message from "../../elements/Message";

const ChatArea = ({ room }) => {
  const dispatch = useDispatch();
  
  const userNum = sessionStorage.getItem("userNum");
  const messages = useSelector((state) => state.chat.data);

  const EventSource = NativeEventSource || EventSourcePolyfill;
  global.EventSource = NativeEventSource || EventSourcePolyfill;

  useEffect(() => {
    dispatch(chatActions.getMessagesAC(room.roomId));
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
      });
    });
  }, []);

  return (
    <ChatAreaWrap className="contents-container">
      <Container id="chat-content">
        {messages.map((m, index) => {
          if (Number(m.userNum) === Number(userNum))
            return <Message type="sender" data={m} key={index} />;
          else return <Message type="receiver" data={m} key={index} />;
        })}
      </Container>
    </ChatAreaWrap>
  );
};

const ChatAreaWrap = styled.div`
  overflow-y: scroll;
  min-height: calc(100vh - 244px);
  height: auto;
  background-color: white;
  padding-bottom: 88px;
`;

const Container = styled.div`
  display: flex;
  align-content: stretch;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default ChatArea;
