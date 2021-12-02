import axios from 'axios'
import { Row, Button } from 'antd'
import React, { useEffect, useState } from 'react'

import Favorite from './Sections/Favorite'
import Comments from './Sections/Comments'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../../commons/GridCards'
import LikeDislikes from './Sections/LikeDislikes'
import MainImage from '../../views/LandingPage/Sections/MainImage'
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'

const MovieDetailPage = props => {

    const movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const movieVariable = { movieId }
    const [CommentLists, setCommentLists] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)

    useEffect(() => {
        const endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
        fetchDetailInfo(endpointForMovieInfo)

        axios
            .post('/api/comment/getComments', movieVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

    const toggleActorView = () => setActorToggle(!ActorToggle)

    const fetchDetailInfo = endpoint => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMovie(result)
                setLoadingForMovie(false)

                const endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => setCasts(result.cast))
                setLoadingForCasts(false)
            }).catch(error => console.error('Error:', error))
    }

    const updateComment = (newComment) => setCommentLists(CommentLists.concat(newComment))

    return (
        <div>
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                /> : <div>loading...</div>
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}

                <br />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>See Star Cast</Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]} style={{ boxShadow: '0px 0px 9px 2px #d5d5d5bf' }}>
                        {
                            !LoadingForCasts ? Casts.map((cast, index) => (
                                cast.profile_path &&
                                <GridCards actor key={index} image={cast.profile_path} characterName={cast.characterName} />
                            )) : <div>loading...</div>
                        }
                    </Row>
                }
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
            </div>
        </div>
    )
}

export default MovieDetailPage

