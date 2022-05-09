import './SportsPanel.css'
import SnGbanner from '../Banner/SnGbanner'
import Mo
const url = 'https://st1.latestly.com/wp-content/uploads/2022/01/IPL-2022.jpg'
function SportsPanel() {
    return(
        <div className='sports__container'>
            <SnGbanner url={url}/>
            
        </div>
    )
}

export default SportsPanel