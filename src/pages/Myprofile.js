import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ProfileImg from '../components/myprofile/ProfileImg';
import Button01 from '../elements/Button01';
import { userInfoDB, userProfileDB } from '../redux/modules/userInfo';

const Myprofile = () => {
  const [active, setActive] = React.useState(1);
  const [userIntroduction, setUserIntroduction] = React.useState('');
  const [profileImages, setProfileImages] = React.useState();

  const [userProfiles, setUserProfiles] = React.useState([]);

  const dispatch = useDispatch();

  const activeChange = () => {
    if (active === 1) {
      setActive(2);
    }
    if (active === 2) {
      setActive(1);
    }
  };

  const userNum = sessionStorage.getItem('userNum');

  // 유저 정보
  const user_data = useSelector((state) => state.userInfo.user);
  console.log(user_data);

  React.useEffect(() => {
    dispatch(userInfoDB(userNum));

    if (user_data) {
      setUserProfiles(user_data.profileImages);
    }
  }, [active]);

  React.useEffect(() => {
    if (user_data) {
      setUserIntroduction(user_data.introduction);
    }
  }, []);

  // 자기소개 변경 부분
  const userIntroductionChange = useCallback((e) => {
    setUserIntroduction(e.target.value);
  }, []);

  // ProfileImg.js에서 이미지 데이터 받아오기
  const userProfileImages = (x) => {
    setProfileImages(x);
  };

  //! 입력 완료 버튼 클릭 시
  const completed = () => {
    const formData = new FormData();
    formData.append('introduction', userIntroduction);

    profileImages.map((item, idx) => {
      if (item) {
        return formData.append('profileImages', item);
      }
    });

    for (let value of formData.values()) {
      console.log(value);
    }

    dispatch(userProfileDB(userNum, formData));
  };

  return (
    <>
      <TabMenu active={active}>
        <button
          onClick={activeChange}
          style={{ color: active === 1 ? 'var(--maincolor)' : 'var(--gray3)' }}
        >
          프로필 수정
        </button>
        <div>|</div>
        <button
          onClick={activeChange}
          style={{ color: active === 2 ? 'var(--maincolor)' : 'var(--gray3)' }}
        >
          내 프로필 미리보기
        </button>
      </TabMenu>

      {active === 1 ? (
        <Container>
          <ProfileImg
            margin='0 0 51.5px 0'
            parent={userProfileImages}
            data={userProfiles}
          />

          <Introduction>
            <p>자기소개</p>
            <textarea
              value={userIntroduction}
              onChange={userIntroductionChange}
            />
          </Introduction>
          <Button01
            backgroundColor='var(--maincolor)'
            color='#fff'
            margin='0 0 30px 0'
            _onClick={completed}
          >
            완료
          </Button01>
        </Container>
      ) : (
        <Container>
          <div>사진들어감</div>
        </Container>
      )}
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

export default Myprofile;
