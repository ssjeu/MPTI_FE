// 게시글 카드 목록
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../../redux/modules/like";
import { userInfoDB } from "../../redux/modules/userInfo";

import "../../css/component.css";
import PostSwiper from "./PostSwiper";
import MoreButton from "../../elements/MoreButton";

import ProfileCharacter from "../../images/character/profile-character.png";
import Comment from "../../images/icons/chat-bubble-outline@3x.png";
import { ReactComponent as Like } from "../../images/icons/favorite-border.svg";

const PostList = ({ card, user }) => {
  console.log("****", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likes = useSelector((state) => state.like.like);
  const users = useSelector((state) => state.like.user);
  const [likeCount, setLikeCount] = useState(card.countLikes);
  const [likeState, setLikeState] = useState(true);

  const userInfo = useSelector((state) => state.userInfo.user);
  const [postUser, setPostUser] = useState();
  console.log("####", postUser);

  useEffect(() => {
    dispatch(likeActions.getLikeAC(card.postId));
    dispatch(userInfoDB(card.userNum));
  }, []);

  useEffect(() => {
    setPostUser(userInfo);

    if (users) {
      const result = users.find((user) => user === user.userId);
      setLikeState(result ? true : false);
    } else setLikeState(false);
  }, [userInfo]);

  const handleLike = () => {
    if (likeState === false) dispatch(likeActions.addLikeAC(card.postId));
    else if (likeState === true)
      dispatch(likeActions.deleteLikeAC(card.postId));

    setLikeState(!likeState);
  };

  return (
    <PostListWrap>
      <PostWrap className="contents-container">
        <PostInfo>
          {card.userImage.length && card.postCategory !== "익명" ? (
            <img
              src={card.userImage[0]}
              alt="user profile"
              onClick={() => {
                if (card.userNum !== user.userNum)
                  navigate("/chatprofile/" + card.userNum, {
                    state: { data: postUser },
                  });
              }}
            />
          ) : (
            <img src={ProfileCharacter} alt="no profile" />
          )}
          <PostUser>
            {card.postCategory !== "익명" ? card.nickname : "익명"}
            <br />
            <span>{card.createdAt}</span>
          </PostUser>
        </PostInfo>

        <MoreButton id={card.postId} type={"post"} user={card.userId} />
      </PostWrap>

      <PostContents className="contents-container">
        {card.postContent}
        {card.postImage.length === 1 ? (
          <img src={card.postImage.toString()} alt="postImage" />
        ) : card.postImage.length !== 0 ? (
          <PostSwiper card={card} />
        ) : null}
      </PostContents>

      <PostAction className="contents-container">
        <PostButton>
          <Like
            className="icons"
            style={{ fill: likeState === true ? "#ff6565" : "#adadad" }}
            onClick={() => {
              if (user) handleLike();
            }}
          />
        </PostButton>
        좋아요 {likeCount}
        <img src={Comment} alt="comment" />
        댓글 {card.commentCount}
      </PostAction>
    </PostListWrap>
  );
};

const PostListWrap = styled.div`
  text-align: left;
  padding: 20px 0 12px 0;
  background-color: white;
  margin-bottom: 12px;
  color: #333333;

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
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--gray3);
  margin-bottom: 16px;

  & img {
    width: 16px;
    margin: 0 7px 0 20px;
  }
`;

const PostButton = styled.div`
  .icons {
    width: 16px;
    margin: 2px 4px 0 0;
  }
`;

export default PostList;
