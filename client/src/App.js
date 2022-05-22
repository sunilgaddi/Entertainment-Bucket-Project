import {Routes, Route, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios'
import './App.css';
import HandleRoutes from "./components/HandleRoutes";

import { dispactchLogin, dispatchUserInfo,dispatchSubscriptionDetails,dispactchLogout } from './redux/actions/authActions'


function App() {
  const [isLogged,setIsLogged] = useState('')
  const[isLoggedState,setIsLoggedState] = useState('')
  const token = useSelector(state => state.tokenReducer)
  const auth = useSelector(state => state.authReducers)
  const dispatch = useDispatch()


  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn')
    setIsLogged(auth.isLoggedIn)
    if(isLogged === true || isLogged === false){
      setIsLoggedState(true)
    }
    else{
      setIsLoggedState(false)
    }

    if (userLoggedIn) {
      const getToken = async () => {
        try {
          const res = await axios.get('/eb/user/refresh_token', null)
          dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
        }
        catch (err) {
          console.log(err.response.data)
        }
      }
      getToken()
    }
    else{
      dispatch(dispactchLogout())
    }
  }, [auth.isLoggedIn,isLogged,dispatch])

  useEffect(() => {
    if (token) {

      dispatch(dispactchLogin())

      const fetchUserInfo = async (token) => {
        const res = await axios.get('/eb/user/info', {
          headers: { Authorization: token }
        })
        return res
      }

      const fetchSubscriptionDetails = async (token) => {
        const res = await axios.get('/eb/get-subscription-details',{
          headers:{ Authorization :token}
        })
        return res
      }
      
      //calling function
      fetchUserInfo(token).then((res) => {
        dispatch(dispatchUserInfo(res))
      })

      fetchSubscriptionDetails(token).then( (res) => {
        dispatch(dispatchSubscriptionDetails(res))
      })

    }
    
  }, [token, dispatch])

  return (
    <div className="App">
        <Routes>
          <Route path="/eb/*" element={<HandleRoutes/>} />
          { isLoggedState && <Route path ='/' element={ isLogged === true  && <Navigate to='/eb/home' /> || isLogged === false && <Navigate to='/eb/user/login'/> }  />}
        </Routes>

    </div>
  );
}

export default App;
