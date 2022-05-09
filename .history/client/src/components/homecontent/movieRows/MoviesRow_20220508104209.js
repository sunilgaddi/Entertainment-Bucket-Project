import './MoviesRow.css'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
 
function MoviesRow({ data, title ,mainPanel,subPanel,tvSeries}) {
    useEffect(() => {
        const slider = document.querySelectorAll('.movie__row__posters');
        let isDown = false;
        let startX;
        let scrollLeft;

        Array.from(slider).map( (item) => {
            item.addEventListener('mousedown', (e) => {
                    isDown = true;
                    item.classList.add('active');
                    startX = e.pageX - item.offsetLeft;
                    scrollLeft = item.scrollLeft;
                });
        })
        Array.from(slider).map( (item) => {
            item.addEventListener('mouseleave', () => {
                    isDown = false;
                    item.classList.remove('active');
                });
        })
        Array.from(slider).map( (item) => {
            item.addEventListener('mouseup', () => {
                    isDown = false;
                    item.classList.remove('active');
                });
        })
        Array.from(slider).map( (item) => {
            item.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - item.offsetLeft;
                    const walk = (x - startX) * 2; //scroll-fast
                    item.scrollLeft = scrollLeft - walk;
                });
        })
        
    },[])

    return (
        <div className='movies__row__wrapper'>
            <h1 className='movie__row__title'>{title}</h1>
            <div className='movie__row__posters'>
                {
                    data ? data.map((item, id) => {
                        return <Link key={id} to={`/eb/home/${mainPanel}/${item.original_title || item.original_name}/${item.id}`}><div className='movie__row__poster' style={{ backgroundImage: `url({mainPanel === 'sports' ? $ : "https://image.tmdb.org/t/p/original/${item?.poster_path}})`, backgroundPosition: 'center', backgroundSize: "cover" }} >{item.poster_path === null && 'N/A'}</div>{subPanel === 'season' && <span>Season {item?.season_number}</span>}</Link>
                    })
                        :
                        ""
                }
            </div>
        </div>
    )
}

export default MoviesRow