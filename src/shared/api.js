import instance from "./Request";
import axios from "axios";

const ImgApi = axios.create({
  baseURL: "http://3.35.170.203",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

if (localStorage.getItem("is_login"))
  ImgApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("is_login")}`;

export const communityApi = {
  // 게시글
  postList: () => instance.get(`/api/posts/postList`),
  postDetail: (postId) => instance.get(`/api/posts/${postId}`),
  postWrite: (formData) =>
    ImgApi.post(`/api/posts`, formData, { withCredentials: true }),
  postUpdate: (postId, formData) => instance.put(`/api/posts/${postId}`, formData),
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
      .post("/api/signup", {
        email: email,
        name: name,
        password: password,
        passwordCheck: passwordCheck,
      })
      .then((res) => {
        console.log(res);
        alert("회원가입에 성공했습니다!");

        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  login: (email, password) => {
    instance
      .post(
        "/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem('is_login', res.data.token);
        localStorage.setItem('userNum', res.data.user.userNum);
        alert('로그인 되었습니다!');

        if (res.data.user.nickname === undefined) {
          window.location.replace('/info');
        } else {
          window.location.replace("/");
        }
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
        alert("로그인 되었습니다!");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  userInfo: (formData, nickname) => {
    ImgApi.put('/api/signup/first', formData, { withCredentials: true })
      .then((res) => {
        console.log('성공', res);
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export const userInfoApi = {
  myUserInfo: (userNum) => instance.get(`/api/mypage/${userNum}`),
};
