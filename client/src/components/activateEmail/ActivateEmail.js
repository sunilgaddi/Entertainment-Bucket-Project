import './ActivateEmail.css'
import {useParams} from 'react-router'
import {useState, useEffect} from 'react'
import axios from 'axios' 


function ActivateEmail() {
    const {activation_token} = useParams()
    const [serverMsg, setServerMsg] = useState({})

    useEffect( () => {
        if(activation_token){
            const activateEmail = async () => {
                try{
                    const res = await axios.post('/user/activation', {activation_token})
                    setServerMsg({[Object.keys(res.data)]:Object.values(res.data)})
                }
                catch(err){
                    setServerMsg({[Object.keys(err.response.data)]:Object.values(err.response.data)})
                }
            }
            activateEmail()
        }
    },[activation_token])


    return (
        <div className='activate_email_wrapper'>
           {serverMsg.success &&  <h1 className='scs'>{serverMsg.success}</h1> }
        </div>
        
    )
}

export default ActivateEmail