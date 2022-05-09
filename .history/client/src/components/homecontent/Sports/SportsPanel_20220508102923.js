import { useEffect, } from 'react'
import axios from 'axios'
import './SportsPanel.css'
import SnGbanner from '../Banner/SnGbanner'
import MovieRows from "../movieRows/MoviesRow"
const url = 'https://st1.latestly.com/wp-content/uploads/2022/01/IPL-2022.jpg'
function SportsPanel() {
    return(
        <div className='sports__container'>
            <SnGbanner url={url}/>
            
        </div>
    )
}

export default SportsPanel