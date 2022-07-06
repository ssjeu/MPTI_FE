import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { communityApi } from "../../shared/api";

// Action Type
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// Action Creator
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const updateComment = createAction(UPDATE_COMMENT, (comment) => ({
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
        console.log(res.data, "addCommentAC response");
        // dispatch(addComment(res.data));
      })
      .catch((err) => {
        console.log("POST addCommentAC Error: ", err);
      });
  };
};

const updateCommentAC = (commentId) => {
  return async function () {
    await communityApi
      .updateDelete(commentId)
      .then((res) => {
        console.log(res.data, "updateCommentAC response");
      })
      .catch((err) => {
        console.log("PUT updateCommentAC Error: ", err);
      });
  };
};

const deleteCommentAC = (commentId) => {
  return async function () {
    await communityApi
      .commentDelete(commentId)
      .then((res) => {
        console.log(res.data, "deleteCommentAC response");
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
  updateComment,
  updateCommentAC,
};

export { actionCreators };
