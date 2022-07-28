import React from "react";
import styled from "styled-components";

import MainRecommend from "../components/main/MainRecommend";
import BannerCard from "../elements/BannerCard";

import "../css/component.css";
import BannerSwiper from "../components/main/BannerSwiper";
import BannerImg from "../images/banner/main_bn_01.png";
import SubImg01 from "../images/banner/sub_bn_mbti-test.png";
import SubImg02 from "../images/banner/sub_bn_mbti-guide.png";

const Main = () => {
  const bannerTest = [BannerImg, BannerImg];

  return (
    <MainWrap>
      <BannerWrap className="contents-container">
        <BannerSwiper images={bannerTest} />
      </BannerWrap>

      <RecommendWrap>
        <MainRecommend />
      </RecommendWrap>

      <SubWrap className="contents-container">
        <BannerWrap>
          초간단 MBTI 테스트!
          <BannerCard
            src={SubImg01}
            txt={[
              "내 MBTI가 뭐였더라..?",
              "더 빠른 MBTI 테스트",
              "MBTI 약식 테스트 바로가기",
            ]}
            to="/test"
          />
        </BannerWrap>
        <BannerWrap >
          믑티 소개서 ❤️
          <BannerCard
            src={SubImg02}
            txt={[
              "믑티가 처음이신가요?",
              "진짜 찐친을 만나는 곳, 믑티",
              "자세히 보기",
            ]}
            to="/"
          />
        </BannerWrap>
      </SubWrap>
    </MainWrap>
  );
};

const MainWrap = styled.div`
  width: 100%;
  padding: 10px 0 100px 0;
`;

const BannerWrap = styled.div`
  padding-bottom: 40px;
`;

const RecommendWrap = styled.div`
  width: 100%;
`;

const SubWrap = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
`;

export default Main;
