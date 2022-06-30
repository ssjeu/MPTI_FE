import React from 'react';
import styled from 'styled-components';

const HorizontalLine = ({ text }) => {
  return (
    <Style>
      <span>{text}</span>
    </Style>
  );
};

const Style = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ebebeb;
  line-height: 0.1em;

  span {
    background: #fff;
    color: #d3d3d3;
    padding: 0px 14px;

    font-family: 'Noto Sans KR';
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.6px;
  }
`;

export default HorizontalLine;
