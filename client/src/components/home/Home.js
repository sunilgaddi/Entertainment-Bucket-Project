import { Routes, Route } from 'react-router-dom'
import MoviesList from './MoviesList'
import "./Home.css"


function Home() {


    return (
        <section className='home__section'>
            <Routes>
                <Route path='/movies' element={<MoviesList />} />
            </Routes>
        </section>
    )
}

export default Home