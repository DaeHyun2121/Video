import React, { useState } from 'react';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props){

    const videoId = props.postId 
    const user = useSelector(state => state.user);
    const [commentValue, setcommentvalue] = useState("")

    const handleClick = (e) => {
        setcommentvalue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId:videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                }else{
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br/>
            <p> Replies </p>
            <hr/>

            {/*  Comment Lists */}

            
                {props.CommentLists && props.CommentLists.map((comment, index) => (
                    (!comment.responseTo &&
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    )
                ))}

            

            {/*  Root Comment Form */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 입력하세요."
                    
                />
                <br/>
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment