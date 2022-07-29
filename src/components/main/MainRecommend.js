// 메인페이지 나와 잘맞는 MBTI 추천
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as recommendActions } from "../../redux/modules/recommend";

import "../../css/component.css";
import RecommendCard from "../../elements/RecommendCard";
import Modal from "../Modal";
import Information from "../../images/icons/info_FILL0_wght400_GRAD0_opsz48.png";
import ExcelImg from "../../images/banner/excel.png";

const MainRecommend = () => {
  const dispatch = useDispatch();

  // 유저 정보
  const token = sessionStorage.getItem("is_login");

  // 나와 잘 맞는 MBTI 유저 list
  const users = useSelector((state) => state.recommend.list);

  // info 모달창
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (token) dispatch(recommendActions.recommendDB());
  }, []);

  const onClickInfo = useCallback(() => {
    setShowInfo((prev) => !prev);
  }, []);

  return (
    <MainRecommendWrap>
      <RecommendTitle className="contents-container">
        나와 잘 맞는 MBTI{" "}
        <img src={Information} alt="info" onClick={onClickInfo} />
        {showInfo && (
          <Modal
            open={showInfo}
            close={onClickInfo}
            header="나와 잘 맞는 MBTI 추천"
          >
            <img src={ExcelImg} alt="MBTI 궁합표" style={{ height: "200px" }} />
            <h6>MBTI 궁합표에 의해 추천되는 데이터입니다.</h6>
          </Modal>
        )}
      </RecommendTitle>

      <RecommendCardWrap>
        {token && users ? (
          users.map((card, index) => <RecommendCard card={card} key={index} />)
        ) : token ? (
          <NoCard>
            아직 찾지 못했어요😥 <span>랜덤 매칭</span>은 어떠신가요?
          </NoCard>
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
  display: flex;
  align-items: flex-end;

  & img {
    height: 18px;
    opacity: 0.5;
    margin: 0 0 2px 6px;
  }

  & img:hover {
    cursor: pointer;
  }
`;

const RecommendCardWrap = styled.div`
  display: flex;
  margin-left: -10px;
  padding: 12px 5%;
  overflow-x: scroll;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
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
