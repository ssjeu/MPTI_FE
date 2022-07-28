import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BannerCard = ({ src, txt, to }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(to)}>
      <Image>
        <img src={src} alt="mpti-banner" />
      </Image>
      <Content>
        <Wrap>
          <Sub>{txt[0]}</Sub>
          <Title>{txt[1]}</Title>
          <Button>{txt[2]}</Button>
        </Wrap>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  margin-top: 20px;
  
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.div`
  width: 100%;

  & img {
    width: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45%;
  background-blend-mode: multiply;
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0) 19%,
    #262626 55%
  );
  border-radius: 14px;
`;

const Wrap = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;

  & div {
    margin: 0 5%;
  }
`;

const Sub = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.8px;
  color: white;
  padding-bottom: 1%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -1.2px;
  color: white;
  padding-bottom: 5%;
`;

const Button = styled.div`
  height: 60px;
  border-radius: 10px;
  background-color: white;
  color: #333;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 60px;
  letter-spacing: -0.8px;
`;

export default BannerCard;
