import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from 'axios'
import './App.css';
import HandleRoutes from "./components/HandleRoutes";

import { dispactchLogin, dispatchUserInfo } from './redux/actions/authActions'


function App() {
  const token = useSelector(state => state.tokenReducer)
  const auth = useSelector(state => state.authReducers)
  const dispatch = useDispatch()

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn')

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
  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if (token) {

      dispatch(dispactchLogin())

      const fetchUserInfo = async (token) => {
        const res = await axios.get('/eb/user/info', {
          headers: { Authorization: token }
        })
        return res
      }
      fetchUserInfo(token).then((res) => {
        dispatch(dispatchUserInfo(res))
      })

    }
  }, [token, dispatch])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/eb/*" element={<HandleRoutes />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
