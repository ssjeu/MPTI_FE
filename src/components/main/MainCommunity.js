// 메인페이지에서 커뮤니티 목록
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/post";

import PostCard from "../../elements/PostCard";
import arrow from "../../images/icons/arrow-forward-ios@3x.png";

const MainCommunity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.post.post);

  // 서버에서 postlist 로드
  useEffect(() => {
    dispatch(postActions.postDB());
  }, []);

  return (
    <MainCommunityWrap>
      <CommunnityTitle
        onClick={() => {
          navigate("/community");
        }}
      >
        MBTI 커뮤니티
        <img src={arrow} alt="community arrow" />
      </CommunnityTitle>
      <CommunityCardWrap>
        {posts.slice(0, 6).map((card, index) => (
          <PostCard card={card} key={index} />
        ))}
      </CommunityCardWrap>
    </MainCommunityWrap>
  );
};

const MainCommunityWrap = styled.div``;

const CommunnityTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  display: flex;
  align-items: center;

  & img {
    width: 16px;
    margin-top: 2px;
    margin-left: 4px;
  }
`;

const CommunityCardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  padding: 20px 0;
`;

export default MainCommunity;
