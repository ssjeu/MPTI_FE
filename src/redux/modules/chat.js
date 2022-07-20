import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { chatApi } from "../../shared/api";

// Action type
const GET_CHAT_LIST = "GET_CHAT_LIST";
const GET_USER_INFO = "GET_USER_INFO";
const SEND_MESSAGE = "SEND_MESSAGE";
const GET_MESSAGE = "GET_MESSAGE";

// Action creator
const getChatList = createAction(GET_CHAT_LIST, (rooms) => ({ rooms }));
const getUserInfo = createAction(GET_USER_INFO, (userInfo) => ({ userInfo }));
const sendMessage = createAction(SEND_MESSAGE, (data) => ({ data }));
const getMessage = createAction(GET_MESSAGE, (data) => ({ data }));

const initialState = {
  rooms: [], // 전체 채팅방 목록
  userInfo: [], // 채팅방 목록에서 로그인한 유저 기준 상대방 정보
  data: [], // 메세지
};

// Middlewares
// 채팅방 생성
export const createRoomAC = (receiverNum) => {
  return async function () {
    await chatApi
      .createRoom(receiverNum)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 채팅 목록 get
export const chatListAC = () => {
  return async function (dispatch) {
    await chatApi
      .chatList()
      .then((res) => {
        dispatch(getChatList(res.data.chatList));
        dispatch(getUserInfo(res.data.userInfo));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 메세지 전송
export const sendMessageAC = (roomId, content) => {
  return async function (dispatch) {
    await chatApi
      .sendMessage(roomId, content)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 채팅방 메세지 get
export const getMessageAC = (roomId) => {
  return async function (dispatch) {
    await chatApi
      .getMessage(roomId)
      .then((res) => {
        dispatch(getMessage(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 채팅방 나가기
export const exitRoomAC = (roomId) => {
  return async function () {
    await chatApi
      .exitRoom(roomId)
      .then((res) => {
        window.location.replace("/chatlist");
      })
      .catch((err) => {
        console.log("PUT updatePostAC Error: ", err);
      });
  };
};

// Reducers
export default handleActions(
  {
    [GET_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.rooms = action.payload.rooms;
        console.log("GET_CHAT_LIST");
      }),

    [GET_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
        console.log("GET_USER_INFO");
      }),

    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
        console.log("GET_MESSAGE");
      }),
  },
  initialState
);

const actionCreators = {
  createRoomAC,
  getChatList,
  getUserInfo,
  chatListAC,
  exitRoomAC,
  sendMessage,
  sendMessageAC,
  getMessage,
  getMessageAC,
};

export { actionCreators };
