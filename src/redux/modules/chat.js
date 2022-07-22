import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { chatApi } from "../../shared/api";

// Action type
const CREATE_ROOM = "CREATE_ROOM";
const GET_CHAT_LIST = "GET_CHAT_LIST";
const GET_USER_INFO = "GET_USER_INFO";
const SEND_MESSAGE = "SEND_MESSAGE";
const GET_MESSAGE = "GET_MESSAGE";

const USER_BLOCK = "USER_BLOCK";
const USER_UNBLOCK = "USER_UNBLOCK";

// Action creator
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const getChatList = createAction(GET_CHAT_LIST, (rooms) => ({ rooms }));
const getUserInfo = createAction(GET_USER_INFO, (userInfo) => ({ userInfo }));
const sendMessage = createAction(SEND_MESSAGE, (data) => ({ data }));
const getMessage = createAction(GET_MESSAGE, (data) => ({ data }));

const userBlock = createAction(USER_BLOCK, (blocked) => ({ blocked }));
const userUnblock = createAction(USER_UNBLOCK, (blocked) => ({ blocked }));

const initialState = {
  room: [], // 생성된 채팅방
  rooms: [], // 전체 채팅방 목록
  userInfo: [], // 채팅방 목록에서 로그인한 유저 기준 상대방 정보
  data: [], // 메세지
  blocked: 0, // 차단 상태
};

// Middlewares
// 채팅방 생성
export const createRoomAC = (receiverNum) => {
  return async function (dispatch) {
    await chatApi
      .createRoom(receiverNum)
      .then((res) => {
        dispatch(createRoom(res.data.Room));
        console.log(res.data.Room);
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/chatlist");
        alert("이미 개설된 방이 있습니다");
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
        window.alert("채팅방에서 퇴장하셨습니다.");
      })
      .catch((err) => {
        console.log("PUT updatePostAC Error: ", err);
      });
  };
};

// 상대방 차단
export const blockUserAC = (userNum) => {
  return async function (dispatch) {
    await chatApi
      .blockUser(userNum)
      .then((res) => {
        console.log(res.data);
        dispatch(userBlock(1));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 상대방 차단 해제
export const unblockUserAC = (userNum) => {
  return async function (dispatch) {
    await chatApi
      .unblockUser(userNum)
      .then((res) => {
        console.log(res.data);
        dispatch(userUnblock(0));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Reducers
export default handleActions(
  {
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room = action.payload.room;
        console.log("CREATE_ROOM");
      }),

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

    [USER_BLOCK]: (state, action) =>
      produce(state, (draft) => {
        draft.blocked = action.payload.blocked;
        console.log("USER_BLOCK");
      }),
    [USER_UNBLOCK]: (state, action) =>
      produce(state, (draft) => {
        draft.blocked = action.payload.blocked;
        console.log("USER_UNBLOCK");
      }),
  },
  initialState
);

const actionCreators = {
  createRoom,
  createRoomAC,
  getChatList,
  getUserInfo,
  chatListAC,
  exitRoomAC,
  sendMessage,
  sendMessageAC,
  getMessage,
  getMessageAC,
  userBlock,
  blockUserAC,
  userUnblock,
  unblockUserAC,
};

export { actionCreators };
