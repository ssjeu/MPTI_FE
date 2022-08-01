// 댓글 목록 컴포넌트
import React from "react";
import styled from "styled-components";

import MoreButton from "../../elements/MoreButton";
import ProfileCharacter from "../../images/character/profile-character.png";

const Comment = ({ card, cat }) => {
  const userNum = sessionStorage.getItem("userNum");

  return (
    <CommentWrap className="contents-container">
      <CommentInfo>
        {card.userImage.length && cat !== "익명" ? (
          <img src={card.userImage[0]} alt="user profile" />
        ) : (
          <img src={ProfileCharacter} alt="no profile" />
        )}
        <PostUser>
          <strong>{cat !== "익명" ? card.nickname: "익명"}</strong>
          <span>{card.createdAt}</span>
          <br />
          <div>{card.comment}</div>
        </PostUser>
      </CommentInfo>

      {Number(card.userNum) === Number(userNum) ? (
        <MoreButton id={card.commentId} type={"comment"} user={card.userId} />
      ) : null}
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  text-align: left;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: white;
  border-bottom: 0.5px solid var(--gray1);
  display: flex;
  justify-content: space-between;
`;

const CommentInfo = styled.div`
  display: flex;

  & img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background-color: var(--subcolor);
    border: 1px solid var(--gray1);
  }
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
