import { Link } from 'react-router-dom'
import './Navigation2.css'

function Navigation2() {
    return (
        <section className="nav__section2">
            <div className='nav__section2__content'>
                <ul className='nav__section2__lists__one nav__section2__lists '>
                    <li className='nav__section2__list'><Link to='/eb/movies' className='nav__section2__list__link'>Movies</Link></li>
                    <li className='nav__section2__list'><Link to='#' className='nav__section2__list__link'>Tv Series</Link></li>
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