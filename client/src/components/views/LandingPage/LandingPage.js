import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';
import { FaCode } from "react-icons/fa";

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
  

    // componentDidMount()
    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
         .then(res => res.json())
         .then(res => {
            // state에 fecth로 가져온 movie 정보를 넣는다
            console.log(res);
            setMainMovieImage(res.results[0]);
            setMovies([res.results]);
         }
        )
    }, [])

    // useEffect는 render가 된 후 실행 되므로
    // useEffect 후에 render가 되도록 로직을 구성해야 한다
    // MainMovieImage && 라는 뜻 => MainMovieImage가 존재하면 뒤에 로직을 해라
    return (
        <div style={{width:'100%', margin:'0'}}>
            {/* Main Image*/}
          
            { MainMovieImage &&
                <MainImage 
                    MainMovieImage={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    MainMovieTitle={MainMovieImage.original_title}
                    MainMovieOverview={MainMovieImage.overview}
                />
            }
            <div style={{width:'85%', margin:'1rem auto'}}>

                <h2>Movies by latest</h2>
                <hr/>

                {/* Movie Grid Card*/}

            </div>

            <div style={{ display:'flex' , justifyContent : 'center' }}>
                <button>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
