import React, { useState } from 'react';
import {Typography, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import styled from "styled-components";

const {TextArea} = Input;
const {Title} = Typography;




function ViedoUploadPage(props){
    const user = useSelector(state => state.user);
    const [VideoTitle,setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    // 입력되게
    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    


    //서버에 파일 저장
    const onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData,config)
            .then(response => {
                if(response.data.success){
                        console.log(response.data);

                    let variable = {
                        url:response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    Axios.post('/api/video/thumbnail',variable)
                        .then(response => {
                            if(response.data.success){
                                console.log(response.data);

                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)

                            }else{
                                alert("썸네일 생성 실패")
                            }
                        })

                }else{
                    alert('업로드 실패');
                }
            })

    }

    const onSubmit = (e) => {
        e.preventDefault();
 
        const variables = {
            writer : user.userData._id,
            title : VideoTitle,
            description : Description,
            filePath : FilePath,
            duration : Duration,
            thumbnail: ThumbnailPath,
        }

        Axios.post('/api/video/uploadVideo',variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    message.success('뮤직 업로드 성공')

                    setTimeout(()=> {
                        props.history.push('/')
                    },3000);

                    
                }else{
                    alert("뮤직 업로드 실패")
                }
            })
    }

    return ( 
        <div style={{maxWidth: '700px', margin:'2rem auto'}}>   
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload</Title>
            </div>
        

        <Form onSubmit={onSubmit}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {/* Drop zone */}
                
                <Dropzone
                onDrop={onDrop}
                multiple={false} //한개의 파일
                maxSize={100000000} //파일의 size
                >
                {({ getRootProps, getInputProps }) => (
                    <div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex', 
                    alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Icon type="plus" style={{fontSize:'3rem'}}/>
                    </div>
                )}
                </Dropzone>

                {/* {Thumbnail} */}
                {ThumbnailPath &&
                    <div>
                    <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                </div>
                }

            </div>

            <br/>
            <br/>
            <label>Title</label>
            <Input 
                onChange={onTitleChange}
                value={VideoTitle}/>
            <br/>
            <br/> 
            <label>Description</label>
            <TextArea
                onChange={onDescriptionChange}
                value={Description}
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

export default ViedoUploadPage