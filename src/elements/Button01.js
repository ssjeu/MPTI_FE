import React from 'react';
import styled from 'styled-components';

const Button01 = (props) => {
  const {
    color,
    backgroundColor,
    _onClick,
    margin,
    children,
    _className,
  } = props;

  return (
    <>
      <ButtonStyle
        className={_className}
        onClick={_onClick}
        backgroundColor={backgroundColor}
        style={{ color: `${color}`, margin: `${margin}` }}
      >
        {children}
      </ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  background-color: ${(props) => props.backgroundColor};

  width: 100%;
  height: 52px;
  border: none;
  border-radius: 26px;

  font-size: 16px;
  font-weight: 500;
  ont-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  cursor: pointer;
`;

export default Button01;
