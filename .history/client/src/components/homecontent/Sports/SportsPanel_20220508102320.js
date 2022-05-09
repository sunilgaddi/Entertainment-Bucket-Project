import './SportsPanel.css'
import SnGbanner from '../Banner/SnGbanner'
const url = 'https://www.passionateinmarketing.com/wp-content/uploads/2022/03/1643722159_IPL1-1068x666.jpg'
function SportsPanel() {
    return(
        <div className='sports__container'>
            <SnGbanner url={url}/>
        </div>
    )
}

export default SportsPanel