// 메인으로 사용되는 버튼
import React from "react";
import styled from "styled-components";

const MainButton = (props) => {
  return <Button>{props.text}</Button>;
};

const Button = styled.div`
  background-color: var(--maincolor);
  border-radius: 26px;
  color: white;
  font-size: 16px;
  margin: 20px 0;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainButton;
