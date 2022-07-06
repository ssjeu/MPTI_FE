// 더보기 버튼 (수정하기, 삭제하기)
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as moreActions } from "../redux/modules/comment";

import more from "../images/icons/more-horiz@3x.png";

const MoreButton = ({ id, type }) => {
  console.log(id, type); // type: post or comment
  const dispatch = useDispatch();

  const options = ["수정", "삭제"];
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const activeButton = () => {
    setOpen(!open);
  };

  const commentDelete = (cmtId) => {
    dispatch(moreActions.deleteCommentAC(cmtId));
  };

  const handleDelete = () => {
    if (type === "post") {
    } else if (type === "comment") {
      commentDelete(id);
    }
  };

  return (
    <MoreButtonWrap>
      <MoreDropdown>
        <li>
          <img src={more} alt="more" onClick={activeButton} />
          <Menu display={open}>
            <div>수정</div>
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
  display: ${(props) => (props.display ? "block" : "none")};
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
