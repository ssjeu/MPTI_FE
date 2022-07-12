import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { recommendApi } from '../../shared/api';

// Action type
const GET_RECOMMEND = 'GET_RECOMMEND';

// Action creator
const getRecommend= createAction(GET_RECOMMEND, (data) => ({ data }));

const initialState = {
  list: [],
};

// Middlewares
// 나와 잘 맞는 MBTI 추천
export const recommendDB = () => {
  return async function (dispatch, getState) {
    await recommendApi
      .recommendList()
      .then((res) => {
        console.log(res.data.user);
        dispatch(getRecommend(res.data.user));
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
        draft.list = action.payload.data;
      }),
  },
  initialState
);

const actionCreators = {
  getRecommend,
  recommendDB
};

export { actionCreators };
