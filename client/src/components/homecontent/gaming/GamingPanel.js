import axios from 'axios'
import { useEffect,useState } from 'react'
import "./GamingPanel.css"
import MoviesRow from "../movieRows/MoviesRow"
 
function GamingPanel(){

    const [bgmiData,setBgmiData] = useState("")
    const [valorantData,setValorantData] = useState("")

    useEffect( () => {
        const fetchBgmiData = async () => {
            try{
                const response = await axios.get("/eb/bgmi")
                console.log(response.data[0].items)
                setBgmiData(response.data[0].items)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchBgmiData()
    },[])
    useEffect( () => {
        const fetchValorantData = async () => {
            try{
                const response = await axios.get("/eb/valorant")
                console.log(response.data[0].items)
                setValorantData(response.data[0].items)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchValorantData()
    },[])
    return(
        <div className="gaming__content">
            <MoviesRow data={bgmiData} mainPanel={'gaming'} title={'BGMI'} subPanel={"bgmi"}/>
            <MoviesRow data={valorantData} mainPanel={'gaming'} title={'VALORANT'} subPanel={"valorant"}/>
        </div>
    )
}

export default GamingPanel