// ChatList 목록
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../css/component.css";

const ChatListCard = ({ data, info }) => {
  let today = new Date().toLocaleDateString();
  const dataTime = data.recentMessageTime;
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    if (dataTime) {
      setDate(dataTime.substring(0, 12));
      setTime(dataTime.substring(13, 19));

      const year = Number(today.split(".")[0]);
      let month = Number(today.split(".")[1].trim());
      if (month < 10) {
        month = "0" + month;
      }
      let day = Number(today.split(".")[2].trim());
      if (day < 10) {
        day = "0" + day;
      }
      const todayDate = year + ". " + month + ". " + day;

      if (date === todayDate) setText(time);
      else setText(date); //.substr(6, 6)
    }
  }, [date, time]);

  return (
    <ChatListCardWrap className="contents-container">
      <ProfileImage src={info.userImage} alt="profile" />

      <Contents>
        <Top>
          <UserInfo>
            <Name>{info.nickname}</Name>
            <Mbti>{info.mbti}</Mbti>
          </UserInfo>
          <Time>{text}</Time>
        </Top>

        <Bottom>
          <Message>{data.recentMessage}</Message>
          <Alarm>12</Alarm>
        </Bottom>
      </Contents>
    </ChatListCardWrap>
  );
};

const ChatListCardWrap = styled.div`
  display: flex;
  margin: 16px auto;
  text-align: left;

  &:hover {
    cursor: pointer;
  }
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  object-fit: cover;
`;

const Contents = styled.div`
  margin-left: 16px;
  width: 100vw;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Mbti = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--gray4);
  margin: auto 4px;
`;

const Time = styled.div`
  font-size: 12px;
  color: var(--gray4);
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
`;

const Message = styled.div`
  font-size: 16px;
`;

const Alarm = styled.div`
  background-color: var(--pointcolor);
  width: 28px;
  height: 20px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  opacity: 0;
`;

export default ChatListCard;
