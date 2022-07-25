import React from 'react';
import styled from 'styled-components';
import Button01 from '../elements/Button01';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Character } from '../images/character/Frame.svg';

const MBTITestMain = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TitleArea>
        <h2>MBTI 성격 유형 검사</h2>
        <p>나의 MBTI 성격 유형을 알아볼까요?</p>
        <div>
          <Character />
        </div>
      </TitleArea>

      <NoticeArea>
        <div style={{ margin: '21px 0' }}>
          <span>✅ MBTI 성격 유형 검사 안내사항</span>
        </div>
        <Box>
          <span>🚨&nbsp;&nbsp;믑티에서 제공해드리는 MBTI 성격 유형 검사</span>
          <p>
            약식 테스트이기 때문에 MBTI 정식테스트와 약간의 차이가 있을 수
            있습니다.
          </p>
        </Box>
        <Box style={{ margin: '16px 0 36px 0' }}>
          <span>👉&nbsp;&nbsp;총 검사시간은 보통 10분 내외로 소요 됩니다!</span>
          <p>
            본 성격유형검사는 총 4페이지에 각 5문항씩 나옵니다. 각 문항마다
            평소에 편하고 습관적으로 하는것을 체크해주세요.
          </p>
        </Box>

        <Button01
          backgroundColor='var(--maincolor)'
          color='#fff'
          _onClick={() => navigate('/test/mbti')}
        >
          알겠습니다!
        </Button01>
      </NoticeArea>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const TitleArea = styled.div`
  background-clip: border-box;
  padding: 20px 0 40px 0;

  * {
    margin: 0;
  }

  h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  p {
    font-size: 20px;
    font-weight: 400;
  }

  div {
    margin-top: 41.2px;
  }
`;

const NoticeArea = styled.div`
  * {
    margin: 0;
  }

  width: 100%;
  background-color: var(--subcolor);

  text-align: left;
  box-sizing: border-box;
  padding: 0 5%;

  position: fixed;
  top: 50%;
  bottom: 0;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #2f2f2f;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    color: var(--gray4);
    margin-top: 4px;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  padding: 14px 22px;
  word-break: keep-all;
`;

export default MBTITestMain;
