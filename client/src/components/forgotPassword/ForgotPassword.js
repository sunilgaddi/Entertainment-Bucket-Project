import { useState } from 'react'
import axios from 'axios'

const initialState = {
    email: ''
}

function ForgotPassword() {

    const [user, setUser] = useState(initialState)
    const [serverMsg, setServerMsg] = useState({})

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const { email } = user

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/forgotpassword', { email })
            setServerMsg({ [Object.keys(res.data)]: Object.values(res.data) })

        } catch (err) {
            setServerMsg({ [Object.keys(err.response.data)]: Object.values(err.response.data) })
        }

    }


    return (
        <div className='panel_section'>
            <div className='panel_wrapper'>
                {serverMsg.success && <span className="success">{serverMsg.success}</span>}
                <h1 className='panel_title' id='forgotP_title'>Forgot Password.</h1>
                <form className='panel_form' id='ForgotP_form' onSubmit={handleSubmit}>


                    <label htmlFor='email' className='labels'>Email</label>
                    <input type='email' id='email' className='input' name='email' value={user.email} onChange={handleChange} ></input>
                    {serverMsg.email && <span className='err'>{serverMsg.email}</span>}


                    <div className='btn-wrapper'>
                        <button>Forgot</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword