import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, Typography, Icon } from 'antd'

import ReplyComment from './ReplyComment'
import SingleComment from './SingleComment'

const { TextArea } = Input
const { Title, Text } = Typography

const Comments = props => {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = e => setComment(e.currentTarget.value)

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)

        if (user.userData && !user.userData.isAuth) return alert('Please Log In First!')

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        // console.log(variables)

        axios
            .post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
        setLoading(false)
    }

    return (
        <div>
            <br />
            <Title level={3} className="cusTitleLangingPage">Share your opinions about <u>{props.movieTitle}</u></Title>
            <hr />
            {/* {console.log(props.CommentLists)} */}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', minHeight:'40px', marginBottom: '1rem' }} >
                    Be The First To Comment!
                </div>
            }

            <Text>Your Comment -</Text>
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write Your Comments"
                />
                <br />
                <Button  style={{ width: '20%', height: '52px', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" loading={loading} onClick={onSubmit}>Post <Icon type="right" /></Button>
            </form>

        </div>
    )
}

export default Comments
