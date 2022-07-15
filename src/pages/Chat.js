// 1:1 실시간 채팅
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInfoDB } from "../redux/modules/userInfo";

import ChatWrite from "../components/chat/ChatWrite";

const Chat = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // 채팅 메세지
  const [chat, onChangeChat] = useInput();
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log("submit");
  });

  // 상대방 정보
  const user2 = location.state.data;
  console.log(user2);

  // 내 정보
  const token = sessionStorage.getItem("is_login");
  const user1 = useSelector((state) => state.userInfo.user);
  console.log(user1);

  useEffect(() => {
    const userNum = sessionStorage.getItem("userNum");

    if (token) dispatch(userInfoDB(userNum));
  }, []);

  return (
    <div>
      {/* <ChatArea /> */}
      <ChatWrite
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </div>
  );
};

export default Chat;
