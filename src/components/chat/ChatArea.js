// 1:1 실시간 채팅 대화내역
import React, { useEffect, useState, createElement } from "react";
import styled from "styled-components";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

import "../../css/component.css";
import "../../css/chat.css";

const ChatArea = ({ room }) => {
  // const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);

  const EventSource = NativeEventSource || EventSourcePolyfill;
  global.EventSource = NativeEventSource || EventSourcePolyfill;

  useEffect(() => {
    const token = sessionStorage.getItem("is_login");
    const userNum = sessionStorage.getItem("userNum");

    let evtSource = undefined;

    if (evtSource !== undefined) {
      evtSource.close();
      console.log("evtSource closed");
    }

    // EventSource 생성
    // var eventSourceInitDict = { headers: { Authorization: "Bearer " + token } };
    evtSource = new EventSource(
      `http://3.35.170.203/api/message/` + room.roomId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      //   { withCredentials: true }
      //   eventSourceInitDict
    );

    // 실시간 채팅 메세지 뷰에 추가
    evtSource.addEventListener("test", function (e) {
      let message = JSON.parse(e.data);
      console.log(message);
      setData(message);

      const chatArea = document.getElementById("chat-content");
      const onWrapDiv = document.createElement("div");
      const onTextDiv = document.createElement("div");
      const onTimeDiv = document.createElement("div");
      const onImgDiv = document.createElement("img");

      //   chatArea.html('');
      //   chatArea.removeChild();

      message.forEach((a) => {
        console.log(a);
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
      <div>{data.length}</div>
      <Container id="chat-content"></Container>
    </ChatAreaWrap>
  );
};

const ChatAreaWrap = styled.div`
  overflow-y: scroll;
  margin-bottom: 200px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  align-content: stretch;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default ChatArea;
