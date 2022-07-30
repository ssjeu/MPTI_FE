import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import MainRecommend from "../components/main/MainRecommend";
import BannerSwiper from "../components/main/BannerSwiper";
import BannerCard from "../elements/BannerCard";

import "../css/component.css";
import MainImg01 from "../images/banner/main_bn_01.png";
import MainImg02 from "../images/banner/main_bn_02.png";
import MainImg03 from "../images/banner/main_bn_03.png";
import SubImg01 from "../images/banner/sub_bn_mbti-test.png";
import SubImg02 from "../images/banner/sub_bn_mbti-guide.png";

const Main = () => {
  const mainImg = [MainImg01, MainImg02, MainImg03];
  const mainUrl = [
    "https://forms.gle/AA16D2RiBQxFvrj29",
    "/mbtifriends",
    "/test",
  ];

  const isTabletOrMobile = useMediaQuery({ maxWidth: 820 });
  //   const [pcScreen, setPcScreen] = useState();

  //   useEffect(() => {

  //   }, [isTabletOrMobile])

  return (
    <MainWrap>
      <SwiperWrap className="contents-container">
        <BannerSwiper images={mainImg} url={mainUrl} />
      </SwiperWrap>

      <RecommendWrap>
        <MainRecommend />
      </RecommendWrap>

      <SubWrap>
        <BannerWrap screen={isTabletOrMobile}>
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
        <BannerWrap screen={isTabletOrMobile}>
          믑티 소개서 ❤️
          <BannerCard
            src={SubImg02}
            txt={[
              "믑티가 처음이신가요?",
              "진짜 찐친을 만나는 곳, 믑티",
              "자세히 보기",
            ]}
            to="/about"
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

const SwiperWrap = styled.div`
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
  margin-right: 5%;
`;

const BannerWrap = styled.div`
  padding-bottom: 40px;
  flex-grow: 1;
  margin-left: 5%;

  width: ${(props) => (props.screen ? "auto" : "200px")};
`;

export default Main;
