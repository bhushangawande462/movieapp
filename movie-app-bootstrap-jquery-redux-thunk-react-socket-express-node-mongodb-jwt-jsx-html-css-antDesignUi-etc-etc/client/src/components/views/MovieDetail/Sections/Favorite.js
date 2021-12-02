import axios from 'axios'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

const Favorite = props => {
    const user = useSelector(state => state.user)

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const movieRunTime = props.movieInfo.runtime
    const moviePost = props.movieInfo.backdrop_path

    const [Favorited, setFavorited] = useState(false)
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) return alert('Please Log in first')

        if (Favorited) {
            axios
                .post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            axios
                .post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

    useEffect(() => {
        axios
            .post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

        axios
            .post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.subcribed)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })

    }, [])

    return (
        <>
            <Button onClick={onClickFavorite} > {!Favorited ? "Add To Favorite | " : "Remove From Favorite | "} {FavoriteNumber}</Button>
        </>
    )
}

export default Favorite

