import ACTIONS from "../actions";


const initialState = {
    user:[],
    isLoggedIn:false,
    isAdmin:false,
}

const authReducers = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN : return {...state, isLoggedIn:true }
        default: return state
    }
}

export default authReducers
