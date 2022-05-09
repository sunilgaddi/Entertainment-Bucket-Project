import './Banner.css'

function Banner({ banner, cast, genreis }) {
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }
    return (
        <div className='banner__section' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${banner?.backdrop_path}")`, backgroundPosition: 'center', backgroundSize: "cover" }}>
            <div className='banner__content'>
                <div className='banner__top__content'>
                    <h1 className='movie__title'>{banner?.original_title || banner?.name}</h1>
                    <ul className='movie__grtv__content movie__content__lists'>
                        <li className='movie__generis list'>{genreis?.name}</li>
                        <li className='movie__lang list'>{banner?.original_language}</li>
                        <li className='movie__popularity list'>{banner?.vote_average}</li>
                    </ul>

                    <ul className='movie__starring__content movie__content__lists'>
                        <li className='starring__heading list'>Starring</li>
                        <span className='starring__names'>
                            <li className='starring__one list'>{cast ? cast[0]?.name : ""},</li>
                            <li className='starring__two list'>{cast ? cast[1]?.name : ""}</li>
                        </span>
                    </ul>
                </div>
                <div className='banner__bottom__content'>
                    <p className='movie__desc'>{truncate(banner?.overview, 150)}</p>
                    <button>Watch Movie</button>
                </div>
            </div>
        </div>
    )
}

export default Banner