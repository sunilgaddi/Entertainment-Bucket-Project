import { useState } from "react";
import axios from 'axios'
import '../../Panels.css'
import ClientSideValidation from '../errors/ClientSideValidation' 


const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    cf_password:'',
    phoneNumber:''
}

function Registration() {

    const [user, setUser] = useState(initialState)
    const [serverMsg, setServerMsg] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }
    
    const {firstName, lastName, email, password, cf_password, phoneNumber} = user

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setErrors(ClientSideValidation(user))
        try{
            const res = await axios.post('/eb/user/register',  {firstName, lastName, email, password, cf_password, phoneNumber})
            setServerMsg({[Object.keys(res.data)]:Object.values(res.data)})
        }
        catch(err){
            setServerMsg({[Object.keys(err.response.data)]:Object.values(err.response.data)})
        } 
    }

    return (
        <div className='panel_section'>
            <div className='panel_wrapper'>
            {serverMsg.success && <span className="success">{serverMsg.success}</span>}
                <h1 className='panel_title' id='registration_title'>Create</h1>
                <form className='panel_form' id='registration_form' onSubmit={handleSubmit}>

                    <label htmlFor='first_name' className='labels'>First Name</label>
                    <input type='text' id='first_name' className='input' name='firstName' value={user.firstName}  onChange={handleChange}  />
                    {serverMsg.firstName ? <span className='err'>{serverMsg.firstName}</span> : <span className='err'>{errors.firstName}</span>}

                    <label htmlFor='last_name' className='labels'>Last Name</label>
                    <input type='text' id='last_name' className='input' name='lastName' value={user.lastName} onChange={handleChange} ></input>
                    {serverMsg.lastName ? <span className='err'>{serverMsg.lastName}</span> : <span className='err'>{errors.lastName}</span>}
                    
                    <label htmlFor='email' className='labels'>Email</label>
                    <input type='email' id='email' className='input' name='email' value={user.email} onChange={handleChange} ></input>
                    {serverMsg.email ? <span className='err'>{serverMsg.email}</span> : <span className='err'>{errors.email}</span>}
                    
                    <label htmlFor='password' className='labels'>Password</label>
                    <input id='password' type='password' className='input' name='password' value={user.password} onChange={handleChange} ></input>
                    {serverMsg.password ? <span className='err'>{serverMsg.password}</span> : <span className='err'>{errors.password}</span>}
                    
                    <label htmlFor='cf_password' className='labels'>Confirm Password</label>
                    <input  type='password' id='conform_password'  className='input' name='cf_password' value={user.cf_password} onChange={handleChange} ></input>
                    {serverMsg.cf_password ? <span className='err'>{serverMsg.cf_password}</span> : <span className='err'>{errors.cf_password}</span>}
                    
                    <label htmlFor='phone_number' className='labels'>Phone Number</label>
                    <input type='text' id='phone_number' className='input' name='phoneNumber' value={user.phoneNumber} onChange={handleChange} ></input>
                    {serverMsg.phoneNumber ? <span className='err'>{serverMsg.phoneNumber}</span> : <span className='err'>{errors.phoneNumber}</span>}
                    
                    <div className='btn-wrapper'>
                        <button onClick={(e) => handleSubmit(e)}>Register</button>
                        <span>Already have an account?<a href="/eb/user/login">Login</a></span>
                    </div>
                
                </form>
            </div>
        </div>
    )
}


export default Registration;