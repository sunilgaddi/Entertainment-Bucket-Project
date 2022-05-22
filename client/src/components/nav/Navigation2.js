import { NavLink,Link} from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { dispactchLogout } from '../../redux/actions/authActions'

import axios from 'axios'
import './Navigation2.css'

function Navigation2() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        const res = await axios.get('/eb/user/logout')
        console.log(res.data)
        localStorage.removeItem('userLoggedIn')
        navigate('/eb/user/login')
        dispatch(dispactchLogout)
    }

    return (
        <section className="nav__section2">
            <div className='nav__section2__content'>
                <ul className='nav__section2__lists__one nav__section2__lists '>
                    <li className='nav__section2__list'><NavLink to='/eb/home/movies' style={ ({isActive}) => ( { color : isActive ? 'white' : 'rgb(102, 99, 99)'})} className='nav__section2__list__link'>Movies</NavLink></li>
                    <li className='nav__section2__list'><NavLink to='/eb/home/tvseries' style={ ({isActive}) => ( { color : isActive ? 'white' : 'rgb(102, 99, 99)'})} className='nav__section2__list__link'>Tv Series</NavLink></li>
                    <li className='nav__section2__list'><NavLink to='/eb/home/sports' style={ ({isActive}) => ( { color : isActive ? 'white' : 'rgb(102, 99, 99)'})} className='nav__section2__list__link'>Sports</NavLink></li>
                    <li className='nav__section2__list'><NavLink to='/eb/home/gaming' style={ ({isActive}) => ( { color : isActive ? 'white' : 'rgb(102, 99, 99)'})} className='nav__section2__list__link'>Gaming</NavLink></li>
                </ul>

                <ul className='nav__section2__lists__two nav__section2__lists'>
                    <li className='nav__section2__list'><input type='search' /></li>
                    <li className='nav__section2__list'><Link to='#' className='nav__section2__list__link nav__section2__list__profilelink'>
                        <ul>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </Link></li>
                </ul>
            </div>
        </section>
    )
}

export default Navigation2