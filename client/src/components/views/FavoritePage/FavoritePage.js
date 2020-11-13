import React, { useEffect, useState } from 'react'
import { Popover } from 'antd';
import Axios from 'axios';
import './favorite.css';
import { IMAGE_BASE_URL } from '../../Config';


function FavoritePage() {
    const userFrom =  localStorage.getItem('userId') ;
    const variable = {
        userFrom
    }

    const [Favorite, setFavorite] = useState([])

    useEffect(() => {
        fetchFavoritedMovie();
    }, [])
    
    // useEffect에서 한번 실행
    // favorite page에서 favorite movie를 remove 버튼을 누르고 나서 실행
    const fetchFavoritedMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', variable)
        .then(res => {
            if(res.data.success){
                setFavorite(res.data.favorites)
            }else{
                alert('영화 정보를 가져오는데 실패했습니다');
            }
        })
    }
    
    const renderCards = Favorite.map((favorite, index) => {
        const content = (
            <div>
                { favorite.moviePost ?
                
                    <img src={`${IMAGE_BASE_URL}w500/${favorite.moviePost}`} /> : "no image"

                }
            </div>
        )

        const onClickDelete = (userFrom, movieId) => {
            const variable = {
                userFrom,
                movieId
            }

            Axios.post('/api/favorite/deleteFavoriteMovie', variable)
                .then(res => {
                    if(res.data.success){
                        // 삭제하고 난 뒤 db에 있는 data들을 다시 가져오기 위해서
                        fetchFavoritedMovie();
                    }else{
                        alert('리스트에서 지우는데 실패했습니다');
                    }
                })
        }

        return (

                <tr key={ index }>
                    <Popover content={ content } title={ `${ favorite.movieTitle }`}>
                        <td>{favorite.movieTitle}</td>
                    </Popover>


                    <td>{favorite.movieRunTime} mins</td>

                    {/* 화살표 함수에 매개편수를 넣어서 함수를 실행하려면 아래와 같이 () => 함수명(매개변수) 형식으로 작성해야 함*/}
                    <td><button onClick={ () => onClickDelete( favorite.userFrom, favorite.movieId )}>Remove</button></td>
                </tr>
        )
        
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
        <h2> Favorite Movies </h2>
        <hr />

        <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie RunTime</th>
                    <td>Remove from favorites</td>
                </tr>
            </thead>
            <tbody>
                
                { renderCards }
 
            </tbody>
        </table>
    </div>
    )
}

export default FavoritePage
