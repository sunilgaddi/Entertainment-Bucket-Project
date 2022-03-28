import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import axios from 'axios'
import './App.css';
import Registration from './components/create/Registration';
import ActivateEmail from './components/activateEmail/ActivateEmail';
import Profile from './components/profile/Profile'
import Login from './components/login/Login'
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import {dispactchLogin ,dispatchUserInfo} from './redux/actions/authActions'


function App() {
  const token = useSelector(state => state.tokenReducer)
  const auth = useSelector(state => state.authReducers)
  const dispatch = useDispatch()

  useEffect( () => {
    const userLoggedIn = localStorage.getItem('userLoggedIn')

    if(userLoggedIn){
      const getToken = async () => {
        try{
          const res = await axios.get('/user/refresh_token', null)
          dispatch({type:'GET_TOKEN',payload:res.data.access_token})
        }
        catch(err){
          console.log(err.response.data)
        }
      }
      getToken()
    }
  },[auth.isLogged,dispatch])

  useEffect( () => {
    if(token){

      dispatch(dispactchLogin())

      const fetchUserInfo = async (token) => {
        const res = await axios.get('/user/info',{
          headers:{Authorization:token}
        })
        return res
      }
      fetchUserInfo(token).then( (res) => {
        dispatch(dispatchUserInfo(res))
      })

    }
  },[token,dispatch])

  return (
    <div className="App"> 
    <Router>
      <Routes>
        <Route path='/user/register' element={<Registration/>}/>
      </Routes>
      <Routes>
        <Route path='/user/activation/:activation_token' element={<ActivateEmail/>}/>
      </Routes>
      <Routes>
        <Route path='/user/login' element={<Login/>}/>
      </Routes>

      <Routes>
        <Route path='/user/forgot' element={<ForgotPassword/>}/>
      </Routes>
      <Routes>
        <Route path='/user/reset/:reset_token' element={<ResetPassword/>}/>
      </Routes>
      <Routes>
        <Route path='/user/profile' element={<Profile/>}/>
      </Routes>
      
    </Router>
  </div>
  );
}

export default App;
