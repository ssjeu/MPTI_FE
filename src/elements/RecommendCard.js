// 메인페이지에서 MBTI 추천에 나타나는 유저 card
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TestImg from "../images/user-profile.jpeg";

const RecommendCard = () => {
  const navigate = useNavigate();
  const toPost = () => {
    // navigate("/posts/" + card.postId);
  };

  return (
    <RecommendCardWrap onClick={toPost}>
      <Card>
        <CardImage>
          <img src={TestImg} alt="recommend card" />
        </CardImage>
        <CardTitle>
          <div>
            지은, 22
            <br />
            <span>ENFP</span>
          </div>
        </CardTitle>
      </Card>
    </RecommendCardWrap>
  );
};

const RecommendCardWrap = styled.div``;

const Card = styled.div`
  margin: 10px;
  display: flex;
  align-items: flex-end;
`;

const CardImage = styled.div`
  position: relative;
  width: 140px;
  height: 220px;
  & img {
    width: 140px;
    height: 220px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const CardTitle = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 140px;
  height: 88px;
  background-blend-mode: multiply;
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0) 19%,
    rgba(78, 78, 78, 0.53) 59%
  );
  border-radius: 4px;

  & div {
    margin: auto auto 12px 8px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-align: left;ß
  }

  & span {
    font-size: 12px;
    font-weight: normal;
  }
`;
export default RecommendCard;
