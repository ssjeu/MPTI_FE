// 게시글 카드 목록
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PostSwiper from "./PostSwiper";
import Like from "../../images/favorite-border@3x.png";
import Comment from "../../images/chat-bubble-outline@3x.png";

const PostList = ({ card }) => {
  const navigate = useNavigate();

  return (
    <PostWrap
      onClick={() => {
        navigate("/posts/" + card.postId);
      }}
    >
      <PostInfo>
        <ProfileImage></ProfileImage>
        <PostUser>
          {card.userId}
          <br />
          <span>{card.createdAt}</span>
        </PostUser>
      </PostInfo>

      <PostContents>
        {card.postContent}
        {card.postImage.length === 1 ? (
          <img src={card.postImage.toString()} alt="postImage" />
        ) : card.postImage.length !== 0 ? (
          <PostSwiper card={card} />
        ) : null}
      </PostContents>

      <PostAction>
        좋아요 {card.commentCount} &nbsp;&nbsp;&nbsp; 댓글 {card.commentCount}
        <hr />
      </PostAction>

      <PostButton>
        <img src={Like} alt="like" />
        <img src={Comment} alt="comment" />
      </PostButton>
    </PostWrap>
  );
};

const PostWrap = styled.div`
  text-align: left;
  padding: 20px 20px 12px 20px;
  background-color: white;
  margin-bottom: 12px;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: var(--subcolor);
`;

const PostUser = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;

  & span {
    font-size: 10px;
    font-weight: normal;
    color: var(--gray3);
  }
`;

const PostContents = styled.div`
  margin: 12px 0;
  font-size: 16px;

  & img {
    border-radius: 6px;
    width: 100%;
    margin: 12px 0 4px 0;
  }
`;

const PostAction = styled.div`
  font-size: 14px;
  color: var(--gray3);

  & hr {
    opacity: 0.1;
    margin: 12px 0;
  }
`;

const PostButton = styled.div`
  & img {
    width: 16px;
    margin-right: 20px;
  }
`;

export default PostList;
