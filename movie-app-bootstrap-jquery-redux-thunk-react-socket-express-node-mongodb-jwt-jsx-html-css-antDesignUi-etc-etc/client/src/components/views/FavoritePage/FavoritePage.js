import axios from 'axios'
import { Link } from "react-router-dom"
import { Typography, Popover } from 'antd'
import React, { useEffect, useState } from 'react'

import './favorite.css'
import { useSelector } from 'react-redux'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../Config'

const { Title } = Typography

const FavoritePage = () => {
    const user = useSelector(state => state.user)

    const [Loading, setLoading] = useState(true)
    const [Favorites, setFavorites] = useState([])
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        axios
            .post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = { movieId: movieId, userFrom: userFrom }
        axios
            .post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
                    : "no image"}
            </div>
        )

        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>

                <td>{favorite.movieRunTime} mins</td>
                <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}> Remove </button></td>
            </tr>
        )
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} className="cusTitleLangingPage"> Favorite Movies By Me </Title>
            <hr />
            {user.userData && !user.userData.isAuth ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Please Log In First...</p>
                    <Link to="/login">Go To Login Page</Link>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default FavoritePage
