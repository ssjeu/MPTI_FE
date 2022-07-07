import instance from './Request';
import axios from 'axios';

// 토큰 설정
const token = localStorage.getItem('is_login');

const ImgApi = axios.create({
  baseURL: 'http://3.35.170.203',
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

if (localStorage.getItem('is_login'))
  ImgApi.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('is_login')}`;

export const authApi = {
  signUp: (email, name, password, passwordCheck) => {
    instance
      .post('/api/signup', {
        email: email,
        name: name,
        password: password,
        passwordCheck: passwordCheck,
      })
      .then((res) => {
        console.log(res);
        alert('회원가입에 성공했습니다!');
        // window.location.href = '/login';
        window.location.replace('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  login: (email, password) => {
    instance
      .post(
        '/api/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem('is_login', res.data.token);
        alert('로그인 되었습니다!');

        if (!localStorage.getItem('nickname')) {
          // window.location.href = '/info';

          window.location.replace('/info');
        } else {
          window.location.replace('/');
        }

        // window.location.href = '/info';
      })
      .catch((err) => {
        console.log(err);
      });
  },

  kakaoLogin: async (code) => {
    await instance
      .get(`/api/kakao/callback?code=${code}`)
      .then((res) => {
        console.log(res);
        alert('로그인 되었습니다!');

        // window.location.href = '/info';
      })
      .catch((err) => {
        console.log(err);
      });
  },

  userInfo: (formData) => {
    ImgApi.put('/api/signup/first', formData, { withCredentials: true })
      .then((res) => {
        console.log('성공', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
