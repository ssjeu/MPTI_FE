import axios from "axios";
import instance from "./Request";

const api = axios.create({
  baseURL: "http://3.35.170.203",
});

// 토큰 설정
const token = localStorage.getItem("is_login");

export const apis = {
  // community
  postList: () => api.get(`/api/posts/postList`),
  postDetail: (postId) => api.get(`/api/posts/${postId}`),
  
  postWrite: (content, image, category) =>
    api.post(
      `/api/posts`,
      { postContent: content, postImage: image, postCategory: category },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  postUpdate: (postId) => api.put(`/api/posts/${postId}`),
  postDelete: (postId) => api.delete(`/api/posts/${postId}`),

  commentWrite: (postId, cmt) =>
    api.post(
      `/api/comments/${postId}`,
      { comment: cmt },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  commentUpdate: (postId) => api.put(`/api/comments/${postId}`),
  commentDelete: (postId) => api.delete(`/api/comments/${postId}`),
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
        // window.location.href = '/login';
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
        }
        // { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("is_login", res.data.token);
        alert("로그인 되었습니다!");

        if (!localStorage.getItem("nickname")) {
          // window.location.href = '/info';

          window.location.replace("/info");
        } else {
          window.location.replace("/");
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
        alert("로그인 되었습니다!");

        // window.location.href = '/info';
      })
      .catch((err) => {
        console.log(err);
      });
  },

  userInfo: (nickname, birthday, user_mbti, introduction, userGender) => {
    instance
      .put(
        "/api/signup/first",
        {
          nickname: nickname,
          gender: userGender,
          birthday: birthday,
          mbti: user_mbti,
          introduction: introduction,
        },
        { headers: { Authorization: `Bearer ${token}` } }
        // { withCredentials: true }
      )
      .then((res) => {
        console.log("성공", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
