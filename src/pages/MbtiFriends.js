// 다양한 MBTI 친구들
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as recommendActions } from "../redux/modules/recommend";

import "../css/component.css";
import FriendCard from "../elements/FriendCard";
import FilterIcon from "../images/icons/filter-alt@3x.png";

const MbtiFriends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 다양한 MBTI 친구들
  const users = useSelector((state) => state.recommend.mbti);

  // 필터로 선택한 MBTI
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    dispatch(recommendActions.mbtiFriendDB());

    if (location.state !== null) {
      setFilter(location.state.selected);
    }
  }, []);

  return (
    <MbtiFriendsWrap>
      <Top className="contents-container">
        다양한 MBTI 친구들
        <FilterBtn onClick={() => navigate("/mbtifilter")}>
          <img src={FilterIcon} alt="MBTI filter" />
          필터
        </FilterBtn>
      </Top>
      <FriendWrap>
        <div className="contents-container">
          {users && filter !== null
            ? users
                .filter((user) => user.mbti === filter)
                .map((card, index) => <FriendCard card={card} key={index} />)
            : users.map((card, index) => (
                <FriendCard card={card} key={index} />
              ))}
        </div>
      </FriendWrap>
    </MbtiFriendsWrap>
  );
};

const MbtiFriendsWrap = styled.div``;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.8px;
`;

const FilterBtn = styled.div`
  width: 88px;
  height: 32px;
  background-color: var(--maincolor);
  border-radius: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;

const FriendWrap = styled.div`
  border-top: 1px solid var(--gray1);
  margin: 20px 0 100px 0;
`;

export default MbtiFriends;
