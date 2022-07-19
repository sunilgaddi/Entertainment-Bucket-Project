import { useEffect, useState } from "react"
import axios from 'axios'
import { useSelector } from "react-redux"
import ClientSideValidation from "../errors/ClientSideValidation"
import { dispactchLogin } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login';


const initialState = {
    email: '',
    password: '',
}

function Login() {
    const auth = useSelector(state => state.authReducers)
    const [user, setUser] = useState(initialState)
    const [serverMsg, setServerMsg] = useState({})
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const { email, password, } = user
    


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(ClientSideValidation(user))
        try {
            const res = await axios.post('/eb/user/login', { email, password })
            setServerMsg({ [Object.keys(res.data)]: Object.values(res.data) })
            dispatch(dispactchLogin())
            localStorage.setItem("userLoggedIn", true)
            navigate('/eb/home')
        }
        catch (err) {
            setServerMsg({ [Object.keys(err.response.data)]: Object.values(err.response.data) })
        }
    }

    


    const responseGoogle = async (response) => {
        try{
            const res = await axios.post('/eb/user/google_login',{ tokenId: response.tokenId})
            setServerMsg({ [Object.keys(res.data)]: Object.values(res.data) })
            dispatch(dispactchLogin())
            localStorage.setItem("userLoggedIn", true)
            navigate('/eb/home/movies')
        }
        catch(err){
            setServerMsg({ [Object.keys(err.response.data)]: Object.values(err.response.data) })
        }
      }

    return (
        <div className='panel_section'>
            <div className='panel_wrapper'>
                {serverMsg.success && <span className="success">{serverMsg.success}</span>}
                <h1 className='panel_title' id='login_title'>Login</h1>
                <form className='panel_form' id='login_form' onSubmit={handleSubmit}>


                    <label htmlFor='email' className='labels'>Email Address</label>
                    <input type='email' id='email' className='input' name='email' value={user.email} onChange={handleChange} ></input>
                    {serverMsg.email ? <span className='err'>{serverMsg.email}</span> : <span className='err'>{errors.email}</span>}

                    <label htmlFor='password' className='labels'>Password</label>
                    <input id='password' type='password' className='input' name='password' value={user.password} onChange={handleChange} ></input>
                    {serverMsg.password ? <span className='err'>{serverMsg.password}</span> : <span className='err'>{errors.password}</span>}


                    <div className='btn-wrapper'>

                        <button onClick={(e)=> handleSubmit(e)}>Login</button>

                        <span>Dont have a account?<a href="/eb/user/register">Register</a></span>

                    </div>

                    <div><span></span>OR<span></span></div>

                    <GoogleLogin
                        clientId="995457479831-r2gmith65015fblfbbvrhhq3lstros9b.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                </form>
            </div>
        </div>
    )
}
export default Login
