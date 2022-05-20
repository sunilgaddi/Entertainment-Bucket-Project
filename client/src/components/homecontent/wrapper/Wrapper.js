import { Routes, Route } from 'react-router-dom'
import MoviesList from '../movielist/MoviesList'
import MovieDetails from '../movieDetails/MovieDetails'
import TvSeriesPanel from '../TvSeries/TvSeriesPanel'
import TvDetails from '../TvDetails/TvDetails'
import SportsPanel from '../Sports/SportsPanel'
import SportsDetails from '../SportsDetails/SportsDetail'
import GamingPanel from '../gaming/GamingPanel'
import GameDetails from '../gameDetails/GameDetails'
import "./Wrapper.css"
import SubscriptionPanel from "../Payment/SubscriptionPanel"


function Wrapper() {

    


    return (
        <section className='wrapper__section'>
        <SubscriptionPanel plan={"montly"}/>
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
                <Route path='/sports' element={<SportsPanel/>} />
            </Routes>
            <Routes>
                <Route path='/sports/:id/:match_number/:versus' element={<SportsDetails/>} />
            </Routes>
            <Routes>
                <Route path='/gaming' element={<GamingPanel/>} />
            </Routes>
            <Routes>
                <Route path='/gaming/:game_name/:video_id' element={<GameDetails/>} />
            </Routes>
        </section>
    )
}

export default Wrapper