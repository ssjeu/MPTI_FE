// 커뮤니티 게시글 상세페이지
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

import PostList from '../components/community/PostList';
import Comment from '../components/community/Comment';
import CommentWrite from '../components/community/CommentWrite';

const PostDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state.data;

  const comments = useSelector(
    (state) => state.post.detail_post.existingComment
  );
  const [commentCnt, setCommentCnt] = useState();

  useEffect(() => {
    dispatch(postActions.detailPostDB(data.postId));
  }, []);

  useEffect(() => {
    if (comments) setCommentCnt(comments.length);
  }, [comments]);

  return (
    <PostDetailWrap>
      <PostList card={data} cmtCnt={commentCnt} like={data.countLikes} />
      {data.postImage.length ? (
        <CommentList>
          {comments &&
            comments.map((card, index) => (
              <Comment card={card} key={index} cat={data.postCategory} />
            ))}
        </CommentList>
      ) : (
        <CommentList2>
          {comments &&
            comments.map((card, index) => (
              <Comment card={card} key={index} cat={data.postCategory} />
            ))}
        </CommentList2>
      )}

      <CommentWrite />
    </PostDetailWrap>
  );
};

const PostDetailWrap = styled.div`
  position: relative;
`;

const CommentList = styled.div`
  // margin-bottom: 80px;
  height: 100%;
`;

const CommentList2 = styled.div`
  margin-bottom: 80px;
  min-height: 600px;
  height: 100%;
`;

export default PostDetail;
