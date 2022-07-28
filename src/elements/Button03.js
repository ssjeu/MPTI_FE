import React from 'react';
import styled, { css } from 'styled-components';

const Button03 = (props) => {
  const { color, _onClick, margin, children, _className, borderColor, state } =
    props;

  return (
    <>
      <ButtonStyle
        className={_className}
        color={color}
        onClick={_onClick}
        margin={margin}
        borderColor={borderColor}
        state={state}
      >
        {children}
      </ButtonStyle>
    </>
  );
};

const normalStyle = css`
  color: #c0c9c2;
  border: 1px solid #c0c9c2;
`;

const activeStyle = css`
  color: #64be72;
  border: 1px solid #64be72;
`;

const ButtonStyle = styled.button`
  ${(props) => (props.state ? `${activeStyle}` : `${normalStyle}`)}

  background-color: #fff;

  margin: ${(props) => props.margin};
  // width: 141px;
  width: 100%;
  height: 45px;
  border-radius: 26px;

  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.8px;
`;

export default Button03;
