// 다양한 MBTI 친구들 필터
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import "../css/component.css";
import MbtiSelect from "../components/MbtiFilterSelect";
import MainButton from "../elements/MainButton";

const MbtiFilter = () => {
  const navigate = useNavigate();
  const [mbti, setMbti] = useState();

  const userMbti = (x) => {
    setMbti(x);
  };

  const completed = () => {
    navigate("/mbtifriends", { state: { selected: mbti } });
    console.log(mbti);
  };

  return (
    <MbtiFilterWrap>
      <Intro>
        <Detail className="container">
          원하는 MBTI의 일부 선택이 가능해요!
          <br />
          <br />
          선택을 모두 해제하실 경우, 자동으로 믑티 추천순으로 다양한 MBTI
          친구들을 만나보실 수 있습니다.
        </Detail>
      </Intro>

      <MbtiSelectWrap className="container">
        <MbtiSelect parent={userMbti} />
      </MbtiSelectWrap>

      <MbtiButtonWrap className="container" onClick={completed}>
        <MainButton text="완료" />
      </MbtiButtonWrap>
    </MbtiFilterWrap>
  );
};

const MbtiFilterWrap = styled.div`
  background-color: white;
  padding-bottom: 60px;
  height: calc(100% - 124.5px);
`;

const Intro = styled.div`
  background-color: white;
  height: 136px;
  border-bottom: 12px solid var(--gray1);
`;

const Detail = styled.div`
  color: var(--gray3);
  font-size: 14px;
  letter-spacing: -0.8px;
  text-align: left;
  padding: 40px auto;
  word-break: keep-all;
`;

const MbtiSelectWrap = styled.div`
  margin-top: 40px;
  padding: auto;
`;

const MbtiButtonWrap = styled.div`
  & :hover {
    cursor: pointer;
  }
`;

export default MbtiFilter;
