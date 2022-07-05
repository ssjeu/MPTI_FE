// 댓글 목록 컴포넌트
import React from "react";
import styled from "styled-components";

const Comment = ({ card }) => {
  return (
    <CommentWrap>
      <CommentInfo>
        <ProfileImage></ProfileImage>
        <PostUser>
          <strong>{card.userId}</strong>
          <span>{card.createdAt}</span><br/>
          <div>{card.comment}</div>
        </PostUser>
      </CommentInfo>
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  text-align: left;
  padding: 16px 20px;
  background-color: white;
  border-bottom: 0.5px solid var(--gray1);
`;

const CommentInfo = styled.div`
  display: flex;
`;

const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: var(--subcolor);
`;

const PostUser = styled.div`
  font-size: 14px;
  margin-left: 8px;

  & span {
    font-size: 10px;
    font-weight: normal;
    color: var(--gray3);
    margin-left: 8px;
  }

  & div {
      margin-top: 4px;
      font-weight: 300;
  }
`;

export default Comment;
