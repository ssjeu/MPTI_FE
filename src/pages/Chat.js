// 1:1 실시간 채팅
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInfoDB } from "../redux/modules/userInfo";

import ChatWrite from "../components/chat/ChatWrite";

const Chat = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // 상대방 정보
  const user2 = location.state.data;
  console.log(user2);

  // 내 정보
  const token = localStorage.getItem("is_login");
  const user1 = useSelector((state) => state.userInfo.user);
  console.log(user1);

  useEffect(() => {
    const userNum = localStorage.getItem("userNum");

    if (token) dispatch(userInfoDB(userNum));
  }, []);

  return (
    <div>
      <ChatWrite />
    </div>
  );
};

export default Chat;
