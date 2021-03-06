import React from 'react'
import { Col } from 'antd'
import { Link } from "react-router-dom"

import { IMAGE_BASE_URL } from '../Config'

const GridCards = props => {

    let { actor, key, image, movieId, movieName, characterName } = props
    const POSTER_SIZE = "w154"

    if (actor) {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '320px', borderRadius: '100%', objectFit: 'contain' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
                </div>
            </Col>
        )
    } else {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <Link to={`/movie/${movieId}`} >
                        <img style={{ width: '100%', height: '320px', borderRadius: '100%', objectFit: 'contain' }} alt={movieName} src={image} />
                    </Link>
                </div>
            </Col>
        )
    }

}

export default GridCards
