import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

const UserInfo = () => {
  return (
    <div>
      <Profile>프로필</Profile>

      <div>
        <p>닉네임을 입력해주세요.</p>
        <input type='text' placeholder='닉네임을 입력해주세요.' />
      </div>

      <div>
        <p>성별을 선택해주세요.</p>
        <input type='radio' name='gender' value='male' />
        남성
        <input type='radio' name='gender' value='female' />
        여성
      </div>

      <div>
        <p>생년월일을 선택해주세요.</p>
        <DatePicker />
      </div>
    </div>
  );
};

const Profile = styled.div`
  background-color: #eee;
  width: 80px;
  height: 80px;

  border-radius: 50px;
`;

export default UserInfo;
