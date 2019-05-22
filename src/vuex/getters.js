//test
export const getCount = state => {
    return state.count
}
export const getloginState = state => {
    return state.loginState
}


export const getHeadUrl = state => {

    var loginInfo=sessionStorage.getItem("loginInfo");
    if(loginInfo){
        var param=JSON.parse(loginInfo);
        state.headUrl=param.headUrl
    }
    return state.headUrl
}
