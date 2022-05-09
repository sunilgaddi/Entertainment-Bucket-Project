import { NavLink,Link} from 'react-router-dom'
import './Navigation2.css'

function Navigation2() {
    return (
        <section className="nav__section2">
            <div className='nav__section2__content'>
                <ul className='nav__section2__lists__one nav__section2__lists '>
                    <li className='nav__section2__list'><NavLink to='/eb/home/movies' style={ ({isActive}) => ( { color : isActive ? 'white' : 'rgb(102, 99, 99)'})} className='nav__section2__list__link'>Movies</NavLink></li>
                    <li className='nav__section2__list'><NavLink to='/eb/home/tvseries' style={ ({isActive}) => ( { color : isActive ? 'white' : 'rgb(102, 99, 99)'})} className='nav__section2__list__link'>Tv Series</NavLink></li>
                    <li className='nav__section2__list'><NavLink to='/eb/home/tvseries' style={ ({isActive}) => ( { color : isActive ? 'white' : 'rgb(102, 99, 99)'})} className='nav__section2__list__link'>Tv Series</NavLink></li>
                </ul>

                <ul className='nav__section2__lists__two nav__section2__lists'>
                    <li className='nav__section2__list'><input type='search' /></li>
                    <li className='nav__section2__list'><Link to='#' className='nav__section2__list__link nav__section2__list__profilelink'>.</Link></li>
                </ul>
            </div>
        </section>
    )
}

export default Navigation2