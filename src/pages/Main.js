import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import MainRecommend from "../components/main/MainRecommend";
import MainCommunity from "../components/main/MainCommunity";

import "../css/component.css";
import "../css/transition.css";
import character from "../images/character/frame-main@3x.png";
import BannerSwiper from "../components/main/BannerSwiper";

const Main = () => {
  const navigate = useNavigate();

  const [bannerTest, setBannerTest] = React.useState([
    "https://d3g3p5loxgntj5.cloudfront.net/bikes/1631178475273847.jpg?d=900x600",
    "https://d3g3p5loxgntj5.cloudfront.net/bikes/1631178475273847.jpg?d=900x600",
  ]);

  return (
      <MainWrap>
        <MainIntro>
          <img src={character} alt="므팅이" />
          <div>
            다양한 MBTI 중에
            <br /> <span>나의 찐친을 찾아봐요✨</span>
          </div>
        </MainIntro>

        <MainButtons className="contents-container">
          <FriendsButton onClick={() => navigate("/mbtifriends")}>
            다양한 MBTI 친구들 만나기
          </FriendsButton>
          <TestButton onClick={() => navigate("/test")}>
            내 MBTI 테스트하러 가기
          </TestButton>
        </MainButtons>

        <RecommendWrap>
          <MainRecommend />
        </RecommendWrap>

        <CommunityWrap className="contents-container">
          <MainCommunity />
        </CommunityWrap>

        <BannerWrap className="contents-container">
          {/* <BannerSwiper images={bannerTest} /> */}
        </BannerWrap>
      </MainWrap>
  );
};

const MainWrap = styled.div`
  width: 100%;
  padding: 10px 0 2px 0;
`;

const MainIntro = styled.div`
  margin: 30px auto;

  & img {
    width: 104px;
  }

  & div {
    padding: 24px 0;
    font-size: 24px;
    font-weight: 300;
    letter-spacing: -1.2px;
  }

  & span {
    font-weight: 500;
  }
`;

const MainButtons = styled.div`
  width: 100%;
  margin: 30px auto 20px auto;
  padding-bottom: 20px;

  & div {
    height: 60px;
    border-radius: 10px;
    // box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FriendsButton = styled.div`
  background-color: var(--maincolor);
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const TestButton = styled.div`
  width: 100%;
  color: var(--maincolor);
  border: 1px solid var(--maincolor);
  margin-top: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const RecommendWrap = styled.div`
  padding-top: 20px;
  width: 100%;
`;

const CommunityWrap = styled.div`
  width: 100%;
  margin: 20px auto 80px auto;
  background-color: var(--subcolor);
  padding-top: 40px;
  padding-bottom: 60px;
`;

const BannerWrap = styled.div``;

export default Main;
