// 커뮤니티 게시글 상세페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import PostList from "../components/community/PostList";
import CommentList from "../components/community/Comment";
import CommentWrite from "../components/community/CommentWrite";

const PostDetail = () => {
  const params = useParams();
  const id = params.index;

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.post.detail_post.existingComment);

  // 서버에서 postlist, comments 로드
  useEffect(() => {
    dispatch(postActions.postDB());
    dispatch(postActions.detailPostDB(id));
  }, []);

  const result = posts.find((post) => post.postId === Number(id));

  return (
    <PostDetailWrap>
      {/* <PostList card={posts[postId]} /> */}
      <PostList card={result} />
      <Comment>
        {comments.map((card, index) => (
          <CommentList card={card} key={index}/>
        ))}
        </Comment>
      <CommentWrite />
    </PostDetailWrap>
  );
};

const PostDetailWrap = styled.div`
  background-color: var(--gray1);
`;

const Comment = styled.div`
  margin-top: 4px;
  margin-bottom: 80px;
`;

export default PostDetail;
