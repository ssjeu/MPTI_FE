// 카카오 로그인 시 리다이렉트 될 화면
import React from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../redux/modules/user';
import axios from 'axios';
import { authApi } from '../shared/api';

const KakaoLogin = (props) => {
  const dispatch = useDispatch();

  // 인가 코드
  // let code = new URL(window.location.href).searchParams.get('code');
  // let params = new URL(document.location.toString()).searchParams;
  // let code = params.get('code'); // 인가 코드 받는 부분

  // React.useEffect(() => {
  //   dispatch(kakaoLogin(code));
  // }, []);

  React.useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get('code'); // 인가 코드 받는 부분
    let grant_type = 'authorization_code';
    let client_id = '8889cc33c5ac3c4cec9e5da61462fad9';

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=https://localhost:3000/api/kakao/callback&code=${code}`,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data) {
          const token = res.data.access_token;
          authApi.kakaoLoginData(token);
        }
      });
  }, []);

  return (
    <>
      <div>잠시만 기다려주세용. 로그인 중입니당.</div>
    </>
  );
};

export default KakaoLogin;
