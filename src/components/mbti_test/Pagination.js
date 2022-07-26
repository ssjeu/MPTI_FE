import React from 'react';
import styled from 'styled-components';

const Pagination = (props) => {
  const { state } = props;

  return (
    <>
      <Container>
        <span>{Number(state) + 1}/4</span>
        <div>
          <div
            style={{
              backgroundColor:
                state === 0 ? 'var(--maincolor)' : 'var(--gray1)',
            }}
          />
          <div
            style={{
              backgroundColor:
                state === 1 ? 'var(--maincolor)' : 'var(--gray1)',
            }}
          />
          <div
            style={{
              backgroundColor:
                state === 2 ? 'var(--maincolor)' : 'var(--gray1)',
            }}
          />
          <div
            style={{
              backgroundColor:
                state === 3 ? 'var(--maincolor)' : 'var(--gray1)',
            }}
          />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  text-align: right;

  span {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray2);
  }

  & > div {
    display: flex;
    gap: 7px;
    margin-top: 4px;
    margin-bottom: 26px;
  }

  & > div > div {
    width: 100%;
    height: 4px;
    border-radius: 1.5px;
  }
`;

export default Pagination;
