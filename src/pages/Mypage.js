import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutDB } from "../redux/modules/user";
import { userInfoDB } from "../redux/modules/userInfo";

import "../css/component.css";
import Button02 from "../elements/Button02";

import { ReactComponent as Person } from "../images/icons/person.svg";
import { ReactComponent as Camera } from "../images/icons/camera_alt.svg";
import { ReactComponent as ArrowForward } from "../images/icons/arrow_forward_ios.svg";

const Mypage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 유저 정보
  const user_data = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    const token = sessionStorage.getItem("is_login");
    const userNum = sessionStorage.getItem("userNum");

    if (token) {
      setIsLogin(true);
    }

    if (isLogin === true) {
      dispatch(userInfoDB(userNum));
    }
  }, [isLogin]);

  // 로그아웃 버튼 누를 시
  const logOut = () => {
    dispatch(logOutDB());
  };

  return (
    <>
      <Container>
        <BackgroundColor />

        {isLogin === true && user_data.userImage !== undefined ? (
          <Profile
            className="display-center"
            onClick={() => navigate("/info/change")}
            style={{ backgroundImage: `url(${user_data?.userImage[0]})` }}
          >
            <div className="display-center">
              <Camera width="16px" height="16px" />
            </div>
          </Profile>
        ) : (
          <Profile className="display-center">
            <Person width="40px" height="40px" />
            <div className="display-center">
              <Camera width="16px" height="16px" />
            </div>
          </Profile>
        )}

        <InfoBox>
          <span>
            {user_data && isLogin === true
              ? `안녕하세요! ${user_data?.name}님`
              : "가입하고, 찐친을 만나보세요!"}
          </span>

          {isLogin === true ? (
            <div className="display-center" style={{ marginBottom: "5.5px" }}>
              <h3>{user_data.nickname}</h3>
              <button onClick={() => navigate("/my/profile")}>
                내 프로필 완성하기
              </button>
            </div>
          ) : (
            <div className="display-center" style={{ marginBottom: "5.5px" }}>
              <div
                style={{ padding: "0", display: "flex", alignItems: "center" }}
                onClick={() => navigate("/login")}
              >
                <h3 style={{ color: "var(--maincolor)", fontWeight: "500" }}>
                  로그인 및 회원가입하기
                </h3>
                <ArrowForward style={{ margin: "2px 0 0 4px" }} />
              </div>
              <button style={{ display: "none" }}>내 프로필 완성하기</button>
            </div>
          )}

          <hr />

          <div>
            <p>나의 MBTI</p>
            {isLogin === true ? <SpanStyle>{user_data.mbti}</SpanStyle> : null}
          </div>
          <hr />

          <div>
            <p>성별</p>
            {isLogin === true ? (
              <SpanStyle>
                {user_data.gender === "Female" ? "여성" : "남성"}
              </SpanStyle>
            ) : null}
          </div>
          <hr />

          <div>
            <p>이메일</p>
            {isLogin === true ? <span>{user_data.email}</span> : null}
          </div>
          <hr />

          <div>
            <p>생년월일</p>
            {isLogin === true ? <span>{user_data.birthday}</span> : null}
          </div>
          <hr />

          {isLogin === true ? (
            <button onClick={() => navigate("/info/change")}>
              회원정보 수정하기
            </button>
          ) : null}
        </InfoBox>

        {isLogin === true ? (
          <Button02 text="로그아웃" margin="12px 0 0 0" _onClick={logOut} />
        ) : null}
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 4.8%;
  margin-top: -40px;
  width: 100%;
  height: calc(100% - 100px);

  position: relative;
`;

const BackgroundColor = styled.div`
  background-color: var(--maincolor);

  width: 100%;
  height: 318px;

  z-index: 0;

  position: absolute;
  top: -85px;
  left: 0;
`;

const Profile = styled.div`
  background-color: #e3e3e3;
  width: 92px;
  height: 92px;
  margin: 0 auto;

  position: inherit;
  z-index: 2;

  background-position: center;
  background-size: cover;

  border-radius: 32px;
  border: solid 0.5px #64be72;
  position: relative;
  top: 45px;

  div {
    background-color: var(--maincolor);
    width: 32px;
    height: 32px;
    border-radius: 32px;

    position: absolute;
    right: -5px;
    bottom: -5px;
  }

  & :hover {
    cursor: pointer;
  }
`;

const InfoBox = styled.div`
  background-color: #fff;

  width: 100%;
  height: 340px;
  text-align: left;

  border-radius: 6px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
  border: solid 0.5px #64be72;

  box-sizing: border-box;
  padding-top: 88px;
  margin-bottom: 20px;

  position: inherit;

  p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
  }

  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  hr {
    height: 0.5px;
    border: none;
    background-color: var(--gray1);
  }

  & > span {
    color: #c0c9c2;
    font-size: 12px;
    font-weight: 400;
    margin-left: 20px;
  }

  & > div > span {
    font-size: 11.5px;
    font-weight: 500;
    color: #434343;
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #434343;
    margin: 0;
  }

  div:nth-of-type(1) {
    button {
      width: 120px;
      background-color: var(--maincolor);
      color: #fff;
      font-size: 11.5px;
      font-weight: 500;
      border-radius: 20px;
      border: none;
      padding: 4px 0;
    }

    button:hover {
      cursor: pointer;
    }
  }

  & > button {
    background-color: transparent;
    border: none;
    color: var(--maincolor);
    font-size: 12px;
    font-weight: 500;
    display: flex;
    margin: 0 auto;
  }

  & > button:hover {
    cursor: pointer;
  }
`;

const SpanStyle = styled.span`
  width: 54px;
  padding: 2px 0;
  border: 0.5px solid #434343;
  border-radius: 30px;
  text-align: center;
`;

export default Mypage;
