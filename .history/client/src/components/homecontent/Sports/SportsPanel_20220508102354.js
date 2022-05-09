import './SportsPanel.css'
import SnGbanner from '../Banner/SnGbanner'
const url = 'https://st.adda247.com/https://wpassets.adda247.com/wp-content/uploads/multisite/sites/5/2022/03/27101427/ipl-2022-live-streaming-.jpg'
function SportsPanel() {
    return(
        <div className='sports__container'>
            <SnGbanner url={url}/>
        </div>
    )
}

export default SportsPanel