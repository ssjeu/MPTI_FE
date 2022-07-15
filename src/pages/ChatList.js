// 1:1 채팅 목록
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Character from "../images/character/frame-main@3x.png";

const ChatList = () => {
  // 유저 정보
  const token = sessionStorage.getItem("is_login");

  return (
    <ChatListWrap>
      {token ? (
        <div></div>
      ) : (
        <NoUser>
          <img src={Character} alt="므팅이" />
          <Title>실시간 채팅</Title>
          <Text>다양한 MBTI 사람들과 대화해보세요!</Text>
          <Link to="/login" style={{ textDecorationColor: "var(--maincolor)" }}>
            <ToLogin>로그인하기</ToLogin>
          </Link>
        </NoUser>
      )}
    </ChatListWrap>
  );
};

const ChatListWrap = styled.div``;

const NoUser = styled.div`
  background-color: white;
  margin-top: 120px;
  font-size: 16px;

  & img {
    margin-bottom: 24px;
    width: 100px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const Text = styled.div`
  font-weight: 300;
  margin-bottom: 40px;
`;

const ToLogin = styled.div`
  font-size: 12px;
  color: var(--maincolor);
`;
export default ChatList;
