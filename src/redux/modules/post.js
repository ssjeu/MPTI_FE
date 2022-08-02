import { createAction, handleActions } from "redux-actions";
import { communityApi } from "../../shared/api";
import { produce } from "immer";
import Swal from "sweetalert2";

// Action Type
const GET_POST = "GET_POST";
const GET_DETAIL = "GET_DETAIL";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

// Action creator
const getPost = createAction(GET_POST, (post) => ({ post }));
const getDetail = createAction(GET_DETAIL, (detail_post) => ({
  detail_post,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (postId) => ({ postId }));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));

const initialState = {
  post: [],
  detail_post: ["posts"],
};

// Middlewares
// 전체 게시글 불러오기
const postDB = () => {
  return async function (dispatch, getState) {
    await communityApi
      .postList()
      .then((res) => {
        dispatch(getPost(res.data.posts));
      })
      .catch((err) => {
        console.log("GET postDB Error: ", err);
      });
  };
};

// 상세 정보 불러오기
const detailPostDB = (postId) => {
  return async function (dispatch, getState) {
    await communityApi
      .postDetail(postId)
      .then((res) => {
        dispatch(getDetail(res.data));
      })
      .catch((err) => {
        console.log("GET detailPostDB Error: ", err);
      });
  };
};

// 게시글 작성
const addPostAC = (formData) => {
  return async function () {
    await communityApi
      .postWrite(formData)
      .then((res) => {
        Swal.fire({
          text: "게시글 작성 완료!",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        }).then((res) => {
          window.location.replace("/community");
        });
      })
      .catch((err) => {
        window.location.replace("/community");
        window.alert("로그인 후 이용하실 수 있습니다.");
        if (err.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        console.log(err, err.config);
      });
  };
};

// 게시글 수정
const updatePostAC = (postId, category, content, img) => {
  return async function () {
    await communityApi
      .postUpdate(postId, category, content, img)
      .then(() => {
        Swal.fire({
          text: "게시글 수정 완료!",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        }).then(() => {
          window.location.replace("/community");
        });
      })
      .catch((err) => {
        window.location.replace("/community");
        window.alert("게시글 수정 실패");
        console.log("PUT updatePostAC Error: ", err);
      });
  };
};

// 게시글 삭제
const deletePostAC = (postId) => {
  return async function () {
    await communityApi
      .postDelete(postId)
      .then((res) => {
        Swal.fire({
          text: "게시글 삭제 완료!",
          icon: "success",
          confirmButtonColor: "#64be72",
          confirmButtonText: "확인",
        }).then(() => {
          window.location.replace("/community");
        });
      })
      .catch((err) => {
        console.log("DELETE deletePostAC Error: ", err);
      });
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),

    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post = action.payload.detail_post;
      }),

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
  getPost,
  postDB,
  getDetail,
  detailPostDB,
  addPost,
  addPostAC,
  updatePost,
  updatePostAC,
  deletePost,
  deletePostAC,
};

export { actionCreators };
