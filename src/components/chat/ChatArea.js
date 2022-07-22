// 1:1 실시간 채팅 대화내역
import React, { useEffect, useState, createElement } from "react";
import styled from "styled-components";
// import "eventsource";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

import "../../css/component.css";
import "../../css/chat.css";
// import {EventSource} from "eventsource";

// 기본적으로 제공되는 eventsource 가 아닌 추가로 설치한 eventsource 를 사용
// const EventSource = require("eventsource");
// const EventSourcee = EventSource;
// const EventSource = NativeEventSource || EventSourcePolyfill;
// global.EventSource = NativeEventSource || EventSourcePolyfill;

const ChatArea = ({ room }) => {
  // const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);

  //   const EventSource = NativeEventSource || EventSourcePolyfill;
  //   global.EventSource = NativeEventSource || EventSourcePolyfill;

  useEffect(() => {
    const token = sessionStorage.getItem("is_login");
    const userNum = sessionStorage.getItem("userNum");

    let evtSource = undefined;

    if (evtSource !== undefined) {
      evtSource.close();
      console.log("evtSource closed");
    }

    // Server Sent Event 요청시 header 에 auth-user 를 설정하는 부분
    const eventSourceInitDict = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    // EventSource 로 Server Sent Event 를 호출하는 부분
    evtSource = new EventSource(
      `http://3.35.170.203/api/message/` + room.roomId,
      eventSourceInitDict
    );

    // EventSource 생성
    // var eventSourceInitDict = { headers: { Authorization: "Bearer " + token } };
    // evtSource = new EventSource(
    //   `http://3.35.170.203/api/message/` + room.roomId,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    //   { withCredentials: true }
    //   eventSourceInitDict
    // );

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

    // Server Sent Event 가 종료되는 경우 연결된 EventSource 를 close 하는 부분
    // evtSource.addEventListener("close", () => evtSource.close());
    // return () => evtSource.close();
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
