import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment, Avatar, Button, Input, Icon, Typography } from 'antd'

import LikeDislikes from './LikeDislikes'

const { TextArea } = Input
const { Text } = Typography

const SingleComment = props => {
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => setCommentValue(e.currentTarget.value)

    const openReply = () => setOpenReply(!OpenReply)

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }

        Axios
            .post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
        setLoading(false)
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={<p>{props.comment.content}</p>}
            ></Comment>

            {OpenReply && 
                <>
                    <Text>Your Reply -</Text>
                    <form style={{ display: 'flex', marginBottom: '2rem' }} onSubmit={onSubmit}>
                        <TextArea
                            style={{ width: '50%', borderRadius: '5px' }}
                            onChange={handleChange}
                            value={CommentValue}
                            placeholder="write Your Reply"
                        />
                        <br />
                        <Button  style={{ width: '10%', height: '52px', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" loading={loading} onClick={onSubmit}>Reply <Icon type="right" /></Button>
                    </form>
                </>
            }
        </div>
    )
}

export default SingleComment
