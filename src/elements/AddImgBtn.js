import React from 'react';
import styled, { css } from 'styled-components';

// svg icons
import { ReactComponent as Add } from '../images/icons/add.svg';
import { ReactComponent as Close } from '../images/icons/close.svg';

const AddImgBtn = (props) => {
  const { _onClick, state } = props;

  return (
    <>
      <ButtonStyle onClick={_onClick} state={state}>
        {state === undefined ? <Add /> : <Close />}
      </ButtonStyle>
    </>
  );
};

const AddStyle = css`
  background-color: var(--maincolor);
`;

const DeleteStyle = css`
  background-color: #fff;
`;

const ButtonStyle = styled.button`
  ${(props) => (props.state === undefined ? `${AddStyle}` : `${DeleteStyle}`)}

  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 30px;

  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
`;

export default AddImgBtn;
