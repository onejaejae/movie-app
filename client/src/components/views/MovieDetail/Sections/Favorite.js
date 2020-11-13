import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd'

function Favorite({movieId, Movies, userFrom}) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

   
    const movieTitle = Movies.original_title;
    const moviePost = Movies.backdrop_path;
    const movieRunTime = Movies.runtime;
   
    
    let variables = {
        userFrom,
        movieId, // movieId : movieId와 같은 표현, 아래도 동일
        movieTitle,
        moviePost,
        movieRunTime
    } 

    useEffect(() => {
        
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                if(res.data.success){
                    setFavoriteNumber(res.data.favoriteNumber);
                }else{
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(res => {
                if(res.data.success){
                    setFavorited(res.data.favorited);
                }else{
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })


    }, [])

    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(res => {
                    if(res.data.success){
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    }else{
                        alert('Favorite에서 리스트에서 지우는 것을 실패했습니다')
                    }
                })
        }else{ 
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(res => {
                    if(res.data.success){
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    }else{
                        alert('Favorite 리스트에 추가하는 것을 실패했습니다')
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={ onClickFavorite }>{Favorited ? "Not Favorite " : "Add to Favorite "} { FavoriteNumber }</Button>
        </div>
    )
}

export default Favorite
