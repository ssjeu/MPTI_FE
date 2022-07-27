// 채팅 입력 컴포넌트
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import autosize from "autosize";

import "../../css/component.css";

const ChatWrite = ({ chat, onChangeChat, onSubmitForm, data }) => {
  const dispatch = useDispatch();

  // 채팅 입력 data
  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
    //   autosize(textareaRef.current);
    }
  }, [textareaRef.current]);

  // Enter key 눌렀을 때 전송
  const onKeydownChat = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [chat]
  );

  // 전송 버튼 눌렀을 때 전송
  const activeChat = (e) => {
    if (textareaRef.current.value !== "") {
      //   dispatch(commentActions.addCommentAC(postId, content_ref.current.value));
      onSubmitForm(e);
    }
  };

  return (
    <ChatWriteWrap className="contents-container">
      <Form onSubmit={onSubmitForm}>
        <ChatInput>
          <textarea
            type="text"
            placeholder="메세지를 입력하세요."
            ref={textareaRef}
            value={chat}
            onChange={onChangeChat}
            onKeyPress={onKeydownChat}
          />
          <InputButton type="submit" onClick={activeChat}>
            전송
          </InputButton>
        </ChatInput>
      </Form>
    </ChatWriteWrap>
  );
};

const ChatWriteWrap = styled.div`
  position: sticky;
  background-color: var(--subcolor);
  min-height: 80px;
  max-height: 200px;
  bottom: 80px;
`;

const Form = styled.form`
  //   background-color: #f8f8f8;
  //   min-height: 32px;
  //   margin: 20px 0;
  //   font-size: 16px;
  //   position: relative;

  //   & textarea {
  //     width: calc(100% - 64px);
  //     font-size: 16px;
  //     border: 1px solid var(--maincolor);
  //     border-radius: 6px;
  //     padding: 10px 48px 10px 16px;
  //     background-color: #f8f8f8;
  //   }

  //   & textarea:focus {
  //     outline: none;
  //     border: 2px solid var(--maincolor);
  //   }

  //   & textarea::placeholder {
  //     color: var(--gray2);
  //   }
`;

const ChatInput = styled.div`
  min-height: 32px;
  padding: 20px 0;
  font-size: 16px;
  position: relative;

  & textarea {
    width: calc(100% - 64px);
    font-size: 16px;
    border: 1px solid var(--maincolor);
    border-radius: 6px;
    padding: 10px 48px 10px 16px;
    background-color: #f8f8f8;
    resize: none;
  }

  & textarea:focus {
    outline: none;
    border: 2px solid var(--maincolor);
  }

  & textarea::placeholder {
    color: var(--gray2);
  }
`;

const InputButton = styled.div`
  position: absolute;
  bottom: 32px;
  right: 12px;
  width: auto;
  color: var(--maincolor);
  font-weight: 500;
`;

export default ChatWrite;
