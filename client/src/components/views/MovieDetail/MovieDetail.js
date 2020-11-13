import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";
import { Row } from "antd";

function MovieDetail({ match }) {
  const [Movies, setMovies] = useState([]);
  const [Cast, setCast] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  let movieId = match.params.id;

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    fetch(endpointInfo)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });

    fetch(endpointCrew)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast);
      });
  }, []);

  const changeToggle = () => {
        
    {/* if-else문을 쓰지않고 아래와 같이 코드를 작성할 수 있다*/}

        setActorToggle(!ActorToggle)
  }

  return (
    <div>
      {/* Header*/}
      {Movies.backdrop_path && (
        <MainImage
          MainMovieImage={`${IMAGE_BASE_URL}w1280${Movies.backdrop_path}`}
          MainMovieTitle={Movies.original_title}
          MainMovieOverview={Movies.overview}
        />
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>

        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Favorite 
              movieId = { movieId }
              Movies = { Movies }
              userFrom = { localStorage.getItem('userId') }
            />
        </div>
        
        {/* Movie info */}
        {Movies.backdrop_path && <MovieInfo movie={Movies} />}

        <br />
        {/* Actors Grid */}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={ changeToggle }> Toggle Actor View </button>
        </div>

         {/* ActorToggle이  true일때만 보이도록 하려고 */}

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Cast &&
              Cast.map((Cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      Cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${Cast.profile_path}`
                        : null
                    }
                    name={Cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
