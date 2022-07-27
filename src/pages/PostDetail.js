// 커뮤니티 게시글 상세페이지
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

import PostList from '../components/community/PostList';
import Comment from '../components/community/Comment';
import CommentWrite from '../components/community/CommentWrite';
import comment from '../redux/modules/comment';

const PostDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state.data;

  const comments = useSelector(
    (state) => state.post.detail_post.existingComment
  );

  // 서버에서 postlist, comments 로드
  useEffect(() => {
    dispatch(postActions.detailPostDB(data.postId));
  }, []);

  return (
    <PostDetailWrap>
      <PostList card={data} />
      <CommentList>
        {comments &&
          comments.map((card, index) => <Comment card={card} key={index} />)}
      </CommentList>
      <CommentWrite />
    </PostDetailWrap>
  );
};

const PostDetailWrap = styled.div`
  background-color: var(--gray1);
  position: relative;
`;

const CommentList = styled.div`
  margin-top: 4px;
  margin-bottom: 80px;
`;

export default PostDetail;
