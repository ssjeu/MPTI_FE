// 커뮤니티 공지사항
import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeList from '../shared/notice.json';
import '../css/component.css';

const CommunityNotice = () => {
  const [data, setData] = useState([...NoticeList]);

  return (
    <CommunityNoticeWrap className='contents-container'>
      <Title>커뮤니티 이용 규칙</Title>
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
              <SubTitle>{data.title}</SubTitle>
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
  margin: 20px 0 140px 0;
  text-align: left;
  color: #242424;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.7px;
  word-break: keep-all;
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
`;

const Pre = styled.div`
  margin-top: 16px;
`;

const Notice = styled.div`
  margin: 40px auto;
`;

const NoticeDetailWrap = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Detail = styled.div`
  & li {
    margin-bottom: 4px;
  }
`;

export default CommunityNotice;
