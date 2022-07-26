// 게시글 카드 목록
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoDB } from '../../redux/modules/userInfo';
import { actionCreators as likeActions } from '../../redux/modules/like';

import '../../css/component.css';
import PostSwiper from './PostSwiper';
import MoreButton from '../../elements/MoreButton';

import ProfileCharacter from '../../images/character/profile-character.png';
import Comment from '../../images/icons/chat-bubble-outline@3x.png';
import { ReactComponent as Like } from '../../images/icons/favorite-border.svg';

const PostList = ({ card, click }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 user
  const token = sessionStorage.getItem('is_login');
  const userNum = sessionStorage.getItem('userNum');

  // 게시글 작성 user
  const postUser = useSelector((state) => state.userInfo.user);
  //   console.log(postUser);

  // 좋아요
  const likes = useSelector((state) => state.like.like);
  const likeUsers = useSelector((state) => state.like.user);
  let [likeState, setLikeState] = useState();
  console.log(likes);
  console.log(likeUsers);
  console.log(likeState);

  useEffect(() => {
    dispatch(userInfoDB(card.userNum));
    dispatch(likeActions.getLikeAC(card.postId));
  }, []);

  useEffect(() => {
    if (likeUsers) {
      let res = likeUsers.find((user) => Number(userNum) === Number(user));
      console.log(res);
      setLikeState(res ? true : false);
    } else setLikeState(false);
  }, []);

  // 유저 프로필 보기
  const showProfile = () => {
    navigate('/chatprofile', {
      state: { data: postUser, from: 'postlist' },
    });
  };

  // 커뮤니티 탭에서 post 클릭 시 상세보기
  const showPost = (postId) => {
    if (click === 'yes')
      navigate('/posts/' + postId, {
        state: { data: card },
      });
  };

  // 좋아요
  const handleLike = () => {
    if (likeState) dispatch(likeActions.deleteLikeAC(card.postId));
    else dispatch(likeActions.addLikeAC(card.postId));

    setLikeState(!likeState);
  };

  return (
    <PostListWrap>
      <PostWrap className='contents-container'>
        <PostInfo>
          {card.userImage.length && card.postCategory !== '익명' ? (
            <img
              src={card.userImage[0]}
              alt='user profile'
              onClick={() => showProfile()}
            />
          ) : (
            <img src={ProfileCharacter} alt='no profile' />
          )}
          <PostUser>
            {card.postCategory !== '익명' ? card.nickname : '익명'}
            <br />
            <span>{card.createdAt}</span>
          </PostUser>
        </PostInfo>

        {Number(card.userNum) === Number(userNum) ? (
          <MoreButton id={card.postId} type={'post'} user={card.userId} />
        ) : null}
      </PostWrap>

      <PostContents
        className='contents-container'
        onClick={() => showPost(card.postId)}
      >
        {card.postContent}
        {card.postImage.length === 1 ? (
          <img src={card.postImage.toString()} alt='postImage' />
        ) : card.postImage.length !== 0 ? (
          <PostSwiper card={card} />
        ) : null}
      </PostContents>

      <PostAction className='contents-container'>
        <PostButton
          onClick={() => {
            if (token) handleLike();
          }}
        >
          <Like
            className='icons'
            style={{ fill: likeState === true ? '#ff6565' : '#adadad' }}
          />
        </PostButton>
        좋아요 {card.countLikes}
        <img src={Comment} alt='comment' />
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
  width: 100%;

  & hr {
    opacity: 0.1;
    margin: 12px 0;
  }
`;

const PostWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  width: 100%;

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
