import React from 'react'
import { Descriptions, Typography } from 'antd'
import './MovieInfo.css'

const { Text } = Typography

const MovieInfo = props => {

    const { movie } = props
    
    return (
      <>
        <Descriptions title="Movie Info &gt;&gt;" bordered>
          <Descriptions.Item label="Title">
            <Text className="text-success h5">{movie.original_title}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="ReleaseDate"><Text code>{movie.release_date}</Text></Descriptions.Item>
          <Descriptions.Item label="revenue"><Text className="keyboard-cus">{movie.revenue.toLocaleString()}</Text></Descriptions.Item>
        </Descriptions>
        
        <Descriptions bordered>
          <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
          <Descriptions.Item label="VoteAverage" span={2}>
            <Text type="warning">{movie.vote_average + " / 10"}</Text>
          </Descriptions.Item>
        </Descriptions>
        
        <Descriptions bordered>
          <Descriptions.Item label="VoteCount">{movie.vote_count.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="status"><Text mark>{movie.status}</Text></Descriptions.Item>
          <Descriptions.Item label="popularity"><i>{movie.popularity}</i></Descriptions.Item>
        </Descriptions>
      </>
    )
}

export default MovieInfo
