// 커뮤니티 공지사항
import React, { useState } from "react";
import styled from "styled-components";
import NoticeList from "../shared/notice.json";
import "../css/component.css";

const CommunityNotice = () => {
  const [data, setData] = useState([...NoticeList]);

  return (
    <CommunityNoticeWrap className="contents-container">
      <Title>커뮤니티 공지사항</Title>

      <SubTitle>📍 커뮤니티 카테고리 소개</SubTitle>
      <About>
        <p>
          <span>MBTI</span> MBTI에 진심인 분들 모두 모이세요!
        </p>
        <p>
          <span>자유</span> 자유롭게 작성하고 싶으신 글을 작성하세요!
        </p>
        <p>
          <span>고민상담</span> 믑티에서 고민을 이야기해보세요 :)
        </p>
        <p>
          <span>익명</span> 익명으로만 이야기하는 공간
        </p>
      </About>
      <hr />

      <SubTitle>📍 커뮤니티 이용 규칙</SubTitle>
      <Pre>
        커뮤니티는 믑티 사용자들이 글로 소통할 수 있는 공간이에요.
        <br />
        <br />
        커뮤니티를 통해 위로받고, 공감하며 소통할 수 있도록 믑티 커뮤니티의 이용
        규칙을 꼭 약속해주세요!
      </Pre>
      <Notice>
        {data &&
          data.map((data, index) => (
            <NoticeDetailWrap key={index}>
              <Content>{data.title}</Content>
              <Detail>
                <ul>
                  {data.detail &&
                    data.detail.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                </ul>
              </Detail>
            </NoticeDetailWrap>
          ))}
      </Notice>
      <Pre>
        위 커뮤니티 이용규칙을 포함하여, 믑티 이용약관을 위배 한 경우 믑티
        서비스를 이용하는 사용자 보호를 위해 사전 안내 없이 서비스 이용이 한시적
        또는 영구적으로 제한될 수 있습니다.
      </Pre>
    </CommunityNoticeWrap>
  );
};

const CommunityNoticeWrap = styled.div`
  width: 100%;
  text-align: left;
  letter-spacing: -0.7px;
  word-break: keep-all;

  & hr {
    opacity: 0.25;
    margin-bottom: 40px;
  }
`;

const Title = styled.div`
  height: 92px;
  background-color: var(--maincolor);
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding-left: 32px;
  border-radius: 6px;
  line-height: 92px;
  margin-bottom: 28px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const About = styled.div`
  padding-bottom: 20px;

  & p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  & span {
    width: 80px;
    height: 24px;
    padding: 2px 4px;
    font-size: 16px;
    color: var(--maincolor);
    background-color: var(--subcolor);
    border: 1px solid var(--maincolor);
    border-radius: 16px;
    text-align: center;
    margin-right: 12px;
  }
`;

const Notice = styled.div`
  padding-bottom: 20px;
`;

const NoticeDetailWrap = styled.div`
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Detail = styled.div`
  & li {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 4px;
  }
`;

const Pre = styled.div`
  font-size: 14px;
  font-weight: 300;
  padding-bottom: 40px;
`;

export default CommunityNotice;
