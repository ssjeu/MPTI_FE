import { legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

//모듈
import post from "./modules/post"
import user from './modules/user';

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({
    post,
    user
})
const store = createStore(rootReducer,enhancer);

export default store;