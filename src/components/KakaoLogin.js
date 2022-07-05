// 카카오 로그인 시 리다이렉트 될 화면
import React from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../redux/modules/user';

const KakaoLogin = (props) => {
  const dispatch = useDispatch();

  // 인가 코드
  let code = new URL(window.location.href).searchParams.get('code');

  React.useEffect(() => {
    dispatch(kakaoLogin(code));
  }, []);

  return (
    <>
      <div>잠시만 기다려주세용. 로그인 중입니당.</div>
    </>
  );
};

export default KakaoLogin;