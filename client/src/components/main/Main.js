import {Routes ,Route} from  'react-router-dom'

import Home from  '../home/Home'
import Navigation1 from '../nav/Navigation1'
import Navigation2 from '../nav/Navigation2'
import "./Main.css"

function Main(){
    return (
       <section className="main__section">
       <Navigation1/>
       <Navigation2/>
            <Home/>
       </section>
    )
}

export default Main