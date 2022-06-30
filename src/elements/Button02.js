import React from 'react';
import styled from 'styled-components';

const Button02 = (props) => {
  const { text, _onClick, margin } = props;

  return (
    <>
      <ButtonStyle style={{ margin: `${margin}` }} onClick={_onClick}>
        {text}
      </ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  text-underline-offset: 2px;

  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #adadad;
  cursor: pointer;
`;

export default Button02;
