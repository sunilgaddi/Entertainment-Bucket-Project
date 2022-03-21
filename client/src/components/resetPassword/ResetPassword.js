import {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router'

const initialState = {
    password:'',
    cf_password:''
}

function ResetPassword () {
    const [user, setUser] = useState(initialState)
    const [serverMsg,setServerMsg] = useState({})
    const {reset_token} = useParams()

    const  handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const {password, cf_password} = user

    const handleSubmit = (e) => {
        e.preventDefault()

        const resetPassword = async () => {
            
            try {
                const res = await axios.post('/user/reset', {password, cf_password},{headers:{Authorization:reset_token}} )
                console.log("hello",res)
                setServerMsg({[Object.keys(res.data)]:Object.values(res.data)})
               
            } catch (err) {
                setServerMsg({[Object.keys(err.response.data)]:Object.values(err.response.data)})
            }
        }
        resetPassword()
    }
    return(
        <div className='panel_section'>
            <div className='panel_wrapper'>
                {serverMsg.success && <span className="success">{serverMsg.success}</span>}
                <h1 className='panel_title' id='resetP_title'>Reset Password.</h1>
                <form className='panel_form' id='ResetP_form' onSubmit={handleSubmit}>


                    <label htmlFor='password' className='labels'>Password</label>
                    <input type='password' id='password' className='input' name='password' value={user.password} onChange={handleChange} ></input>
                    {serverMsg.password && <span className='err'>{serverMsg.password}</span>}

                    <label htmlFor='cf_password' className='labels'>Confirm Password</label>
                    <input type='password' id='cf_password' className='input' name='cf_password' value={user.cf_password} onChange={handleChange} ></input>
                    {serverMsg.cf_password && <span className='err'>{serverMsg.cf_password}</span>}


                    <div className='btn-wrapper'>
                        <button>Reset</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword