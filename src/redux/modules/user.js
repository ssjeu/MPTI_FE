// user.js
import { authApi } from '../../shared/api';

// Actions
const LOAD_USER = 'user/LOAD_USER';
const SIGN_IN = 'user/SIGN_IN';

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

// Action Creators
// export function loadUser(user) {
//   return { type: LOAD_USER, user };
// }

// export function signUp(user) {
//   return { type: SIGN_UP, user: user };
// }

export function signIn(user) {
  return { type: SIGN_IN, user: user };
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

<<<<<<< HEAD
export const userInfoDB = (formData) => {
  return function (dispatch) {
    for (let value of formData.values()) {
      console.log(value);
    }
    authApi.userInfo(formData);
=======
export const userInfoDB = (
  nickname,
  birthday,
  user_mbti,
  introduction,
  userGender
) => {
  return function (dispatch) {
    authApi.userInfo(nickname, birthday, user_mbti, introduction, userGender);
>>>>>>> e1a6a0b5a0691fe426af907c23f1080b989ca85d
  };
};
// export const loadUserDB = () => {
//   return function (dispatch) {};
// };

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'user/SIGN_IN': {
      console.log(action);

      return { is_login: true, email: action.user, user: { ...state.user } };
    }

    // case 'user/SIGN_UP': {
    //   // const user_info = {is_login: true, user: action.user}
    //   console.log(action);
    //   return { is_login: true, user: action.user };
    // }
    default:
      return state;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> e1a6a0b5a0691fe426af907c23f1080b989ca85d
