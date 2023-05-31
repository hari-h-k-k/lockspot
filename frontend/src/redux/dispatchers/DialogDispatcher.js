import {
    DIALOG_SIGN_IN_EMAIL,
    DIALOG_REGISTER_EMAIL,
    DIALOG_DEFAULT,
    SHOW_LOG_IN
} from '../../constants/strings/Strings.js';
;

export const showLogIn = (screen=DIALOG_DEFAULT) => {
    return {
        type: SHOW_LOG_IN,
        payload: screen
    };
};
