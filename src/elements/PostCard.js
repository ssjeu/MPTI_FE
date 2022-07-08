// 메인페이지에서 커뮤니티 목록에 들어가는 게시글 card
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
        <CardTitle>
          <div>
            {card.postContent}
            <br />
            <span>{card.userId.slice(0, 10)}</span>
          </div>
        </CardTitle>
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

  & div {
    margin: auto auto 12px 8px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
  }

  & span {
    font-size: 12px;
    font-weight: normal;
  }
`;
export default PostCard;
