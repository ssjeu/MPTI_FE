import React from 'react';
import styled from 'styled-components';

import ProfileImg from '../components/myprofile/ProfileImg';
import Button01 from '../elements/Button01';

const Myprofile = () => {
  const [active, setActive] = React.useState(1);

  const activeChange = () => {
    if (active === 1) {
      setActive(2);
    }
    if (active === 2) {
      setActive(1);
    }
  };

  return (
    <>
      <TabMenu active={active}>
        <button
          onClick={activeChange}
          style={{ color: active === 1 ? 'var(--maincolor)' : 'var(--gray3)' }}
        >
          프로필 수정
        </button>
        <div>|</div>
        <button
          onClick={activeChange}
          style={{ color: active === 2 ? 'var(--maincolor)' : 'var(--gray3)' }}
        >
          내 프로필 미리보기
        </button>
      </TabMenu>

      {active === 1 ? (
        <Container>
          <ProfileImg margin='0 0 51.5px 0' />

          <Introduction>
            <p>자기소개</p>
            <textarea />
          </Introduction>
          <Button01
            backgroundColor='var(--maincolor)'
            color='#fff'
            margin='0 0 30px 0'
          >
            완료
          </Button01>
        </Container>
      ) : (
        <Container>
          <div>사진들어감</div>
        </Container>
      )}
    </>
  );
};

const TabMenu = styled.div`
  margin-bottom: 16px;
  border: none;
  border-bottom: 0.5px solid #ebebeb;

  display: flex;
  flex-flow: row nowrap;

  * {
    margin-bottom: 12.5px;
    font-size: 16px;
    font-weight: 500;
  }

  div {
    color: #ebebeb;
  }

  button {
    width: 100%;
    background: transparent;
    border: none;
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 2.9%;
`;

const Introduction = styled.div`
  p {
    text-align: left;

    margin: 0;
    margin-left: 20px;
    margin-bottom: 11px;

    font-size: 16px;
    font-weight: 500;
  }

  textarea {
    width: 100%;
    min-height: 306px;
    margin-bottom: 43px;

    box-sizing: border-box;
    padding: 15px 19px;
    border-radius: 14px;
    border: solid 1px #c0c9c2;

    resize: none;

    &:focus {
      outline: 0.5px solid #64be72;
    }

    &::placeholder {
      color: #d9d9d9;
    }
  }
`;

export default Myprofile;
