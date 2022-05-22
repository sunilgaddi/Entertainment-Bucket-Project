import ACTIONS from "../actions";


const initialState = {
    user:[],
    isLoggedIn:"",
    isAdmin:false,
    subscriptionDetails:[]
}

const authReducers = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN : return {...state, isLoggedIn:true }
        case ACTIONS.LOGOUT :return {...state, isLoggedIn:false}
        case ACTIONS.GET_INFO :return {...state, user:action.payload.user,isAdmin:action.payload.isAdmin}
        case ACTIONS.SUBSCRIPTION_DETAILS : return { ...state, subscriptionDetails:action.payload.subscriptionDetails}
        default: return state
    }
}

export default authReducers
