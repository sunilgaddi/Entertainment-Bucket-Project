import ACTIONS from "../actions";


const initialState = {
    user:[],
    isLoggedIn:false,
    isAdmin:false,
}

const authReducers = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN : return {...state, isLoggedIn:true }
        case ACTIONS.GET_INFO :return {...state, user:action.payload.user,
        isAdmin:action.payload.isAdmin}
        default: return state
    }
}

export default authReducers
