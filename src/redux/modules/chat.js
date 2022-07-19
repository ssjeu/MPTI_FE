import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { recommendApi } from '../../shared/api';
import axios from "axios";

// Action type
const SEND_MESSAGE = "SEND_MESSAGE";
const GET_MESSAGE = "GET_MESSAGE";

// Action creator
const sendMessage = createAction(SEND_MESSAGE, (data) => ({ data }));
const getMessage = createAction(GET_MESSAGE, (data) => ({ data }));

const initialState = {
  data: [],
};

// Middlewares
export const sendMessageAC = (chat) => {
  return async function (dispatch) {
    await axios({
      url: `http://localhost:5001/chat`,
      method: "post",
      data: {
        message: chat,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getMessageDB = () => {
  return async function (dispatch) {
    await axios({
      url: `http://localhost:5001/chat`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        dispatch(getMessage(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Reducers
export default handleActions(
  {
    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
        console.log("GET_MESSAGE");
      }),
  },
  initialState
);

const actionCreators = {
  sendMessage,
  sendMessageAC,
  getMessage,
  getMessageDB,
};

export { actionCreators };
