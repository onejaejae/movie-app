import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';
import { Row } from 'antd';
import { FaCode } from "react-icons/fa";
import GridCards from '../commons/GridCards';

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
  

    const fetchMovies = ( endpoint ) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
           // state에 fecth로 가져온 movie 정보를 넣는다
          
           setMovies([...Movies, ...res.results]);
        }
       )    
    }

    // componentDidMount()
    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
        setCurrentPage(currentPage+1);

        fetch(endpoint)
        .then(res => res.json())  
        .then(res =>{
            setMainMovieImage(res.results[0])
            setMovies([...Movies, ...res.results])
        }
        )
       
    }, [])

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
        setCurrentPage(currentPage+1);
        fetchMovies(endpoint);

    }

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
                
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingpage
                                image = {movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} 
                                title = {movie.original_title}
                                id = {movie.id}
                            />
                        </React.Fragment>
                    ))}

                </Row>


            </div>

            <div style={{ display:'flex' , justifyContent : 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
