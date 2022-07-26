// 다양한 MBTI 친구들 user card
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FriendCard = ({ card }) => {
  return (
    <Link
      to="/chatprofile"
      state={{ data: card, from: "recommend" }}
      style={{ textDecoration: "none", color: "#333" }}
    >
      <FriendCardWrap>
        <CardImage>
          <img src={card.userImage[0]} alt="recommend card" />
        </CardImage>
        <CardInfo>
          <NickName>{card.nickname}</NickName>
          <Detail>
            <Mbti>{card.mbti}</Mbti>·
            <Gender> {card.gender === "Male" ? "남성" : "여성"}</Gender>
          </Detail>
          <Introduction>{card.introduction}</Introduction>
        </CardInfo>
      </FriendCardWrap>
    </Link>
  );
};

const FriendCardWrap = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid var(--gray1);
  display: flex;
`;

const CardImage = styled.div`
  width: 100px;
  height: 100px;
  & img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid var(--subcolor);
  }
`;

const CardInfo = styled.div`
  text-align: left;
  margin-left: 20px;
`;

const NickName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Detail = styled.div`
  display: flex;
  color: var(--maincolor);
  align-items: center;
  margin-top: 4px;
`;

const Mbti = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Gender = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Introduction = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--gray3);
  margin-top: 8px;
  width: 100%;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export default FriendCard;
