import './ScoreCard.css'

function ScoreCard({ data }) {
    return (
        <div className='fs__board__container'>

            <li className='fs__short__score__card'>{data?.shortscore}</li>

            <ul className='fs__rows fs__flex'>

                <li className='player__name player__stats__list__heading'>BatsMan</li>
                <li className='player__runs player__stats__list__heading'>R</li>
                <li className='player__balls player__stats__list__heading'>B</li>
                <li className='player__fours player__stats__list__heading'>4s</li>
                <li className='player__sixs player__stats__list__heading'>6s</li>
                <li className='player__strike player__stats__list__heading'>SR</li>
            </ul>
            {data?.batting?.map((item ,id) => {
                if (!item.id == 0) {
                    return <ul key={id} className='fs__rows fs__flex'>
                        <li className='player__name player__stats__list'>{item.player_name}<span>{item.out_details}</span></li>
                        <li className='player__runs player__stats__list '>{item.player_runs}</li>
                        <li className='player__balls player__stats__list'>{item.player_balls}</li>
                        <li className='player__fours player__stats__list'>{item.player_fours}</li>
                        <li className='player__sixs player__stats__list'>{item.player_sixs}</li>
                        <li className='player__strike player__stats__list'>{item.player_strike}</li>
                    </ul>
                }
            })}

            <li className='extras__stats'>Extras {data?.extra_runs}<span>{data.extra_runs_details}</span></li>

            <ul className='total__runs__stats fs__flex'>
                <li className='total__runs__stats__lst'>Total Runs</li>
                <li className='total__runs__stats__lst'>{data?.total_runs}</li>
            </ul>
            <li className='dnb__lst'>Did Not Bat<br /><span>{data?.did_not_bat_list}</span></li>

            <li className='fow__lst'>Fall of Wickets<br /><span>{data?.fall_of_wicket}</span></li>


            <ul className='fs__flex'>
                <li className="bowler__name bowler__stats__list__heading">BOWLER</li>
                <li className="bowler__overs bowler__stats__list__heading">O</li>
                <li className="bowler__maiden bowler__stats__list__heading">M</li>
                <li className="bowler__runs bowler__stats__list__heading">R</li>
                <li className="bowler__wickets bowler__stats__list__heading">W</li>
                <li className="bowler__noball bowler__stats__list__heading">NB</li>
                <li className="bowler__wides bowler__stats__list__heading">WD</li>
                <li className="bowler__eco bowler__stats__list__heading">ECON</li>
            </ul>
            {data?.bowling?.map((item, id) => {
                if (!item.id == 0) {
                    return <ul key={id} className='fs__flex'>
                        <li className='bowler__name bowler__stats__list'>{item.player_name}</li>
                        <li className='bowler__overs bowler__stats__list'>{item.player_over}</li>
                        <li className='bowler__maiden bowler__stats__list'>{item.player_maiden}</li>
                        <li className='bowler__runs bowler__stats__list'>{item.player_runs}</li>
                        <li className='bowler__wickets bowler__stats__list'>{item.player_wickets}</li>
                        <li className='bowler__noball bowler__stats__list'>{item.player_noball}</li>
                        <li className='bowler__wides bowler__stats__list'>{item.player_wide}</li>
                        <li className='bowler__eco bowler__stats__list'>{item.player_eco}</li>
                    </ul>
                }
            })}
        </div>


    )
}

export default ScoreCard