// 메인페이지에서 커뮤니티 목록에 들어가는 게시글 card
import React from "react";
import styled from "styled-components";

const PostCard = ({ card }) => {
  return (
    <PostCardWrap>
      <Card>
        <CardImage>
          <img src={card.postImage[0]} alt="postcard" />
        </CardImage>
        <CardTitle><span>{card.postContent}</span></CardTitle>
      </Card>
    </PostCardWrap>
  );
};

const PostCardWrap = styled.div``;

const Card = styled.div`
  margin: 10px;
  display: flex;
  align-items: flex-end;
`;

const CardImage = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  & img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const CardTitle = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 160px;
  height: 88px;
  background-blend-mode: multiply;
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0) 19%,
    rgba(78, 78, 78, 0.53) 59%
  );
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: bold;

  & span{
    margin: auto auto 20px 12px;
  }
`;
export default PostCard;
