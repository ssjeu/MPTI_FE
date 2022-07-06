import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action Type
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// Action Creator
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const updateComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const deleteComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));

const initialState = {
  list: [],
};

// Middlewares
const addCommentAC = (postId, text) => {
  return async function (dispatch, getState) {
    await apis
      .commentWrite(postId, text)
      .then((res) => {
        console.log(res.data, "addCommentAC response");
        // dispatch(addComment(res.data));
      })
      .catch((err) => {
        console.log("POST addCommentAC Error: ", err);
      });
  };
};

export default handleActions(
  {
    // [GET_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.post = action.payload.post;
    //     console.log("GET_POST 성공");
    //   }),
    // [ADD_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     // push: 배열의 맨 마지막에 쌓여 뷰에서 맨 밑에 쌓임
    //     // 따라서 배열의 맨 앞에 쌓는 unshift 사용
    //     draft.post.unshift(action.payload.post);
    //   }),
  },
  initialState
);

const actionCreators = {
  addComment,
  addCommentAC,
};

export { actionCreators };
