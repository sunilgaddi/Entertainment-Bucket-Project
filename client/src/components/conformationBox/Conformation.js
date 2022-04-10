import './Conformation.css'
import {useParams,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

function Conformation() {
    const token = useSelector(state => state.tokenReducer)    
    const {id} = useParams()
    const navigate = useNavigate()

    const deleteUser = async () =>{
           await axios.delete(`/user/delete/${id}`,{
                headers:{
                    Authorization:token
                }
            })
            navigate('/user/all_info')
    }

    const cancel = () => {
        navigate('/user/all_info')
    }

    return (
        <div id='alertbox'>
            <div id='box'>
                <p>Are you sure you want to Delete this user?</p>
                <span>
                    <button className='altbtn' onClick={deleteUser} id='del' >Delete</button>
                    <button className='altbtn' onClick={cancel} id='cnl'>Cancel</button>
                </span>
            </div>
        </div>)
}

export default Conformation