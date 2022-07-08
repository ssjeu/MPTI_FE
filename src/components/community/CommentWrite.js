// 댓글 작성하기 컴포넌트
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentWrite = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.index;

  // 댓글 입력 data
  const content_ref = React.useRef();

  const activeComment = () => {
    if (content_ref.current.value === "") alert("내용을 입력해주세요!");
    else {
      dispatch(commentActions.addCommentAC(postId, content_ref.current.value));
      content_ref.current.value = "";
    }
  };

  return (
    <CommentWriteWrap>
      <CommentInput>
        <input type="text" placeholder="댓글을 입력하세요." ref={content_ref} />
        <InputButton onClick={activeComment}>입력</InputButton>
      </CommentInput>
    </CommentWriteWrap>
  );
};

const CommentWriteWrap = styled.div`
  position: fixed;
  background-color: var(--subcolor);
  height: 80px;
  width: 100%;
  bottom: 80px;
  padding: 0 20px;
`;

const CommentInput = styled.div`
  background-color: #f8f8f8;
  border: 0.5px solid var(--maincolor);
  border-radius: 6px;
  height: 40px;
  width: 90%;
  margin: 20px 0;
  font-size: 16px;

  &:hover {
    border: 1px solid var(--maincolor);
  }

  & input {
    font-size: 16px;
    border: none;
    float: left;
    margin-left: 16px;
    height: 38px;
    width: 70%;
    background-color: #f8f8f8;
  }

  & input:focus {
    // outline-color: var(--maincolor);
    outline: none;
    border: none;
  }

  & input::placeholder {
    color: var(--gray2);
  }
`;

const InputButton = styled.div`
  float: right;
  width: auto;
  padding: 2px 16px;
  margin-top: 5px;
  color: var(--maincolor);
  font-weight: 500;
`;

export default CommentWrite;
