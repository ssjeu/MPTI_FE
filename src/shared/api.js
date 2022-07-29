import instance from './Request';
import axios from 'axios';
import Swal from 'sweetalert2';
import SweetAlert from '../components/sweetAlert/SweetAlert';

const ImgApi = axios.create({
  baseURL: 'https://mptiserver.link',
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

if (sessionStorage.getItem('is_login'))
  ImgApi.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${sessionStorage.getItem('is_login')}`;

export const communityApi = {
  // 게시글
  postList: () => instance.get(`/api/posts/postList`),
  postDetail: (postId) => instance.get(`/api/posts/${postId}`),
  postWrite: (formData) =>
    ImgApi.post(`/api/posts`, formData, { withCredentials: true }),
  postUpdate: (postId, formData) =>
    instance.put(`/api/posts/${postId}`, formData),
  postDelete: (postId) => instance.delete(`/api/posts/${postId}`),

  // 댓글
  commentWrite: (postId, cmt) =>
    instance.post(`/api/comments/${postId}`, { comment: cmt }),
  commentUpdate: (cmtId) => instance.put(`/api/comments/${cmtId}`),
  commentDelete: (cmtId) => instance.delete(`/api/comments/${cmtId}`),

  // 좋아요
  likeList: (postId) => instance.get(`api/posts/likes/${postId}`),
  likeAdd: (postId) =>
    instance.post(`api/posts/likes/${postId}`, { countLikes: 1 }),
  likeDelete: (postId) => instance.delete(`api/posts/likes/${postId}`),
};

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
        Swal.fire({
          text: '회원가입에 성공했습니다!',
          icon: 'success',
          confirmButtonColor: '#64be72',
          confirmButtonText: '확인',
        }).then((result) => {
          window.location.replace('/login');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  idCheck: (email) => instance.post('/api/dup_userId', { email: email }),

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
        sessionStorage.setItem('is_login', res.data.token);
        sessionStorage.setItem('userNum', res.data.user.userNum);
        Swal.fire({
          text: '로그인 되었습니다!',
          icon: 'success',
          confirmButtonColor: '#64be72',
          confirmButtonText: '확인',
        }).then((result) => {
          if (res.data.user.nickname === undefined) {
            window.location.replace('/info');
          } else {
            window.location.replace('/');
          }
        });
      })
      .catch((err) => {
        SweetAlert({ icon: 'error', text: '아이디, 비밀번호를 확인해주세요!' });
      });
  },

  kakaoLogin: async (code) => {
    await instance
      // .get(`https://mptiserver.link/api/kakao/callback`)
      .get(`https://mptiserver.link/api/kakao/callback?code=${code}`)
      .then((res) => {
        console.log(res);
        // alert('로그인 되었습니다!');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  kakaoLoginData: (token) => {
    instance
      .post(`/api/kakao`, {
        access_token: token,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },

  logOut: () => instance.post('/api/logout'),

  userInfo: (formData, nickname) => {
    ImgApi.put('/api/signup/first', formData, { withCredentials: true })
      .then((res) => {
        Swal.fire({
          text: '환영합니다!!!',
          icon: 'success',
          confirmButtonColor: '#64be72',
          confirmButtonText: '확인',
        }).then((result) => {
          window.location.replace('/');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export const userInfoApi = {
  myUserInfo: (userNum) => instance.get(`/api/mypage/${userNum}`),
  userProfile: (userNum, userIntroduction, profileImages) =>
    instance.put(`/api/mypage/profile/${userNum}`, {
      introduction: userIntroduction,
      profileImages: profileImages,
    }),
  userInfoChange: (userNum, formData) =>
    ImgApi.put(`/api/mypage/${userNum}`, formData),
};

export const recommendApi = {
  // 잘맞는 MBTI 추천
  recommendList: () => instance.get(`/api/suggest`),

  // 다양한 MBTI 친구들 추천
  mbtiFriendList: () => instance.get(`/api/userList`),
};

export const chatApi = {
  // 채팅
  chatList: () => instance.get(`/api/chatList`),
  createRoom: (userNum) => instance.post(`/api/chat`, { userNum: userNum }),
  exitRoom: (roomId) => instance.put(`/api/chat/${roomId}`),
  sendMessage: (roomId, content) =>
    instance.post(`/api/message/${roomId}`, { content: content }),
  getMessages: (roomId) => instance.get(`/api/messages/${roomId}`),

  // 차단
  blockUser: (userNum) => instance.put(`/api/block`, { userNum: userNum }),
  unblockUser: (userNum) => instance.put(`/api/unblock`, { userNum: userNum }),
};

//이미지 url 받아오기
export const imageApi = {
  userImage: (formData) => ImgApi.post('/api/images', formData),
};

// 약식 mbti 테스트
export const mbtiTestApi = {
  mbtiTest: (first, second, third, fourth) =>
    instance.post('/api/mbtitest', {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
    }),
};
