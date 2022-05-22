import {applyMiddleware,createStore} from 'redux'
import rootReducers from './reducers/index'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducers,
    applyMiddleware(thunk))

function DataProvider({children}){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider

