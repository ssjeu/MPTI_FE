// 채팅 메세지
import React from "react";
import styled from "styled-components";

const Message = ({ type, data }) => {
  return (
    <div>
      {type === "sender" ? (
        <SenderWrap>
          <Content className="sender">{data.content}</Content>
          <Time>{data.messageTime.substring(13, 19)}</Time>
        </SenderWrap>
      ) : (
        <ReceiverWrap>
          <Img src={data.userImage} alt={data.userNum} />
          <Content className="receiver">{data.content}</Content>
          <Time>{data.messageTime.substring(13, 19)}</Time>
        </ReceiverWrap>
      )}
    </div>
  );
};

const MessageWrap = styled.div``;

const SenderWrap = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 12px 0;
  flex-direction: row-reverse;
`;

const ReceiverWrap = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 12px 0;
  flex-direction: row;
`;

const Content = styled.div`
  width: auto;
  height: auto;
  font-size: 16px;
  letter-spacing: -0.8px;
  text-align: left;
  padding: 8px 12px;
  max-width: 240px;

  .sender {
    background-color: #64be72;
    color: white;
    margin-right: 0;
    border-radius: 8px 8px 2px 8px;
  }

  .receiver {
    background-color: #f5f5f5;
    color: #333;
    margin-left: 0;
    border-radius: 8px 8px 8px 2px;
  }
`;

const Time = styled.div`
  font-size: 8px;
  color: #adadad;
  width: fit-content;
  height: fit-content;
  margin: 0 8px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 20px;
  object-fit: cover;
`;

export default Message;
