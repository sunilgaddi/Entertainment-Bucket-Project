const API_KEY = 'd8e917f824c891e475632f1dfa0de591'

const url = 'https://api.themoviedb.org/3'

const movieRequests = {
    fetchTrending: `${url}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:`${url}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated:`${url}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies:`${url}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies:`${url}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies:`${url}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies:`${url}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries:`${url}/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

const tvRequests = {
    fetchFamilyTv:`${url}/discover/tv?api_key=${API_KEY}&with_genres=10751`,
    fetchActionTv:`${url}/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchComedyTv:`${url}/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchMysteryTv:`${url}/discover/tv?api_key=${API_KEY}&with_genres=9648`,
    fetchScifinFantasyTv:`${url}/discover/tv?api_key=${API_KEY}&with_genres=10765`,
    fetchDocumentariesTv:`${url}/discover/tv?api_key=${API_KEY}&with_genres=99`,
}

export {tvRequests,movieRequests}