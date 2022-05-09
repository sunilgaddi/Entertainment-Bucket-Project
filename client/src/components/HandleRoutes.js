import { Routes, Route } from 'react-router-dom'
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

function HandleRoutes() {
    return (
        <>
            <Routes>
                <Route path='/home/*' element={<Home />} />
            </Routes>
            <Routes>
                <Route path='/user/register' element={<Registration />} />
            </Routes>
            <Routes>
                <Route path='/user/activation/:activation_token' element={<ActivateEmail />} />
            </Routes>
            <Routes>
                <Route path='/user/login' element={<Login />} />
            </Routes>
            <Routes>
                <Route path='/user/forgot' element={<ForgotPassword />} />
            </Routes>
            <Routes>
                <Route path='/user/reset/:reset_token' element={<ResetPassword />} />
            </Routes>
            <Routes>
                <Route path='/user/profile' element={<Profile />} />
            </Routes>
            <Routes>
                <Route path='/user/all_info' element={<AdminPanel />}></Route>
            </Routes>
            <Routes>
                <Route path='/user/delete/:id' element={<Conformation />}></Route>
            </Routes>
            <Routes>
                <Route path='/user/update_role/:id' element={<RoleUpdate />}></Route>
            </Routes>

        </>
    )
}

export default HandleRoutes