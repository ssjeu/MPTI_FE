import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// svg icons
import { ReactComponent as Person } from '../images/icons/person.svg';
import { ReactComponent as Camera } from '../images/icons/camera_alt.svg';
import { ReactComponent as Warning } from '../images/icons/warning.svg';

import Input01 from '../elements/Input01';
import Button03 from '../elements/Button03';
import Button01 from '../elements/Button01';
import Dropdown from '../elements/Dropdown';
import { userInfoDB } from '../redux/modules/user';
import { UserInfoHeader } from '../components/Header';

const UserInfoChange = () => {
  const [profile, setProfile] = React.useState();

  const imageInput = useRef();

  const user_data = useSelector((state) => state.userInfo.user);
  console.log(user_data);

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  return (
    <Container className='container'>
      {/* <UserInfoHeader margin='58px 0 49.7px 0' /> */}

      <Profile
        onClick={onClickImageUpload}
        style={{ backgroundImage: `url(${user_data?.userImage[0]})` }}
      >
        <div>
          <Camera />
        </div>
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={imageInput}
          // onChange={handleChangeFile}
        />
      </Profile>

      <div>
        <div>
          <p>닉네임</p>
          <Input01
            placeholder='닉네임을 입력해주세요.'
            color='#64be72'
            _value={user_data.nickname}
            _onChange={(e) => {
              // setNickname(e.target.value);
            }}
          >
            하이
          </Input01>
        </div>

        <div>
          <p>성별</p>

          <Buttons>
            <Button03>남성</Button03>
            <Button03>여성</Button03>
          </Buttons>
        </div>

        <SelectBox>
          <p>생년월일</p>
          {/* 
          <DropdownList>
            <div>
              <Dropdown>년</Dropdown>
              <span>년</span>
            </div>

            <div>
              <Dropdown>월</Dropdown>
              <span>월</span>
            </div>

            <div>
              <Dropdown>일</Dropdown>
              <span>일</span>
            </div>
          </DropdownList> */}
        </SelectBox>

        <div>
          <p style={{ marginBottom: '4px' }}>MBTI</p>

          <Buttons>
            <Button03 margin='0 0 20px 0'>E (외향)</Button03>
            <Button03 margin='0 0 20px 0'>I (내향)</Button03>

            <Button03 margin='0 0 20px 0'>S (감각)</Button03>
            <Button03 margin='0 0 20px 0'>N (직관)</Button03>

            <Button03 margin='0 0 20px 0'>T (사고)</Button03>
            <Button03 margin='0 0 20px 0'>F (감정)</Button03>

            <Button03 margin='0 0 20px 0'>J (판단)</Button03>
            <Button03 margin='0 0 20px 0'>P (인식)</Button03>
          </Buttons>
        </div>

        <div>
          <p>유저님에 대해 알려주세요 :)</p>
          <textarea />
        </div>

        <Button01 color='#fff' backgroundColor='#64be72' margin='0 0 77px 0'>
          입력 완료
        </Button01>
      </div>
    </Container>
  );
};

const Container = styled.div`
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

  textarea {
    width: 100%;
    min-height: 160px;
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

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 49px;
    object-fit: cover;
  }

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

const Buttons = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const SelectBox = styled.div``;

const DropdownList = styled.div`
  display: flex;
  flex-flow: row nowrap;

  & > div {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
  }

  span {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.8px;
    margin-left: 4px;
    margin-right: 12px;
  }
`;

const WaringBox = styled.div`
  & > span {
    font-size: 10px;
    letter-spacing: -0.5px;
    font-weight: 300;
    color: #ff6565;
  }
`;

export default UserInfoChange;
