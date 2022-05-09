import { Routes, Route } from 'react-router-dom'
import MoviesList from '../movielist/MoviesList'
import MovieDetails from '../movieDetails/MovieDetails'
import TvSeriesPanel from '../TvSeries/TvSeriesPanel'
import TvDetails from '../TvDetails/TvDetails'
import SportsPanel from '../Sports/SportsPanel'
import "./Wrapper.css"


function Wrapper() {


    return (
        <section className='wrapper__section'>
            <Routes>
                <Route path='/movies' element={<MoviesList />} />
            </Routes>
            <Routes>
                <Route path='/movie/:moviename/:id' element={<MovieDetails />} />
            </Routes>
            <Routes>
                <Route path='/tvseries' element={<TvSeriesPanel />} />
            </Routes>
            <Routes>
                <Route path='/tv/:tvname/:id' element={<TvDetails />} />
            </Routes>
            <Routes>
                <Route path='/sports' element={< />} />
            </Routes>
        </section>
    )
}

export default Wrapper