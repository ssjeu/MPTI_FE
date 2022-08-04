// 커뮤니티 게시글 상세페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import PostList from "../components/community/PostList";
import Comment from "../components/community/Comment";
import CommentWrite from "../components/community/CommentWrite";

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
      <PostList card={data} cmtCnt={commentCnt} like={data.countLikes} from="detail"/>
      {data.postImage.length ? (
        <CommentList>
          {comments && comments.length ? (
            comments.map((card, index) => (
              <Comment card={card} key={index} cat={data.postCategory} />
            ))
          ) : (
            <NoComment>
              등록된 댓글이 없습니다. 가장 먼저 작성해볼까요?
            </NoComment>
          )}
        </CommentList>
      ) : (
        <CommentList2>
          {comments && comments.length ? (
            comments.map((card, index) => (
              <Comment card={card} key={index} cat={data.postCategory} />
            ))
          ) : (
            <NoComment>
              등록된 댓글이 없습니다. 가장 먼저 작성해볼까요?
            </NoComment>
          )}
        </CommentList2>
      )}

      <CommentWrite />
    </PostDetailWrap>
  );
};

const PostDetailWrap = styled.div`
  min-height: calc(100vh - 124.5px);
  height: auto;
`;

const CommentList = styled.div`
  margin-bottom: 80px;
  height: 100%;
`;

const CommentList2 = styled.div`
  margin-bottom: 80px;
  min-height: 600px;
  height: 100%;
`;

const NoComment = styled.div`
  margin-top: 28px;
  color: var(--gray4);
  font-weight: 300;
  font-size: 14px;
`;

export default PostDetail;
