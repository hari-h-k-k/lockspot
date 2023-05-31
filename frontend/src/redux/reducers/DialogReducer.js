import {
    SHOW_LOG_IN,
    DIALOG_DEFAULT
} from '../../constants/strings/Strings.js';

const dialogReducer = (state = DIALOG_DEFAULT, action) => {
    switch (action.type) {
        case SHOW_LOG_IN:
            return action.payload;
        default:
            return DIALOG_DEFAULT;
    }
};

export default dialogReducer;