import { useState } from 'react'
import {useParams, useNavigate} from 'react-router'
import {useSelector} from 'react-redux'
import axios from 'axios'
import './RoleUpdate.css'

function RoleUpdate() {
    const [value, setValue] = useState(null)
    const token = useSelector(state => state.tokenReducer)
    const {id} = useParams()
    const navigate = useNavigate()

    const saveRole = () => {
            axios.patch(`/user/update_role/${id}`, {role:value},{
                headers:{Authorization:token}
            })
            navigate('/user/all_info')
    }

    const cancel = () =>{
        navigate('/user/all_info')
    }

    return (
        <section id='roleupdatesection'>
            <div id='roleupdatebox'>
                <h3 id='tittle'>Update Role</h3>

                <span id='rinputs'>
                    <input type='radio' name="role" value='user' id='user' onClick={() => setValue(0)} />
                    <label htmlFor="user">USER</label>
                    <input type='radio' id='admin' name="role" value='admin' onClick={() => setValue(1)} />
                    <label htmlFor="admin">ADMIN</label>
                </span>
                <span id='rbtns'>
                    <button id='save'onClick={saveRole}>Save</button>
                    <button id='cnl'onClick={cancel}>Cancel</button>
                </span>
            </div>
        </section>
    )
}

export default RoleUpdate