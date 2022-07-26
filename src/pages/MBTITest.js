import React from 'react';
import styled from 'styled-components';
import Pagination from '../components/mbti_test/Pagination';
import Button01 from '../elements/Button01';
import { mbtiTestApi } from '../shared/api';

import { answer } from '../shared/mbti_question';

const MBTITest = () => {
  const [isActive, setIsActive] = React.useState(0);
  const [first, setFirst] = React.useState([null, null, null, null, null]);
  const [second, setSecond] = React.useState([null, null, null, null, null]);
  const [third, setThird] = React.useState([null, null, null, null, null]);
  const [fourth, setFourth] = React.useState([null, null, null, null, null]);

  const firstNewArray = [...first];
  const secondNewArray = [...second];
  const thirdNewArray = [...third];
  const fourthNewArray = [...fourth];

  const onNext = () => {
    if (3 > isActive) {
      setIsActive(isActive + 1);
    }

    if (isActive === 3) {
      mbtiTestApi
        .mbtiTest(first, second, third, fourth)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const normalBtn = {
    backgroundColor: '#f9fdf9',
    border: '0.5px solid var(--maincolor)',
  };

  const activeBtn = {
    backgroundColor: 'var(--maincolor)',
    border: 'none',
    color: '#fff',
  };

  return (
    <div>
      <Wrap>
        <Pagination state={isActive} />
        <h3>
          자신을 가장 잘 나타낸다고
          <br />
          생각되는 문항을 선택해주세요!
        </h3>
        {isActive === 0 ? (
          <div>
            {answer.slice(0, 5).map((list, idx) => {
              return (
                <>
                  <h3>Q1-{idx + 1}</h3>

                  <QuestionBtns>
                    <button
                      onClick={() => {
                        firstNewArray[idx] = 'E';
                        setFirst(firstNewArray);
                      }}
                      style={first[idx] === 'E' ? activeBtn : normalBtn}
                    >
                      {list[0]}
                    </button>
                    <button
                      onClick={() => {
                        firstNewArray[idx] = 'I';
                        setFirst(firstNewArray);
                      }}
                      style={first[idx] === 'I' ? activeBtn : normalBtn}
                    >
                      {list[1]}
                    </button>
                  </QuestionBtns>
                </>
              );
            })}
          </div>
        ) : null}

        {isActive === 1 ? (
          <div>
            {answer.slice(5, 10).map((list, idx) => {
              return (
                <>
                  <h3>Q2-{idx + 1}</h3>

                  <QuestionBtns>
                    <button
                      onClick={() => {
                        secondNewArray[idx] = 'S';
                        setSecond(secondNewArray);
                      }}
                      style={second[idx] === 'S' ? activeBtn : normalBtn}
                    >
                      {list[0]}
                    </button>
                    <button
                      onClick={() => {
                        secondNewArray[idx] = 'N';
                        setSecond(secondNewArray);
                      }}
                      style={second[idx] === 'N' ? activeBtn : normalBtn}
                    >
                      {list[1]}
                    </button>
                  </QuestionBtns>
                </>
              );
            })}
          </div>
        ) : null}

        {isActive === 2 ? (
          <div>
            {answer.slice(10, 15).map((list, idx) => {
              return (
                <>
                  <h3>Q3-{idx + 1}</h3>

                  <QuestionBtns>
                    <button
                      onClick={() => {
                        thirdNewArray[idx] = 'T';
                        setThird(thirdNewArray);
                      }}
                      style={third[idx] === 'T' ? activeBtn : normalBtn}
                    >
                      {list[0]}
                    </button>
                    <button
                      onClick={() => {
                        thirdNewArray[idx] = 'F';
                        setThird(thirdNewArray);
                      }}
                      style={third[idx] === 'F' ? activeBtn : normalBtn}
                    >
                      {list[1]}
                    </button>
                  </QuestionBtns>
                </>
              );
            })}
          </div>
        ) : null}

        {isActive === 3 ? (
          <div>
            {answer.slice(15, 20).map((list, idx) => {
              return (
                <>
                  <h3>Q4-{idx + 1}</h3>

                  <QuestionBtns>
                    <button
                      onClick={() => {
                        fourthNewArray[idx] = 'J';
                        setFourth(fourthNewArray);
                      }}
                      style={fourth[idx] === 'J' ? activeBtn : normalBtn}
                    >
                      {list[0]}
                    </button>
                    <button
                      onClick={() => {
                        fourthNewArray[idx] = 'P';
                        setFourth(fourthNewArray);
                      }}
                      style={fourth[idx] === 'P' ? activeBtn : normalBtn}
                    >
                      {list[1]}
                    </button>
                  </QuestionBtns>
                </>
              );
            })}
          </div>
        ) : null}
      </Wrap>

      <ButtonWrap>
        <Button01
          _onClick={onNext}
          backgroundColor='var(--maincolor)'
          color='#fff'
          margin='0 0 30px 0'
        >
          {isActive === 3 ? '완료하기' : '다음으로'}
        </Button01>
      </ButtonWrap>
    </div>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  padding: 0 10.7%;
  text-align: left;

  width: 100%;

  & > h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 40px;
  }

  & > div > h3 {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 20px;
  }
`;

const QuestionBtns = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-bottom: 40px;

  button {
    border-radius: 26px;
    padding: 14px 27px;
    text-align: left;
    word-break: keep-all;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 5.6%;
  margin-top: 64px;
  margin-bottom: 56px;
`;

export default MBTITest;
