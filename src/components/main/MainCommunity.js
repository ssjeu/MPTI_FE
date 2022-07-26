// 메인페이지에서 커뮤니티 목록
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/post";
import { userInfoDB } from "../../redux/modules/userInfo";

import PostCard from "../../elements/PostCard";
import arrow from "../../images/icons/arrow-forward-ios@3x.png";

const MainCommunity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userInfo.user);
  const posts = useSelector((state) => state.post.post);

  useEffect(() => {
    const userNum = sessionStorage.getItem("userNum");
    dispatch(postActions.postDB());
    dispatch(userInfoDB(userNum));
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
          <Link
            to={"/posts/" + card.postId}
            state={{ data: card, user: user }}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <PostCard card={card} key={index} />
          </Link>
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
  padding: 12px 0;
`;

export default MainCommunity;
