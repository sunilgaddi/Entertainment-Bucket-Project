import {applyMiddleware,compose,createStore} from 'redux'
import rootReducers from './reducers/index'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducers,
    compose(applyMiddleware(thunk)/*,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/))

function DataProvider({children}){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider

