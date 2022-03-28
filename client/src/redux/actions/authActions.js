import ACTIONS from "."

export const dispactchLogin = () => {
    return {type:ACTIONS.LOGIN}
}

export const dispatchUserInfo = (res) => {
    return {
        type:ACTIONS.GET_INFO ,
        payload:{
            user:res.data.user,
            isAdmin:res.data.user.role === 1 ? true : false
        }
    }
}

