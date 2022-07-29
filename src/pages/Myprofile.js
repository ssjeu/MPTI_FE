import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import ProfileImg from "../components/myprofile/ProfileImg";
import Button01 from "../elements/Button01";
import { userInfoDB, userProfileDB } from "../redux/modules/userInfo";
import ProfileSwiper from "../components/myprofile/ProfileSwiper";
import Swal from "sweetalert2";

const Myprofile = () => {
  const [active, setActive] = React.useState(1);
  const [userIntroduction, setUserIntroduction] = React.useState("");

  // 서버에 보내는 유저 프로필 이미지
  const [profileImages, setProfileImages] = React.useState();

  // 서버에서 받아오는 유저 프로필 이미지
  const [userProfiles, setUserProfiles] = React.useState();

  const dispatch = useDispatch();

  const activeChange = () => {
    if (active === 1) {
      if (
        profileImages.length !== userProfiles.length ||
        userIntroduction !== user_data.introduction
      ) {
        Swal.fire({
          text: "지금 페이지를 이동하면 정보가 저장되지 않아요!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#64be72",
          confirmButtonText: "이동할래요",
          cancelButtonText: "앗, 남을래요",
          cancleButtonColor: "#d9d9d9",
        }).then((result) => {
          if (result.isConfirmed) {
            setActive(2);
          }
        });
        return;
      }
      setActive(2);
    }

    if (active === 2) {
      setActive(1);
    }
  };

  // 유저 정보
  const userNum = sessionStorage.getItem("userNum");
  const user_data = useSelector((state) => state.userInfo.user);

  // 서버에서 데이터 받아오기
  React.useEffect(() => {
    dispatch(userInfoDB(userNum));

    if (user_data) {
      setUserProfiles(user_data.profileImages);
    }
  }, [user_data]);

  React.useEffect(() => {
    if (user_data) {
      setUserIntroduction(user_data.introduction);
    }
  }, [user_data]);

  // 자기소개 변경 부분
  const userIntroductionChange = useCallback((e) => {
    setUserIntroduction(e.target.value);
  }, []);

  // ProfileImg.js에서 이미지 데이터 받아오기
  const userProfileImages = (x) => {
    setProfileImages(x);
  };

  // 유저 나이 구하기
  const birthday = user_data.birthday && user_data.birthday.slice(0, 4);
  const today = new Date();
  const user_age = today.getFullYear() - birthday + 1;

  //! 입력 완료 버튼 클릭 시
  const completed = () => {
    dispatch(userProfileDB(userNum, userIntroduction, profileImages));
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <TabMenu active={active}>
          <button
            onClick={activeChange}
            style={{
              color: active === 1 ? "var(--maincolor)" : "var(--gray3)",
            }}
          >
            프로필 수정
          </button>
          <div>|</div>
          <button
            onClick={activeChange}
            style={{
              color: active === 2 ? "var(--maincolor)" : "var(--gray3)",
            }}
          >
            내 프로필 미리보기
          </button>
        </TabMenu>

        {active === 1 ? (
          <Container>
            {userProfiles !== undefined && (
              <ProfileImg
                margin="0 0 51.5px 0"
                parent={userProfileImages}
                data={userProfiles}
              />
            )}

            <Introduction>
              <p>자기소개</p>
              <textarea
                value={userIntroduction}
                onChange={userIntroductionChange}
              />
            </Introduction>
            <Button01
              backgroundColor="var(--maincolor)"
              color="#fff"
              margin="0 0 30px 0"
              _onClick={completed}
            >
              완료
            </Button01>
          </Container>
        ) : (
          <Container>
            <ProfileSwiper images={userProfiles} />
            <UserInfoArea>
              <div>
                <h3>{user_data && user_data.nickname}</h3>
                <span>{user_age}</span>
              </div>
              <span>{user_data && user_data.mbti}</span>
              <p>자기소개</p>
              <p>{user_data && user_data.introduction}</p>
            </UserInfoArea>
          </Container>
        )}
      </div>
    </>
  );
};

const TabMenu = styled.div`
  margin-bottom: 16px;
  border: none;
  border-bottom: 0.5px solid #ebebeb;

  display: flex;
  flex-flow: row nowrap;

  * {
    margin-bottom: 12.5px;
    font-size: 16px;
    font-weight: 500;
  }

  div {
    color: #ebebeb;
  }

  button {
    width: 100%;
    background: transparent;
    border: none;
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 2.9%;
`;

const Introduction = styled.div`
  p {
    text-align: left;

    margin: 0;
    margin-left: 20px;
    margin-bottom: 11px;

    font-size: 16px;
    font-weight: 500;
  }

  textarea {
    width: 100%;
    min-height: 306px;
    margin-bottom: 43px;

    box-sizing: border-box;
    padding: 15px 19px;
    border-radius: 14px;
    border: solid 1px #c0c9c2;

    resize: none;

    &:focus {
      outline: 0.5px solid #64be72;
    }

    &::placeholder {
      color: #d9d9d9;
    }
  }
`;

const UserInfoArea = styled.div`
  box-sizing: border-box;
  padding: 0 5%;
  text-align: left;

  * {
    margin: 0;
  }

  & > div {
    margin-top: 20px;
    margin-bottom: 7px;
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 7px;

    h3 {
      font-size: 26px;
      font-weight: 700;
    }
    span {
      font-size: 22px;
      font-weight: 400;
    }
  }

  & > span {
    color: var(--maincolor);
    border: 1px solid var(--maincolor);
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
    padding: 0 12px;
    margin-top: 7px;
  }

  & > p:nth-of-type(1) {
    font-size: 16px;
    font-weight: 500;
    margin-top: 37px;
    margin-bottom: 12px;
  }

  & > p:nth-of-type(2) {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 57px;
  }
`;

export default Myprofile;
