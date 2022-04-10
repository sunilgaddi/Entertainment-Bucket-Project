import { useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import avatar from '../../avatar.jpg'
import forwardarrow from '../../forwardarrow.png'
import "./Profile.css"

const initialState = {
    firstName:"",
    lastName:"",
    phoneNumber:""

}

function Profile() {
    const [disable, setDisable] = useState(true)
    const [updatedData,setUpdatedData] = useState(initialState)
    const [serverMsg, setServerMsg] = useState({})
    const auth = useSelector(state => state.authReducers)
    const token = useSelector(state => state.tokenReducer)

    const {user, isAdmin} = auth 
     
    const update = (e) => {
        e.preventDefault()
        setDisable(false)
    }

    const handleChange = (e) => {
        setUpdatedData({...updatedData,[e.target.name]:e.target.value})
    }

    const {firstName, lastName, phoneNumber} = updatedData

    const save = async (e) => {
        e.preventDefault()
        try{
           const res = await axios.patch('/user/update',{
                firstName :firstName ? firstName : user.firstName,
                lastName : lastName ? lastName : user.lastName,
                phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber
            },
            { headers:{ Authorization:token } })
           setDisable(true)
           setServerMsg({success:res.data.msg})
        }
        catch{

        }
    }


    const cancel = () => {
        setDisable(true)
    }
    

    return(
        <div id="profile_container" >
            <div id='profile_wrapper'>
            {serverMsg.success && <span id = "profile_updated">{serverMsg.success}</span>}
            <h1 className='profile'>Profile</h1>
                <div id='image_wrapper'><img id='image' src={avatar} alt='avatar'></img></div>
                <div id='details_wrapper' className='borders'>
                
                    <form >
                        <label className='profile_labels' htmlFor='firstName'>First Name</label>
                        <input className='profile_inputs' type='text' id='firstName' name='firstName' defaultValue={ user.firstName || ""}  onChange={handleChange} disabled={disable} ></input>

                        <label className='profile_labels' htmlFor='lastName'>Last Name</label>
                        <input className='profile_inputs' type='text' id='lastName' name='lastName' defaultValue={user.lastName || "" } onChange={handleChange} disabled={disable} ></input>

                        <label className='profile_labels' htmlFor='email'>Email</label>
                        <input className='profile_inputs' type='text' id='email' name='email' defaultValue={user.email ||  ""} onChange={handleChange} disabled={disable} ></input>

                        <label className='profile_labels' htmlFor='phoneNumber'>Phone Number</label>
                        <input className='profile_inputs' type='text' id='phoneNumber' name='phoneNumber' defaultValue={user.phoneNumber || ""} onChange={handleChange} disabled={disable}></input>

                        <div id='profile_btns'>
                        <button id={disable ? "update" : "save"} className='btns' onClick={ disable ?  update : save }  >{disable ? "Update" : "Save"}</button>
                        { !disable && <button id='cancel' className='btns' onClick={cancel}>Cancel</button> }
                        </div>
                    </form>
                </div>
               {isAdmin &&  <div id='fwdarw'><Link to='/user/all_info'>ALL USERS<img src={forwardarrow} alt='forward arrow'/></Link></div>}
            </div>
        </div>
    )
}
export default Profile