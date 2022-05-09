import Wrapper from '../wrapper/Wrapper'
import Navigation1 from '../../nav/Navigation1'
import Navigation2 from '../../nav/Navigation2'
import "./Home.css"

function Home() {
    return (
        <section className="home__section">
            <Navigation1 />
            <Navigation2 />
            <Wrapper />
        </section>
    )
}

export default Home