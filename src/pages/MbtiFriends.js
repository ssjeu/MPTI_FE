// 다양한 MBTI 친구들
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as recommendActions } from "../redux/modules/recommend";
import { useInView } from "react-intersection-observer";

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

  // 유저 목록 무한 스크롤
  // ref를 div 에 걸어주면 해당 요소가 보이면 inView가 true 로, 안 보이면 false로 자동으로 변경
  const [ref, inView] = useInView();

  const searchStr = (mbti, str) => {
    let res = 0;
    for (let s of str) {
      if ([...mbti].includes(s)) res += 1;
    }
    if (res === str.length) return true;
  };

  useEffect(() => {
    dispatch(recommendActions.mbtiFriendDB());

    if (location.state) {
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
          {filter === null || filter.length === 0
            ? users.map((card, index) => <FriendCard card={card} key={index} />)
            : null}
          {filter && filter.length !== 0
            ? users.map((card, index) => {
                if (searchStr(card.mbti, filter))
                  return <FriendCard card={card} key={index} />;
              })
            : null}
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