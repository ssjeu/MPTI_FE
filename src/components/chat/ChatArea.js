// 1:1 실시간 채팅 대화내역
import React, { useEffect, useState, createElement } from "react";
import styled from "styled-components";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

import "../../css/component.css";
import "../../css/chat.css";

const ChatArea = ({ room }) => {
  const token = sessionStorage.getItem("is_login");

  const EventSource = NativeEventSource || EventSourcePolyfill;
  global.EventSource = NativeEventSource || EventSourcePolyfill;

  useEffect(() => {
    const userNum = sessionStorage.getItem("userNum");
    // EventSource 생성
    // var eventSourceInitDict = { headers: { Authorization: "Bearer " + token } };
    const evtSource = new EventSource(
      `http://3.35.170.203/api/message/` + room.roomId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      //   { withCredentials: true }
      //   eventSourceInitDict
    );

    // 실시간 채팅 메세지
    evtSource.addEventListener("test", function (e) {
      let message = JSON.parse(e.data);
      console.log(message);

      const chatArea = document.getElementById("chat-content");
      const onList = document.createElement("li");

      //   chatArea.html('');
      //   chatArea.removeChild();

      message.forEach((a) => {
        // chatArea.append(`${a.content}`);
        // chatArea.appendChild(`${a.content}`);
        onList.innerHTML = a.content;
        onList.classList.add("common");
        if (Number(a.userNum) === Number(userNum)) {
          onList.classList.add("sender");
        } else {
          onList.classList.add("receiver");
        }

        chatArea.appendChild(onList);
      });
    });
  }, []);

  return (
    <ChatAreaWrap className="contents-container">
      <ul id="chat-content"></ul>
    </ChatAreaWrap>
  );
};

const ChatAreaWrap = styled.div`
  overflow-y: scroll;
margin-bottom: 200px;
height: auto;



  & ul{
    // display:inline;
    display: flex;
    align-content: stretch;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

export default ChatArea;
