// 메인페이지에서 나와 잘맞는 MBTI 추천
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as recommendActions } from "../../redux/modules/recommend";

import RecommendCard from "../../elements/RecommendCard";

const MainRecommend = () => {
  const dispatch = useDispatch();

  // 유저 정보
  const token = localStorage.getItem("is_login");

  // 나와 잘 맞는 MBTI 유저 list
  const users = useSelector((state) => state.recommend.list);

  useEffect(() => {
    if (token) {
      dispatch(recommendActions.recommendDB());
    }
  }, []);

  return (
    <MainRecommendWrap>
      <RecommendTitle>나와 잘 맞는 MBTI</RecommendTitle>

      <RecommendCardWrap>
        {token && users ? (
          users.map((card, index) => <RecommendCard card={card} key={index} />)
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <NoCard>
              <span>로그인</span> 후 나와 잘 맞는 MBTI 친구들을 만나보세요!
            </NoCard>
          </Link>
        )}
      </RecommendCardWrap>
    </MainRecommendWrap>
  );
};

const MainRecommendWrap = styled.div``;

const RecommendTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
`;

const RecommendCardWrap = styled.div`
  display: flex;
  margin-left: -10px;
  padding: 12px 0;
  overflow-x: scroll;
`;

const NoCard = styled.div`
  margin-left: 10px;
  color: var(--gray3);
  font-size: 14px;
  font-weight: 400;

  & span {
    border-bottom: 1px solid var(--gray3);
  }
`;

export default MainRecommend;
