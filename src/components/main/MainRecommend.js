// 메인페이지에서 나와 잘맞는 MBTI 추천
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import RecommendCard from "../../elements/RecommendCard";

const MainRecommend = () => {
  return (
    <MainRecommendWrap>
      <RecommendTitle>나와 잘 맞는 MBTI</RecommendTitle>
      <RecommendCardWrap>
        <RecommendCard />
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
  flex-wrap: wrap;
  margin-left: -10px;
  padding: 12px 0;
`;

export default MainRecommend;
