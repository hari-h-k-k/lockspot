const initialState = {
    token: null,
    email: "",
    userId: "",
    userName: "",
    userType: "",
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