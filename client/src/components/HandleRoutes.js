import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Home from './homecontent/home/Home'
import Registration from './create/Registration';
import ActivateEmail from './activateEmail/ActivateEmail';
import Profile from './profile/Profile'
import Login from './login/Login'
import ForgotPassword from "./forgotPassword/ForgotPassword";
import ResetPassword from "./resetPassword/ResetPassword";
import AdminPanel from "./adminPanel/AdminPanel";
import Conformation from "./conformationBox/Conformation";
import RoleUpdate from "./roleUpdate/RoleUpdate";
import Success from './CheckoutComponents/Success';

function HandleRoutes() {
    const auth = useSelector(state => state.authReducers)

    const { isLoggedIn } = auth
    
    return (
        <>
            {isLoggedIn === true &&
                    <Routes>
                        <Route path='/home/*' element={<Home />} />

                        <Route path='/payment-success' element={<Success />}></Route>

                        <Route path='/user/profile' element={<Profile />} />

                        <Route path='/user/all_info' element={<AdminPanel />}></Route>

                        <Route path='/user/delete/:id' element={<Conformation />}></Route>

                        <Route path='/user/update_role/:id' element={<RoleUpdate />}></Route>
                    </Routes>
            }
            {isLoggedIn === false   &&  <Routes>
                        <Route path='/user/register' element={<Registration />} />

                        <Route path='/user/activation/:activation_token' element={<ActivateEmail />} />

                        <Route path='/user/login' element={<Login />} />

                        <Route path='/user/forgot' element={<ForgotPassword />} />

                        <Route path='/user/reset/:reset_token' element={<ResetPassword />} />
                    </Routes>
            }
        </>
    )
}

export default HandleRoutes