import { createAction, handleActions } from "redux-actions";
import { communityApi } from "../../shared/api";
import Swal from "sweetalert2";

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
        Swal.fire({
          text: "댓글 작성 완료!",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        }).then((res) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        if (err.response.data.blocked === "blocked") {
          Swal.fire({
            text: "차단된 사용자는 댓글을 작성할 수 없습니다.",
            icon: "error",
            confirmButtonColor: "#64be72",
            confirmButtonText: "확인",
          }).then((res) => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            text: "로그인 후 댓글 작성 가능합니다!",
            icon: "warning",
            confirmButtonColor: "#64be72",
            confirmButtonText: "확인",
          }).then((res) => {
            window.location.reload();
          });
        }
        console.log("POST addCommentAC Error: ", err);
      });
  };
};

const deleteCommentAC = (commentId) => {
  return async function () {
    await communityApi
      .commentDelete(commentId)
      .then((res) => {
        Swal.fire({
          text: "댓글 삭제 완료!",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        }).then((res) => {
          window.location.reload();
        });
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
