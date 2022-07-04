import React, { Children, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import dropdownArrow from '../icons/arrow_drop_down.png';

const SelectTest = (props) => {
  const { data, width, children, height, parent } = props;

  const [display, setDisplay] = React.useState(false);
  const [listData, setListData] = React.useState('');

  const dropdownClick = () => {
    setDisplay(!display);
  };

  React.useEffect(() => {
    parent(listData);
  }, [listData]);

  return (
    <>
      <Container>
        <ButtonStyle
          onClick={dropdownClick}
          width={width}
          style={{ color: listData ? '#000' : 'transparent' }}
        >
          {listData !== '' ? listData : children}
        </ButtonStyle>
        <DropdownList _display={display} width={width} height={height}>
          <ul>
            {data.map((list, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => {
                    setDisplay(false);
                    setListData(list);
                  }}
                >
                  {list}
                </li>
              );
            })}
          </ul>
        </DropdownList>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
`;

const dropdownFadeIn = css`
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ButtonStyle = styled.button`
  width: ${(props) => props.width};

  // 고정 값
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #64be72;

  background: url(${dropdownArrow}) no-repeat 105% 50%;
`;

const DropdownList = styled.div`
  display: ${(props) => (props._display === true ? 'flex' : 'none')};
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? props.height : 'auto')};
  ${(props) => (props._display === true ? `${dropdownFadeIn}` : null)}

  overflow-y: ${(props) => (props.height ? 'scroll' : 'hidden')};

  // 고정 값
  background-color: #fff;

  margin-top: 7px;
  position: absolute;
  z-index: 1;

  // 스크롤바 스타일
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(100, 190, 114, 0.5);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-button {
    width: 6px;
    height: 6px;
  }

  box-shadow: 0px 0px 10px 1px rgba(21, 78, 30, 0.2);
  border-radius: 10px;

  ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  ul > li {
    margin: 1px 0;
  }

  ul > li:hover {
    background-color: #ecf9ee;
  }
`;

export default SelectTest;
