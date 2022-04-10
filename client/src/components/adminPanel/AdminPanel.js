import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import './AdminPanel.css'

function AdminPanel() {
    const auth = useSelector(state => state.authReducers)
    const token = useSelector(state => state.tokenReducer)
    const [allUsers, setAllUsers] = useState([])

    const { isAdmin } = auth

    useEffect(() => {
        if (isAdmin) {
            const allUserInfo = async () => {
                try {
                    const res = await axios.get('/user/all_info', {
                        headers: {
                            Authorization: token
                        }
                    })
                    setAllUsers(res.data.users)
                }
                catch (err) {

                }
            }
            allUserInfo()
        }
    }, [isAdmin,token])



    return (
        <>
        <section id='admin_section'>
            <h1>ALL USERS</h1>
            {allUsers.map((item, id) =>
                <div key={id} id='user_card'>
                    <div id='user_details_wrapper'>
                        <span className='user_details'>First Name : {item.firstName}  </span>
                        <span className='user_details'>Last Name : {item.lastName}  </span>
                        <span className='user_details'>Email : {item.email}</span>
                        <span className='user_details'>Role : {item.role}</span>
                        <span className='user_details'>Phone Number : {item.phoneNumber}</span>
                    </div>

                    <div id='admin_btns'>
                        <Link to={`/user/delete/${item._id}`} id='del_btn'  >Delete User</Link>
                        <Link to={`/user/update_role/${item._id}`} id='role_btn' >Update Role</Link>
                    </div>
                </div>)}
        </section>
        
        </>
    )
}
export default AdminPanel