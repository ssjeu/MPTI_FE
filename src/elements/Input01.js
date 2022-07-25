import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { ReactComponent as Edit } from '../images/icons/edit.svg';

const Input01 = (props) => {
  const { placeholder, _onChange, _ref, margin, type, _color, _value } = props;
  const location = useLocation().pathname;

  return (
    <>
      <InputStyle style={{ margin: `${margin}` }}>
        <input
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          ref={_ref}
          value={_value}
          style={{ color: `${_color}` }}
        />
        <Edit
          style={{
            fill: _value === '' ? '#d9d9d9' : '#64be72',
            display: location === '/info/change' ? null : 'none',
          }}
        />
      </InputStyle>
    </>
  );
};

const InputStyle = styled.div`
  width: 100%;
  padding: 5px;
  border-bottom: 2px solid #64be72;
  display: flex;

  input {
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;

    font-weight: 400;
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
  }

  input::placeholder {
    color: #d9d9d9;
  }
`;

export default Input01;
