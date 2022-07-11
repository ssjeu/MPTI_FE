// 더보기 버튼 (수정하기, 삭제하기)
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as commentActions } from "../redux/modules/comment";

import more from "../images/icons/more-horiz@3x.png";

const MoreButton = ({ id, type }) => {
  // type: post or comment
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = ["수정", "삭제"];
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  // 더보기 버튼 클릭 상태
  const [open, setOpen] = useState(0);

  const activeButton = () => {
    setOpen(!open);
  };

  // 수정하기 부분
  const postUpdate = (postId) => {
    navigate("/posts/" + id + "/update");
  };

  const commentUpdate = (cmtId) => {};

  const handleUpdate = () => {
    if (type === "post") postUpdate(id);
    else if (type === "comment") commentUpdate(id);
  };

  // 삭제하기 부분
  const postDelete = (postId) => {
    dispatch(postActions.deletePostAC(postId));
  };

  const commentDelete = (cmtId) => {
    dispatch(commentActions.deleteCommentAC(cmtId));
  };

  const handleDelete = () => {
    if (type === "post") postDelete(id);
    else if (type === "comment") commentDelete(id);
  };

  return (
    <MoreButtonWrap>
      <MoreDropdown>
        <li>
          <img src={more} alt="more" onClick={activeButton} />
          <Menu openState={open}>
            <div onClick={handleUpdate}>수정</div>
            <div onClick={handleDelete}>삭제</div>
          </Menu>
        </li>
      </MoreDropdown>
    </MoreButtonWrap>
  );
};

const MoreButtonWrap = styled.div``;

const MoreDropdown = styled.ul`
  list-style-type: none;
  overflow: hidden;
  margin: 0;
  padding: 0;

  & li {
    display: flex;
    justify-content: flex-end;
  }

  & img {
    display: inline-block;
    width: 20px;
  }
`;

const Menu = styled.div`
  display: ${(props) => (props.openState ? "block" : "none")};
  position: absolute;
  width: 28px;
  margin-top: 16px;
  padding: 4px 24px 4px 8px;
  font-size: 12px;
  color: var(--gray4);
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);

  & div {
    display: block;
    color: var(--gray4);
    text-align: left;
    padding: 2px 0;
  }

  & div:hover {
    color: var(--maincolor);
  }
`;

export default MoreButton;
