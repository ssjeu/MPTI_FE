import { createAction, handleActions } from "redux-actions";
import { communityApi } from "../../shared/api";
import { produce } from "immer";
import Swal from "sweetalert2";

// Action Type
const GET_LIKE = "GET_LIKE";
const GET_USER = "GET_USER";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

// Action Creator
const getLike = createAction(GET_LIKE, (like) => ({
  like,
}));
const getUser = createAction(GET_USER, (user) => ({ user }));
const addLike = createAction(ADD_LIKE, (like) => ({
  like,
}));
const deleteLike = createAction(DELETE_LIKE, (like) => ({
  like,
}));

const initialState = {
  like: 0,
  user: [],
};

// Middlewares
const getLikeAC = (postId) => {
  return async function (dispatch) {
    await communityApi
      .likeList(postId)
      .then((res) => {
        dispatch(getLike(res.data.likeUsers.length));
        dispatch(getUser(res.data.likeUsers));
      })
      .catch((err) => {
        console.log("GET getLikeAC Error: ", err);
      });
  };
};

const addLikeAC = (postId) => {
  return async function (dispatch) {
    await communityApi
      .likeAdd(postId)
      .then(() => {
        Swal.fire({
          text: "좋아요! 🥳",
          icon: "success",
          confirmButtonText: "확인",
        });
      })
      .catch((err) => {
        console.log("POST addLikeAC Error: ", err);
      });
  };
};

const deleteLikeAC = (postId) => {
  return async function () {
    await communityApi
      .likeDelete(postId)
      .then((res) => {
        Swal.fire({
          text: "좋아요 취소 🥺",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        });
      })
      .catch((err) => {
        console.log("DELETE deleteLikeAC Error: ", err);
      });
  };
};

export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.like;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
  },
  initialState
);

const actionCreators = {
  getLike,
  getLikeAC,
  getUser,
  addLike,
  addLikeAC,
  deleteLike,
  deleteLikeAC,
};

export { actionCreators };
