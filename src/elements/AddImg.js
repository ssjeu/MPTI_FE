import React from 'react';
import styled from 'styled-components';

// svg icons
import { ReactComponent as Add } from '../images/icons/add.svg';
import { ReactComponent as Close } from '../images/icons/close.svg';

const AddImg = () => {
  return (
    <>
      <ButtonStyle>
        <Add />
      </ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--maincolor);
  border: none;
  border-radius: 30px;
`;

export default AddImg;
