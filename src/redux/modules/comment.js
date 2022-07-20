import { createAction, handleActions } from "redux-actions";
import { communityApi } from "../../shared/api";

// Action Type
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// Action Creator
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (comment) => ({
  comment,
}));

const initialState = {
  list: [],
};

// Middlewares
const addCommentAC = (postId, text) => {
  return async function (dispatch, getState) {
    await communityApi
      .commentWrite(postId, text)
      .then((res) => {
        window.location.reload();
        window.alert("댓글 작성 완료");
      })
      .catch((err) => {
        window.alert("로그인 후 댓글 작성 가능합니다!");
        console.log("POST addCommentAC Error: ", err);
      });
  };
};

const deleteCommentAC = (commentId) => {
  return async function () {
    await communityApi
      .commentDelete(commentId)
      .then((res) => {
        window.location.reload();
        window.alert("댓글 삭제 완료");
      })
      .catch((err) => {
        console.log("DELETE deleteCommentAC Error: ", err);
      });
  };
};

export default handleActions({}, initialState);

const actionCreators = {
  addComment,
  addCommentAC,
  deleteComment,
  deleteCommentAC,
};

export { actionCreators };
