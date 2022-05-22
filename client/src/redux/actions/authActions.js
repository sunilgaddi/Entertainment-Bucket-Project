import ACTIONS from "."

export const dispactchLogin = () => {
    return { type: ACTIONS.LOGIN }
}

export const dispactchLogout = () =>{
    return {type :ACTIONS.LOGOUT}
}

export const dispatchUserInfo = (res) => {
    return {
        type: ACTIONS.GET_INFO,
        payload: {
            user: res.data.user,
            isAdmin: res.data.user.role === 1 ? true : false
        }
    }
}


export const dispatchSubscriptionDetails = (res) => {
    return {
        type: ACTIONS.SUBSCRIPTION_DETAILS,
        payload: {
            subscriptionDetails: res.data.subscriptionDetails,
        }
    }
}
