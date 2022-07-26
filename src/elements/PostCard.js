// 메인페이지 MBTI 커뮤니티 게시글 card
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostCard = ({ card }) => {
  const navigate = useNavigate();
  const toPost = () => {
    navigate("/posts/" + card.postId);
  };

  return (
    <PostCardWrap onClick={toPost}>
      <Card>
        <CardImage>
          <img src={card.postImage[0]} alt="postcard" />
        </CardImage>
        <CardContent>
          <Title>{card.postContent}</Title>
          <User>{card.nickname}</User>
        </CardContent>
      </Card>
    </PostCardWrap>
  );
};

const PostCardWrap = styled.div``;

const Card = styled.div`
  margin: 10px;
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const CardImage = styled.div`
  width: 160px;
  height: 160px;

  & img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const CardContent = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 160px;
  height: 80px;
  background-blend-mode: multiply;
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0) 19%,
    rgba(78, 78, 78, 0.53) 59%
  );
  border-radius: 4px;
  flex-wrap: wrap;

  & div {
    width: 144px;
    margin-left: 8px;
    color: white;
    text-align: left;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
`;

const User = styled.div`
  font-size: 12px;
  font-weight: normal;
  margin: -28px auto 12px auto;
`;

export default PostCard;
