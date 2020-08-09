import React, { useState } from 'react';
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const {TextArea} = Input;
const {Title} = Typography;

const PrivateOptions = [
    {value : 0, label: "Private"},
    {value : 1, label: "Public"}
]

const CategotyOptions = [
    {value : 0, label: "Film & Animation"},
    {value : 1, label: "Autos & Vehicles"},
    {value : 2, label: "Music"},
    {value : 3, label: "Pets & Animals"}
]

function ViedoUploadPage(){

    const [VideoTitle,setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Categoty, setCategoty] = useState("Film & Animation")

    // 입력되게
    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategoty(e.currentTarget.value)
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

                    Axios.post('/api/video/thumbnail',variable)
                        .then(response => {
                            if(response.data.success){
                                console.log(response.data);
                            }else{
                                alert("썸네일 생성 실패")
                            }
                        })

                }else{
                    alert('업로드 실패');
                }
            })

    }

    return (
        <div style={{maxWidth: '700px', margin:'2rem auto'}}>   
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
        

        <Form onSubmit>
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
                {}
                <div>
                    <img src alt/>
                </div>
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

            <select onChange={onPrivateChange}>

                {PrivateOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}

            </select>
            <br/>
            <br/>
            <select onChange={onCategoryChange}>
                {CategotyOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br/>
            <br/>
            <Button type="primary" size="large" onClick>
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default ViedoUploadPage