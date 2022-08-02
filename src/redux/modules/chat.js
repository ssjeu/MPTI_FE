import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { chatApi } from "../../shared/api";
import Swal from "sweetalert2";

// Action type
const CREATE_ROOM = "CREATE_ROOM";
const GET_CHAT_LIST = "GET_CHAT_LIST";
const GET_USER_INFO = "GET_USER_INFO";
const SEND_MESSAGE = "SEND_MESSAGE";
const GET_MESSAGES = "GET_MESSAGES";

const USER_BLOCK = "USER_BLOCK";
const USER_UNBLOCK = "USER_UNBLOCK";

// Action creator
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const getChatList = createAction(GET_CHAT_LIST, (rooms) => ({ rooms }));
const getUserInfo = createAction(GET_USER_INFO, (userInfo) => ({ userInfo }));
const sendMessage = createAction(SEND_MESSAGE, (data) => ({ data }));
const getMessages = createAction(GET_MESSAGES, (data) => ({ data }));

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
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
};

// 채팅방 메세지 get
export const getMessagesAC = (roomId) => {
  return async function (dispatch) {
    await chatApi
      .getMessages(roomId)
      .then((res) => {
        dispatch(getMessages(res.data.messages));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 채팅방 나가기
export const exitRoomAC = (roomId) => {
  return async function () {
    Swal.fire({
      text: "채팅방에서 나가시겠습니까?ㅜ.ㅜ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#64be72",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      cancleButtonColor: "#d9d9d9",
    }).then((result) => {
      if (result.isConfirmed) {
        chatApi
          .exitRoom(roomId)
          .then((res) => {
            Swal.fire(
              "방에서 퇴장하셨습니다.",
              "채팅방 내역은 삭제되었습니다.",
              "success"
            ).then(() => {
              window.location.replace("/chatlist");
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };
};

// 상대방 차단
export const blockUserAC = (userNum) => {
  return async function (dispatch) {
    Swal.fire({
      text: "정말 상대방을 차단하실건가요?ㅜ.ㅜ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#64be72",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      cancleButtonColor: "#d9d9d9",
    }).then((result) => {
      if (result.isConfirmed) {
        chatApi
          .blockUser(userNum)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        dispatch(userBlock(1));
      } else {
        window.location.reload();
      }
    });
  };
};

// 상대방 차단 해제
export const unblockUserAC = (userNum) => {
  return async function (dispatch) {
    await chatApi
      .unblockUser(userNum)
      .then((res) => {
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
      }),

    [GET_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.rooms = action.payload.rooms;
      }),

    [GET_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),

    [GET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),

    [USER_BLOCK]: (state, action) =>
      produce(state, (draft) => {
        draft.blocked = action.payload.blocked;
      }),

    [USER_UNBLOCK]: (state, action) =>
      produce(state, (draft) => {
        draft.blocked = action.payload.blocked;
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
  getMessages,
  getMessagesAC,
  userBlock,
  blockUserAC,
  userUnblock,
  unblockUserAC,
};

export { actionCreators };
