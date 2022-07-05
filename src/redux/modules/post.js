import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

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
  detail_post: [],
};

// Middlewares
// 전체 게시글 불러오기
const postDB = () => {
  return async function (dispatch, getState) {
    await apis
      .postList()
      .then((res) => {
        console.log(res.data, "postDB response");
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
    await apis
      .postDetail(postId)
      .then((res) => {
        console.log(res.data, "detailPostDB response");
        dispatch(getDetail(res.data));
      })
      .catch((err) => {
        console.log("GET detailPostDB Error: ", err);
      });
  };
};

// 게시글 업로드
const addPostAC = (postCategory, postContent, postImage) => {
  return async function (dispatch, getState) {
    // const config = {
    // 	headers: {
    // 		"Content-Type": "multipart/form-data",
    // 	},
    // };
    let new_post = {
        postCategory: postCategory,
        postContent: postContent,
        postImage: postImage,
      };

    await apis
      .postWrite( {...new_post} )
      .then((res) => {
        console.log("addPost response", res);
      })
      .catch((err) => {
        if (err.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않음
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스, node.js에서는 http.ClientRequest 인스턴스
          console.log(err.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생
          console.log("Error", err.message);
        }
        console.log(err, err.config);
      });
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        console.log("GET_POST 성공");
      }),

    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post = action.payload.detail_post;
        console.log("GET_DETAIL 성공");
      }),
      [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // push: 배열의 맨 마지막에 쌓여 뷰에서 맨 밑에 쌓임
        // 따라서 배열의 맨 앞에 쌓는 unshift 사용
        draft.post.unshift(action.payload.post); 
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  postDB,
  getDetail,
  detailPostDB,
  addPost,
  addPostAC
};

export { actionCreators };
