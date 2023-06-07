const initialState = {
    token: null,
    email: "",
    userId: "",
    userName: "",
    userType: ""
};

const userReducer = (state = initialState, action) => {

    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    if (userDetails != null) {
        state = userDetails
    }

    switch (action.type) {
        case "edit":
            sessionStorage.setItem('userDetails', JSON.stringify(action.payload));
            return {
                ...state,
                ...action.payload,
            };
        case "clear":
            sessionStorage.removeItem('userDetails');
            return initialState
        default:
            return state
    }

};
export default userReducer;