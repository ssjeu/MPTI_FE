import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { recommendApi } from "../../shared/api";

// Action type
const GET_RECOMMEND = "GET_RECOMMEND";
const GET_MBTI_FRIEND = "GET_MBTI_FRIEND";

// Action creator
const getRecommend = createAction(GET_RECOMMEND, (list) => ({ list }));
const getMbtiFriend = createAction(GET_MBTI_FRIEND, (mbti) => ({ mbti }));

const initialState = {
  // 냐와 잘 맞는 MBTI
  list: [],

  // 다양한 MBTI 친구들
  mbti: [],
};

// Middlewares
// 나와 잘 맞는 MBTI 추천
export const recommendDB = () => {
  return async function (dispatch) {
    await recommendApi
      .recommendList()
      .then((res) => {
        dispatch(getRecommend(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 다양한 MBTI 친구들 추천
export const mbtiFriendDB = () => {
  return async function (dispatch) {
    await recommendApi
      .mbtiFriendList()
      .then((res) => {
        dispatch(getMbtiFriend(res.data.userList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Reducers
export default handleActions(
  {
    [GET_RECOMMEND]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
        console.log("GET_RECOMMEND 성공");
      }),
    [GET_MBTI_FRIEND]: (state, action) =>
      produce(state, (draft) => {
        draft.mbti = action.payload.mbti;
        console.log("GET_MBTI_FRIEND 성공");
      }),
  },
  initialState
);

const actionCreators = {
  getRecommend,
  recommendDB,
  getMbtiFriend,
  mbtiFriendDB,
};

export { actionCreators };
