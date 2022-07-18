import { createAction, handleActions } from 'redux-actions';
import { userInfoApi } from '../../shared/api';
import { produce } from 'immer';

// Action type
const GET_USERINFO = 'GET_USERINFO';

// Action creator
const getUserInfo = createAction(GET_USERINFO, (info) => ({ info }));

const initialState = {
  user: [],
};

// Middlewares
// 마이페이지 유저 정보
export const userInfoDB = (userNum) => {
  return async function (dispatch, getState) {
    await userInfoApi
      .myUserInfo(userNum)
      .then((res) => {
        // console.log(res);
        dispatch(getUserInfo(res.data.existingUser));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 내 프로필 완성하기
export const userProfileDB = (userNum, formData) => {
  return function (dispatch, getState) {
    // for (let value of formData.values()) {
    //   console.log(value);
    // }

    userInfoApi
      .userProfile(userNum, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reduers
export default handleActions(
  {
    [GET_USERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.info;
        // console.log(action.payload.info);
      }),
  },
  initialState
);

const actionCreators = {
  getUserInfo,
};

export { actionCreators };
