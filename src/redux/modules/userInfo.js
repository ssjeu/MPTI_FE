import { createAction, handleActions } from "redux-actions";
import { userInfoApi } from "../../shared/api";
import { produce } from "immer";
import SweetAlert from "../../components/sweetAlert/SweetAlert";
import Swal from "sweetalert2";

// Action type
const GET_USERINFO = "GET_USERINFO";
const RESET_USERINFO = "RESET_USERINFO";

// Action creator
const getUserInfo = createAction(GET_USERINFO, (info) => ({ info }));
const resetUserInfo = createAction(RESET_USERINFO, (info) => ({ info }));

const initialState = {
  user: [],
};

// Middlewares
// 마이페이지 유저 정보 불러오기
export const userInfoDB = (userNum) => {
  return async function (dispatch, getState) {
    await userInfoApi
      .myUserInfo(userNum)
      .then((res) => {
        dispatch(getUserInfo(res.data.existingUser));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const resetInfoAC = () => {
  return function (dispatch) {
    dispatch(resetUserInfo());
  };
};

// 마이페이지 유저 정보 수정하기
export const userInfoChangeDB = (userNum, userNickname, preUserImage) => {
  return function (dispatch, getState) {
    userInfoApi
      .userInfoChange(userNum, userNickname, preUserImage)
      .then((res) => {
        Swal.fire({
          text: "수정이 완료되었습니다!",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        }).then((result) => {
          window.location.replace("/my");
        });
      })
      .catch((err) => console.log(err));
  };
};

// 내 프로필 완성하기
export const userProfileDB = (userNum, userIntroduction, profileImages) => {
  return function (dispatch, getState) {
    userInfoApi
      .userProfile(userNum, userIntroduction, profileImages)
      .then((res) => {
        SweetAlert({
          icon: "success",
          text: "프로필 수정이 완료되었어요!",
        });
        Swal.fire({
          text: "프로필 수정이 완료되었어요!",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        }).then((result) => {
          window.location.reload();
        });
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
      }),

    [RESET_USERINFO]: (state) =>
      produce(state, (draft) => {
        draft.user = initialState.user;
      }),
  },
  initialState
);

const actionCreators = {
  getUserInfo,
  userInfoDB,
  resetUserInfo,
  resetInfoAC,
};

export { actionCreators };
