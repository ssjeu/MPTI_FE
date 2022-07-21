import React from 'react';
import styled from 'styled-components';
import { mbtiTestApi } from '../shared/api';

import { answer_top, answer_bottom, answer } from '../shared/mbti_question';

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

  return (
    <>
      {isActive === 0 ? (
        <div>
          {answer.slice(0, 5).map((list, idx) => {
            return (
              <>
                <h3>Q {idx + 1}</h3>

                <QuestionBtns>
                  <button
                    onClick={() => {
                      firstNewArray[idx] = 'E';
                      setFirst(firstNewArray);
                    }}
                  >
                    {list[0]}
                  </button>
                  <button
                    onClick={() => {
                      firstNewArray[idx] = 'I';
                      setFirst(firstNewArray);
                    }}
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
                <h3>Q {idx + 1}</h3>

                <QuestionBtns>
                  <button
                    onClick={() => {
                      secondNewArray[idx] = 'S';
                      setSecond(secondNewArray);
                    }}
                  >
                    {list[0]}
                  </button>
                  <button
                    onClick={() => {
                      secondNewArray[idx] = 'N';
                      setSecond(secondNewArray);
                    }}
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
                <h3>Q {idx + 1}</h3>

                <QuestionBtns>
                  <button
                    onClick={() => {
                      thirdNewArray[idx] = 'T';
                      setThird(thirdNewArray);
                    }}
                  >
                    {list[0]}
                  </button>
                  <button
                    onClick={() => {
                      thirdNewArray[idx] = 'F';
                      setThird(thirdNewArray);
                    }}
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
                <h3>Q {idx + 1}</h3>

                <QuestionBtns>
                  <button
                    onClick={() => {
                      fourthNewArray[idx] = 'J';
                      setFourth(fourthNewArray);
                    }}
                  >
                    {list[0]}
                  </button>
                  <button
                    onClick={() => {
                      fourthNewArray[idx] = 'P';
                      setFourth(fourthNewArray);
                    }}
                  >
                    {list[1]}
                  </button>
                </QuestionBtns>
              </>
            );
          })}
        </div>
      ) : null}

      {isActive === 4 ? (
        <div>
          {answer.slice(5, 10).map((list, idx) => {
            return (
              <>
                <h3>Q {idx + 1}</h3>

                <QuestionBtns>
                  <button>{list[0]}</button>
                  <button>{list[1]}</button>
                </QuestionBtns>
              </>
            );
          })}
        </div>
      ) : null}

      <button onClick={onNext}>{isActive === 3 ? '완료' : '다음으로~~'}</button>
    </>
  );
};

const QuestionBtns = styled.div`
  display: flex;
  flex-flow: column;
`;

export default MBTITest;
