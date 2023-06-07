import {DIALOG_DEFAULT, SHOW_LOG_IN} from '../../constants/strings/Strings.js';

export const showLogIn = (screen = DIALOG_DEFAULT) => {
    return {
        type: SHOW_LOG_IN,
        payload: screen
    };
};
