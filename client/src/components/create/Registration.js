import { useState } from "react";
import axios from 'axios'
import '../../Panels.css'


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

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    console.log(user)
    
    const {firstName, lastName, email, password, cf_password, phoneNumber} = user

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const res = await axios.post('/user/register',  {firstName, lastName, email, password, cf_password, phoneNumber})
            console.log(res)
        }
        catch(err){
            console.log(err)
        }

        
    }

    return (
        <div className='panel_section'>
            <div className='panel_wrapper'>
                <h1 className='panel_title' id='registration_title'>Create</h1>
                <form className='panel_form' id='registration_form' onSubmit={handleSubmit}>

                    <label htmlFor='first_name' className='labels'>First Name</label>
                    <input type='text' id='first_name' className='input' name='firstName' value={user.firstName}  onChange={handleChange}  />

                    <label htmlFor='last_name' className='labels'>Last Name</label>
                    <input type='text' id='last_name' className='input' name='lastName' value={user.lastName} onChange={handleChange} ></input>
                    
                    <label htmlFor='email' className='labels'>Email</label>
                    <input type='email' id='email' className='input' name='email' value={user.email} onChange={handleChange} ></input>
                    
                    <label htmlFor='password' className='labels'>Password</label>
                    <input id='password' type='password' className='input' name='password' value={user.password} onChange={handleChange} ></input>
                    
                    <label htmlFor='cf_password' className='labels'>Confirm Password</label>
                    <input  type='password' id='conform_password'  className='input' name='cf_password' value={user.cf_password} onChange={handleChange} ></input>
                    
                    <label htmlFor='phone_number' className='labels'>Phone Number</label>
                    <input type='text' id='phone_number' className='input' name='phoneNumber' value={user.phoneNumber} onChange={handleChange} ></input>
                    
                    <div className='btn-wrapper'>
                        <button>Register</button>
                        <span>Already have an account?<a href="#">Login</a></span>
                    </div>
                
                </form>
            </div>
        </div>
    )
}


export default Registration;