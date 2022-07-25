import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// svg icons
import { ReactComponent as Camera } from '../images/icons/camera_alt.svg';

import Input01 from '../elements/Input01';
import Button01 from '../elements/Button01';

import { userInfoChangeDB, userInfoDB } from '../redux/modules/userInfo';

const UserInfoChange = () => {
  const [userInfo, setUserInfo] = React.useState();
  const [userNickname, setUserNickname] = React.useState('');
  const [userImage, setUserImage] = React.useState();
  const [preUserImage, setPreUserImage] = React.useState();

  console.log(userInfo);
  console.log(preUserImage);

  const imageInput = useRef();
  const dispatch = useDispatch();

  // 유저 정보
  const userNum = sessionStorage.getItem('userNum');
  const user_data = useSelector((state) => state.userInfo.user);

  // 서버에서 데이터 받아오기
  React.useEffect(() => {
    dispatch(userInfoDB(userNum));

    if (user_data) {
      setUserInfo(user_data);
      setUserImage(user_data.userImage && user_data.userImage[0]);
    }
  }, []);

  // 유저 닉네임 설정
  React.useEffect(() => {
    if (user_data) {
      setUserNickname(user_data.nickname);
    }
  }, []);

  const userNicknameChange = useCallback((e) => {
    setUserNickname(e.target.value);
  }, []);

  // 클릭 시 input file 연결
  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  // 유저 이미지 데이터 및 미리보기 설정
  const userImageChange = (e) => {
    setPreUserImage(URL.createObjectURL(e.target.files[0]));
    setUserImage(e.target.files[0]);
  };

  // 완료 버튼 클릭 시
  const completed = () => {
    const formData = new FormData();
    formData.append('nickname', userNickname);
    formData.append('userImage', userImage);

    dispatch(userInfoChangeDB(userNum, formData));
  };

  return (
    <Container>
      <Profile
        onClick={onClickImageUpload}
        style={{
          backgroundImage:
            userImage && preUserImage === undefined
              ? `url(${userImage})`
              : `url(${preUserImage})`,
        }}
      >
        <div>
          <Camera />
        </div>
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={imageInput}
          onChange={userImageChange}
        />
      </Profile>

      <Wrap>
        <div>
          <p>닉네임</p>
          <Input01
            placeholder='닉네임을 입력해주세요.'
            _color='#64be72'
            _value={userNickname}
            _onChange={userNicknameChange}
          />
        </div>

        <UserInfoArea>
          <p style={{ marginTop: '36px' }}>유저 정보</p>

          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              textAlign: 'left',
              gap: '25px',
            }}
          >
            <div>
              <span>이름</span>
              <span>성별</span>
              <span>생년월일</span>
              <span>MBTI</span>
            </div>

            <div>
              <span>{userInfo && userInfo.name}</span>
              <span>
                {userInfo && userInfo.gender === 'Female' ? '여성' : '남성'}
              </span>
              <span>{userInfo && userInfo.birthday}</span>
              <span>{userInfo && userInfo.mbti}</span>
            </div>
          </div>
        </UserInfoArea>
      </Wrap>
      <Button01
        color='#fff'
        backgroundColor='#64be72'
        margin='36px 0 0 0'
        _onClick={completed}
      >
        완료
      </Button01>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  padding: 0 5.9%;

  display: flex;
  flex-flow: column;
  align-items: center;

  * {
    box-sizing: border-box;
  }

  p {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.8px;

    text-align: left;

    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const Profile = styled.div`
  width: 137px;
  height: 137px;

  border-radius: 49px;
  background-color: #e3e3e3;

  display: flex;
  align-items: center;
  justify-content: center;

  background-position: center;
  background-size: cover;

  position: relative;

  cursor: pointer;

  & > div {
    width: 30px;
    height: 30px;
    background-color: #64be72;
    border-radius: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 2px;
    bottom: 2px;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 4.5%;
`;

const UserInfoArea = styled.div`
  div {
    color: #434343;
    font-size: 16px;
  }

  div:nth-of-type(1) {
    font-weight: 400;
    display: flex;
    flex-flow: column nowrap;
    gap: 7px;
  }

  div:nth-of-type(2) {
    font-weight: 500;
    display: flex;
    flex-flow: column nowrap;
    gap: 7px;
  }
`;

export default UserInfoChange;
