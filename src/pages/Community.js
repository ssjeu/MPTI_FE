// 커뮤니티 탭
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import "../css/component.css";
import PostList from "../components/community/PostList";
import PostWrite from "../images/icons/mode@3x.png";
import Character from "../images/character/frame-main@3x.png";

const Community = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.post.post);
  const token = sessionStorage.getItem("is_login");

  // 서버에서 postlist 로드
  useEffect(() => {
    dispatch(postActions.postDB());
  }, []);

  useEffect(() => {
    setData(posts);
  }, [posts]);

  // 카테고리 목록
  const categories = ["전체", "MBTI", "자유", "고민상담", "익명"];
  const [activeCat, setActiveCat] = useState(categories);
  const [activeCatState, setActiveCatState] = useState(0);

  // 해당 카테고리 게시물 목록을 보여주기 위한 객체
  const [data, setData] = useState([]);

  const activeCategory = (btn) => {
    if (btn === "전체") {
      setData(posts);
      console.log("전체", data);
      return data;
    }

    const filteredData = posts.filter((item) => item.postCategory === btn);
    setData(filteredData);
    return data;
  };

  return (
    <CommunityWrap>
      <Category>
        {activeCat.map((cate, index) => {
          if (cate === "전체")
            return (
              <CategoryAll
                onClick={() => {
                  activeCategory(cate);
                  setActiveCatState(index);
                }}
                key={index}
                className={activeCatState === index ? "active" : null}
              >
                {cate}
              </CategoryAll>
            );
          else
            return (
              <CategoryButton
                onClick={() => {
                  activeCategory(cate);
                  setActiveCatState(index);
                }}
                key={index}
                className={activeCatState === index ? "active" : null}
              >
                {cate}
              </CategoryButton>
            );
        })}
      </Category>
      <Notice>
        <span>필독!</span>커뮤니티 이용 규칙
      </Notice>
      <CommunityList>
        {data.length === 0 ? (
          <CommunityNoList>
            <img src={Character} alt="므팅이" />
            <div>
              아직 등록된 게시물이 없어요!
              <br />
              가장 먼저 작성해볼까요? ✨
            </div>
          </CommunityNoList>
        ) : (
          data.map((card, index) => <PostList card={card} key={index} />)
        )}
      </CommunityList>
      <PostButton
        onClick={() => {
          if (token) navigate("/postwrite");
          else alert("로그인을 해주세요!");
        }}
      >
        <img src={PostWrite} alt="postwrite" />
        <br />
        글작성
      </PostButton>
    </CommunityWrap>
  );
};

const CommunityWrap = styled.div`
  background-color: var(--gray1);
  margin-bottom: 80px;
`;

const Category = styled.div`
  height: 30px;
  align-content: center;
  display: flex;
  //   justify-content: flex-start;
  background-color: white;
  overflow: auto;
  white-space: nowrap;
`;

const CategoryAll = styled.div.attrs((props) => ({
  className: props.className,
}))`
  text-align: center;
  width: 44px;
  height: 30px;
  padding: 0 20px;
  margin-top: -2px;

  &.active {
    color: var(--maincolor);
    font-weight: bold;
    border-bottom: 2px solid var(--maincolor);
  }
`;

const CategoryButton = styled.div.attrs((props) => ({
  className: props.className,
}))`
  text-align: center;
  width: 100px;
  height: 30px;
  margin-top: -2px;

  &.active {
    color: var(--maincolor);
    font-weight: bold;
    border-bottom: 2px solid var(--maincolor);
  }
`;

const Notice = styled.div`
  background-color: var(--subcolor);
  width: 100vw;
  height: 50px;
  font-size: 14px;
  text-align: left;
  display: table-cell;
  vertical-align: middle;

  & span {
    color: var(--pointcolor);
    font-weight: bold;
    margin-left: 20px;
    margin-right: 10px;
  }
`;

const CommunityList = styled.div``;

const CommunityNoList = styled.div`
  background-color: white;
  font-weight: 300;

  & img {
    margin: 100px auto 20px auto;
    width: 100px;
  }
`;

const PostButton = styled.div`
  background-color: var(--maincolor);
  color: white;
  font-size: 12px;
  position: fixed;
  bottom: 100px;
  right: 3%;
  width: 68px;
  height: 68px;
  border-radius: 34px;
  z-index: 2;

  &:hover {
    cursor: pointer;
  }

  & img {
    width: 24px;
    margin-top: 12px;
  }
`;

export default Community;
