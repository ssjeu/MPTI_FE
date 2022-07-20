// 1:1 채팅 목록
import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatListAC } from "../redux/modules/chat";

import ChatListCard from "../elements/ChatListCard";
import Character from "../images/character/frame-main@3x.png";

const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("is_login");
  const rooms = useSelector((state) => state.chat.rooms);
  const info = useSelector((state) => state.chat.userInfo);

  useEffect(() => {
    dispatch(chatListAC());
  }, []);

  return (
    <ChatListWrap>
      {token && rooms ? (
        rooms.map((room, index) => (
          <div
            onClick={() => {
              navigate("/chat", { state: { data: info[index], room: room } });
            }}
            key={index}
          >
            <ChatListCard data={room} info={info[index]} />
            <hr />
          </div>
        ))
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

const ChatListWrap = styled.div`
  & hr {
    opacity: 0.16;
  }
`;
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
