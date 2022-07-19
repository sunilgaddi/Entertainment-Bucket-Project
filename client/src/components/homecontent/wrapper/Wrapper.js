import { Routes, Route,Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Profile from '../../profile/Profile'
import AdminPanel from '../../adminPanel/AdminPanel'
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
import UpdateRole from '../../roleUpdate/RoleUpdate'
import ConformationBox from '../../conformationBox/Conformation'


function Wrapper() {

    const auth = useSelector(state => state.authReducers)

    const { subscriptionDetails } = auth

    let plan_active = false

    //for getting the subscription status
    if (subscriptionDetails) {
        plan_active = subscriptionDetails?.plan === undefined ? false : true
    }

        //for navigating user based on subscription status

    return (
        <section className='wrapper__section'>
            {plan_active ?
                <>
                    <Routes>
                        <Route path='/movies' element={<MoviesList />} />


                        <Route path='/movie/:moviename/:id' element={<MovieDetails />} />


                        <Route path='/tvseries' element={<TvSeriesPanel />} />


                        <Route path='/tv/:tvname/:id' element={<TvDetails />} />


                        <Route path='/sports' element={<SportsPanel />} />


                        <Route path='/sports/:id/:match_number/:versus' element={<SportsDetails />} />


                        <Route path='/gaming' element={<GamingPanel />} />


                        <Route path='/gaming/:game_name/:video_id' element={<GameDetails />} />

                        <Route path='/' element={<Navigate to='/eb/home/movies'/>}/>

                        <Route path='/profile' element={ <Profile/>} />
                        <Route path='/all_user' element={ <AdminPanel/>} />
                        <Route path='/delete_user/:id' element={<ConformationBox/>} />
                        <Route path='/update_role/:id' element={<UpdateRole/>} />
                    </Routes>
                </>
                :
                <SubscriptionPanel />
            }
        </section>
    )
}

export default Wrapper