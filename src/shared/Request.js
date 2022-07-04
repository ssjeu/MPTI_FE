import axios from 'axios';

const instance = axios.create({
  // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록

  // baseURL: 'http://localhost:5001',
  baseURL: 'http://3.35.170.203',
  headers: { 'Content-Type': 'application/json' },
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.defaults.headers.common["Authorization"] = USER_TOKEN;

// 요청 가로채기
// instance.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// // 응답 가로채기
// instance.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export default instance;
