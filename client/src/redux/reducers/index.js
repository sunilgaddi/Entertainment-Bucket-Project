import {combineReducers} from 'redux'
import authReducers from './authReducers'
import tokenReducer from './tokenReducer'

export default combineReducers({
    authReducers,
    tokenReducer
})