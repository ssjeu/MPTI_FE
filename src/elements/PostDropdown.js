import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CategoryDown from "../images/icons/expand-more@3x.png";

const PostDropdown = (props) => {
  const { data, width, children, height, parent } = props;

  const [display, setDisplay] = useState(false);
  const [listData, setListData] = useState("");

  const dropdownClick = () => {
    setDisplay(!display);
  };

  useEffect(() => {
    parent(listData);
  }, [listData]);

  useEffect(() => {
    if (listData === "" && children) setListData(children);
  }, [listData]);

  return (
    <>
      <Container>
        <ButtonStyle onClick={dropdownClick} width={width}>
          <div>{listData === "" ? children : listData}</div>
          <img src={CategoryDown} alt="down" />
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
                  style={{
                    color: listData === list ? "#64be72" : null,
                    fontWeight: listData === list ? "bold" : null,
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

const ButtonStyle = styled.div`
  width: ${(props) => props.width};
  height: 28px;
  background-color: var(--maincolor);
  color: white;
  text-align: left;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & div {
    margin: 0 8px;
    line-height: 28px;
  }

  & img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;

const DropdownList = styled.div`
  display: ${(props) => (props._display === true ? "flex" : "none")};
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? props.height : "auto")};
  ${(props) => (props._display === true ? `${dropdownFadeIn}` : null)}

  background-color: white;
  position: absolute;
  z-index: 1;
  box-shadow: 0 0 6px 0 rgba(156, 156, 156, 0.4);
  border-radius: 4px;

  ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
    font-size: 13px;
    color: var(--gray4);
    letter-spacing: -0.6px;
  }

  ul > li {
    margin: 8px;
  }

  ul > li:hover {
    color: var(--maincolor);
  }
`;

export default PostDropdown;
