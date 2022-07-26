// 채팅창에서 알림 문구
import React from "react";
import styled from "styled-components";

const ChatNotice = (props) => {
  return <ChatNoticeWrap>{props.text}</ChatNoticeWrap>;
};

const ChatNoticeWrap = styled.div`
  background-color: var(--subcolor);
  font-size: 13.5px;
  height: 36px;
  line-height : 36px;
`;

export default ChatNotice;
