const initialState = {
    token: "",
    email: "",
    userId: "",
    userName: "",
    loginState: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "edit":
            return {
                ...state,
                ...action.payload,
            };
        case "clear":
            return initialState
        default:
            return state
    }

};
export default userReducer;