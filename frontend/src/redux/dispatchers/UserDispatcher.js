export default function UserDispatch(loginResponse,change){
    return ({
        type:change, //edit or clear
        payload:{
            token: loginResponse.token,
            email: loginResponse.email,
            userId: loginResponse.userId,
            userName:loginResponse.userName,
            userType:loginResponse.userType,
            loginState:true,
        }
    });
}