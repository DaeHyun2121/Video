import React, { useState } from 'react';
import {Typography, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import styled from "styled-components";

const {TextArea} = Input;
const {Title} = Typography;

function BoardUploadPage(props){
    const user = useSelector(state => state.user);
    const [BoardTitle,setBoardTitle] = useState("")
    const [Content, setContent] = useState("")

    const onTitleChange = (e) => {
        setBoardTitle(e.currentTarget.value)
    }
    
    const onContentChange = (e) => {
        setContent(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
 
        const variables = {
            writer : user.userData._id,
            title : BoardTitle,
            content : Content
        }

        Axios.post('/api/board/uploadBoard',variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    message.success('업로드 성공')

                    setTimeout(()=> {
                        props.history.push('/board')
                    },3000);

                    
                }else{
                    alert("업로드 실패")
                }
            })
    }

    return ( 
        <div style={{maxWidth: '700px', margin:'2rem auto'}}>   
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Board</Title>
            </div>
        

        <Form onSubmit={onSubmit}>
            <br/>
            <br/>
            <label>Title</label>
            <Input 
                onChange={onTitleChange}
                value={BoardTitle}/>
            <br/>
            <br/> 
            <label>Content</label>
            <TextArea
                onChange={onContentChange}
                value={Content}
            />
            <br/>
            <br/>
            <br/>
            <br/>
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
        </Form>
        </div>
    )
}

const Button = styled.button`
    width:85px;
    height:40px;
    float:right;
    background-color:#1890ff;
    border:none;
    color:#fff;
    font-weight:400;
    border-radius:4px;
`

export default BoardUploadPage