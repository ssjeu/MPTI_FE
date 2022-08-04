// user.js
import { authApi } from '../../shared/api';
import Swal from 'sweetalert2';

// Actions
const LOAD_USER = 'user/LOAD_USER';
const SIGN_IN = 'user/SIGN_IN';
const LOG_OUT = 'user/LOG_OUT';

const initialState = {
  is_login: false,
  email: null,
  user: {
    userImage: '',
    nickname: '',
    gender: '',
    birthday: '',
    mbti: '',
    introduction: '',
    mannerScore: '',
  },
};

export function signIn(user) {
  return { type: SIGN_IN, user: user };
}

export function logOut(user) {
  return { type: LOG_OUT, user: user };
}

// middlewares
export const signUpDB = (email, name, password, passwordCheck) => {
  return function (dispatch) {
    authApi.signUp(email, name, password, passwordCheck);
  };
};

export const signInDB = (email, password) => {
  return function (dispatch) {
    authApi.login(email, password);
    dispatch(signIn(email));
  };
};

export const kakaoLogin = (code) => {
  return async function (dispatch) {
    await authApi.kakaoLogin(code);
  };
};

export const userInfoDB = (formData, nickname) => {
  return function (dispatch) {
    authApi.userInfo(formData, nickname);
  };
};

export const logOutDB = () => {
  return function (dispatch) {
    Swal.fire({
      text: '정말 로그아웃하실 건가요?ㅜ.ㅜ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#64be72',
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        authApi.logOut().catch((err) => console.log(err));
        dispatch(logOut());
        window.location.reload();
      }
    });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'user/SIGN_IN': {
      return { is_login: true, email: action.user, user: { ...state.user } };
    }

    case 'user/LOG_OUT': {
      sessionStorage.clear();

      return { is_login: false };
    }
    default:
      return state;
  }
}
