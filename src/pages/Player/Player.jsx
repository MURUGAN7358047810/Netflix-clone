import React, { useEffect, useState } from 'react'
import './player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2QzNDJmNjU0YTFmZTExZTc2ZTNkNjY2ZGI3NGE2MyIsInN1YiI6IjY2NDI4NTk4YmViODljMDg5YTkyZTA0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5F-d5sSCW5MvGYaR_GBZMPnIaGjNGgW__XU1n-t9QU8'
        }
      };
       useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/693134/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setApiData(response.result[0]))
        .catch(err => console.error(err));

       },[])
      
      
  return (
    <div className='player'>
    <img src={back_arrow_icon} alt="" onAbort={()=>{navigate(-2)}} />
    <iframe width='90%' height='90%'  src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0" allowFullScreen></iframe>
    <div className="player-info">
    <p>{apiData.published_at}</p>
    <p>{apiData.name}</p>
    <p>{apiData.type}</p>
    </div>    
    </div>
  )
}

export default Player
