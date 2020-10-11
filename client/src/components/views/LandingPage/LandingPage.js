import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

const Layout = styled.div`
    border:1px solid #dfdfdf;
    border-radius:4px;
`;
const Img = styled.img`
    width:100%;
    border-radius:4px;
    border-bottom-left-radius:0px;
    border-bottom-right-radius:0px;
`;

const T = styled.p`
    font-size:20px;
    font-weight:600;
    margin:0;
`;

const Top = styled.div`
    
`;
const Bottom = styled.div`
    padding:8px;
`;

const Span = styled.span``;

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('뮤직 가져오기를 실패했습니다.')
                }
            })
    }, [])


    const renderCards = Videos.map((video, index) => {
        
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <Layout>
            <Top>
                <a href={`/video/${video._id}`} >
                <Img alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                </a>
            </Top>
            <Bottom>
                <T>{video.title}</T>
                <Span><i class="far fa-user"></i> {video.writer.name} </Span>
            </Bottom>
            </Layout>
        </Col>

    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage