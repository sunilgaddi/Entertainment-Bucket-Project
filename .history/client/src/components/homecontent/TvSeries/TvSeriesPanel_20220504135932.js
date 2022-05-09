import { useEffect, useState } from 'react'
import axios from 'axios'
import './TvSeriesPanel.css'
import Banner from '../Banner/Banner'
import MoviesRow from '../movieRows/MoviesRow'
import { tvRequests } from '../../../EndPoints'

function TvSeriesPanel() {
    const [banner, setBanner] = useState('')
    const [cast, setCast] = useState('')
    const [genre, setGenre] = useState('')
    const [familyTv, setFamilyTv] = useState("")
    const [actionTv, setActionTv] = useState("")
    const [scifinFantasyTv, setScifinFantasyTv] = useState("")
    const [mysteryTv, setMysteryTv] = useState("")
    const [documentriesTv, setDocumentriesTv] = useState("")
    const [comedyTv, setComedyTv] = useState("")

    const fetchTvSeries = async () => {
        const response = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US&page=1')
        setBanner(response.data.results[Math.floor(Math.random() * response.data.results.length - 1)])

    }

    useEffect(() => {
        fetchTvSeries()
    }, [])

    if (banner === undefined || banner.backdrop_path === null) {
        fetchTvSeries()
    }

    useEffect(() => {
        if (banner) {
            const fetchMovieCast = async () => {
                const tv_id = banner.id
                const genre_id = banner.genre_ids[0]
                const tvCast = await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/credits?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
                setCast([tvCast.data.cast[0], tvCast.data.cast[1]])

                const tvGeneris = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US')

                let genreId;

                tvGeneris.data.genres.filter((item) => {
                    if (item.id == genre_id) {
                        return genreId = item
                    }
                })

                setGenre(genreId)
            }
            fetchMovieCast()
        }
    }, [banner])

    useEffect(() => {
        const fetchAllGenreTv = async () => {
            const fetchFamilyTv = await axios.get(tvRequests.fetchFamilyTv)
            setFamilyTv(fetchFamilyTv.data.results)
            const fetchActionTv = await axios.get(tvRequests.fetchActionTv)
            setActionTv(fetchActionTv.data.results)
            const fetchComedyTv = await axios.get(tvRequests.fetchComedyTv)
            setComedyTv(fetchComedyTv.data.results)
            const fetchMysteryTv = await axios.get(tvRequests.fetchMysteryTv)
            setMysteryTv(fetchMysteryTv.data.results)
            const fetchScifinFantasyTv = await axios.get(tvRequests.fetchScifinFantasyTv)
            setScifinFantasyTv(fetchScifinFantasyTv.data.results)
            const fetchDocumentariesTv = await axios.get(tvRequests.fetchDocumentariesTv)
            setDocumentriesTv(fetchDocumentariesTv.data.results)
        }
        fetchAllGenreTv()
    }, [])

    return (
        <div className='tv__container'>
            <Banner banner={banner} cast={cast} genreis={genre} />
            <MoviesRow data={familyTv} title={"Family"} panel={'tv'} />
            <MoviesRow data={actionTv} title={"Action"} panel={'tv'}/>
            <MoviesRow data={mysteryTv} title={"Mystery"} panel={'tv'} />
            <MoviesRow data={comedyTv} title={"Comedy"} panel={'tv'} />
            <MoviesRow data={scifinFantasyTv} title={"Sci Fi & Fantasy"} panel={'tv'} />
            <MoviesRow data={documentriesTv} title={"Documentry"} panel={'tv'} />
        </div>
    )
}

export default TvSeriesPanel