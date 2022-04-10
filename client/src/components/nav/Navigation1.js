import {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from "../../logo1.png" 
import star from '../../asserts/star.png'
import favourite from '../../asserts/favourite.png'
import discover from '../../asserts/discover.png'
import watchlater from '../../asserts/watchlater.png'
import setting from '../../asserts/setting.png'
import  category from '../../asserts/category.png'
import  menu from '../../asserts/menu.png'
import  search from '../../asserts/search.png'
import './Navigation1.css'

function Navigation1() {
    
    const [toggle, setToggle] = useState(false)
    return (
        <header className='nav__section'>

            <div className='nav__content'>


                <div className='nav__logo'><img className='nav__logo__img' src={logo}/></div>


                <ul className={`nav__lists nav__lists__one ${toggle && 'nav__lists__one--active'}`}>
                    <li className='nav__list' ><Link to="#" className='nav__list__link'> <img src="https://img.icons8.com/material-sharp/24/000000/home.png"/>Home</Link></li>
                    <li className='nav__list' ><Link to="#" className='nav__list__link'> <img src={star}/>Popular</Link></li>
                    <li className='nav__list'><Link to="#" className='nav__list__link'><img src={discover}/>Discover</Link></li>
                    <li className='nav__list'><Link to="#" className='nav__list__link'><img src={category}/>Categories</Link></li>
                    <li className='nav__list'><Link to="#" className='nav__list__link'><img src={favourite}/>Favourites</Link></li>
                    <li className='nav__list'><Link to="#" className='nav__list__link'><img src={watchlater}/>Watch Later</Link></li>
                </ul>
                <ul className='nav__lists nav__lists__two'>
                    <li className='nav__list'><Link to="#" className='nav__list__link'><img src={setting}/>Setting</Link></li>
                </ul>

                <ul className='nav__lists__three nav__lists'>
                    <li className='nav__list__three'><img className='search__icon' src={search}/></li>
                    <li className='nav__list__three'><Link to='#' className='nav__list__three__link'></Link></li>
                    <li className='nav__list__three' onClick={()=> setToggle(!toggle)}><img className='menu__icon' src={menu}/></li>
                </ul>


                

            </div>

        </header>
    )
}

export default Navigation1