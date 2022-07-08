// 게시글 카드 목록
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators as likeActions } from "../../redux/modules/like";

import "../../css/component.css";
import PostSwiper from "./PostSwiper";
import Like from "../../images/favorite-border@3x.png";
import Comment from "../../images/chat-bubble-outline@3x.png";
import MoreButton from "../../elements/MoreButton";
import ProfileCharacter from "../../images/character/profile-character.png";

const PostList = ({ card }) => {
  const token = localStorage.getItem("is_login");
  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  const userId = parseJwt(token).userId;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likes = useSelector((state) => state.like.like);
  const users = useSelector((state) => state.like.user);
  const [likeCount, setLikeCount] = useState();
  const [likeState, setLikeState] = useState();

  useEffect(() => {
    dispatch(likeActions.getLikeAC(card.postId));
  }, []);

  useEffect(() => {
    setLikeCount(likes);
    if (users) {
      const result = users.find((user) => user === userId);
      console.log("setLikeCount", result);
      setLikeState(result ? true : false);
      console.log("setLikeCount2", likeState);
    } else setLikeState(false);
  }, [likes]);

  const handleLike = () => {
    console.log("handleLike!");
    if (likeState === false) dispatch(likeActions.addLikeAC(card.postId));
    else if (likeState === true)
      dispatch(likeActions.deleteLikeAC(card.postId));

    setLikeState(!likeState);
    console.log("handleLike2", likeState);
  };

  return (
    <PostListWrap>
      <PostWrap className="contents-container">
        <PostInfo>
          {card.userImage.length ? (
            <img src={card.userImage[0]} alt="user profile" />
          ) : (
            <img src={ProfileCharacter} alt="no profile" />
          )}
          <PostUser>
            {card.userId}
            <br />
            <span>{card.createdAt}</span>
          </PostUser>
        </PostInfo>
        <MoreButton id={card.postId} type={"post"} />
      </PostWrap>

      <PostContents
        onClick={() => {
          navigate("/posts/" + card.postId);
        }}
        className="contents-container"
      >
        {card.postContent}
        {card.postImage.length === 1 ? (
          <img src={card.postImage.toString()} alt="postImage" />
        ) : card.postImage.length !== 0 ? (
          <PostSwiper card={card} />
        ) : null}
      </PostContents>

      <PostAction
        onClick={() => {
          navigate("/posts/" + card.postId);
        }}
        className="contents-container"
      >
        좋아요 {likeCount} &nbsp;&nbsp; <img src={Comment} alt="comment" />
        댓글 {card.commentCount}
      </PostAction>
      <hr />
      <PostButton
        className={
          likeState === true
            ? "contents-container active"
            : "contents-container"
        }
      >
        <img
          src={Like}
          alt="like"
          //   onClick={handleLike}
        />
      </PostButton>
    </PostListWrap>
  );
};

const PostListWrap = styled.div`
  text-align: left;
  padding: 20px 0 12px 0;
  background-color: white;
  margin-bottom: 12px;

  & hr {
    opacity: 0.1;
    margin: 12px 0;
  }
`;

const PostWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;

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

  display: flex;
  align-items: center;

  & img {
    width: 16px;
    margin: 0 8px;
  }
`;

const PostButton = styled.div.attrs((props) => ({
  className: props.className,
}))`
  & img {
    width: 16px;
    margin-right: 20px;
  }

  &.active {
    border-bottom: 1px solid red;
  }
`;

export default PostList;
