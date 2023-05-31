import { combineReducers } from 'redux';
// import authenticationReducer from './AuthenticationReducer';
import dialogReducer from './DialogReducer';
// import homeReducer from "./HomeReducer";
// import popUpReducer from "./PopUpReducer";
import userReducer from "./UserReducer";
// import turfReducer from "./TurfReducer";

const rootReducer = combineReducers({
    // authentication: authenticationReducer,
    dialogSelector: dialogReducer,
    // searchActivated: homeReducer,
    // popUp: popUpReducer,
    user: userReducer,
    // turf: turfReducer
});

export default rootReducer;
