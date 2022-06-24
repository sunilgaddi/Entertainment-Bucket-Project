import {Link} from 'react-router-dom'
function Success(){
    return(
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div>
            <h2 style={{marginBottom:'10px'}}>
               Payment Successfull.
            </h2>
            <Link style={{ padding:'5px 10px', backgroundColor:'#2667ff',borderRadius:'5px', color:'white'}} to='/eb/home/movies'>Click here</Link>
            </div>
        </div>
    )
}


export default Success