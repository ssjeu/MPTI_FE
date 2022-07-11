// 채팅 입력 컴포넌트
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../../css/component.css";

const ChatWrite = () => {
  const dispatch = useDispatch();

  // 채팅 입력 data
  const content_ref = React.useRef();

  const activeChat = () => {
    if (content_ref.current.value !== "") {
      //   dispatch(commentActions.addCommentAC(postId, content_ref.current.value));
      content_ref.current.value = "";
    }
  };

  return (
    <ChattWriteWrap className="contents-container">
      <ChatInput>
        <input
          type="text"
          placeholder="메세지를 입력하세요."
          ref={content_ref}
        />
        <InputButton onClick={activeChat}>전송</InputButton>
      </ChatInput>
    </ChattWriteWrap>
  );
};

const ChattWriteWrap = styled.div`
  position: fixed;
  background-color: var(--subcolor);
  height: 80px;
  width: 100%;
  bottom: 80px;
`;

const ChatInput = styled.div`
  background-color: #f8f8f8;
  border: 0.5px solid var(--maincolor);
  border-radius: 6px;
  height: 40px;
  margin: 20px 0;
  font-size: 16px;

  &:hover {
    border: 1px solid var(--maincolor);
  }

  & input {
    font-size: 16px;
    border: none;
    float: left;
    margin-left: 16px;
    height: 38px;
    width: 70%;
    background-color: #f8f8f8;
  }

  & input:focus {
    outline: none;
    border: none;
  }

  & input::placeholder {
    color: var(--gray2);
  }
`;

const InputButton = styled.div`
  float: right;
  width: auto;
  padding: 2px 16px;
  margin-top: 5px;
  color: var(--maincolor);
  font-weight: 500;
`;

export default ChatWrite;
