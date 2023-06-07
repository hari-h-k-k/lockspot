import {combineReducers} from 'redux';
import dialogReducer from './DialogReducer';
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
    dialogSelector: dialogReducer,
    user: userReducer,
});

export default rootReducer;
