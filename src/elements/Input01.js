import React from 'react';
import styled from 'styled-components';

const Input01 = (props) => {
  const { placeholder, _onChange, _ref, margin, type } = props;

  return (
    <>
      <InputStyle style={{ margin: `${margin}` }}>
        <input
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          ref={_ref}
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

  input:lang(ko) {
    letter-spacing: -0.8px;
  }

  input:lang(en) {
    letter-spacing: 0;
  }

  input::placeholder {
    color: #d9d9d9;
  }
`;

export default Input01;
