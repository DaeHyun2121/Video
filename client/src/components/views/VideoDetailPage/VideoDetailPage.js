import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';

const Layout = styled.div`
    width:70%;
    margin:20px auto;
`;

const TitleBlock = styled.div`
    font-size:30px;
    font-weight:500;
`;

const Test = styled.div`
    height:50px;
    border:1px solid #dfdfdf;
    border-radius:10px;
    line-height:50px;
    text-align:center;
`;

const WriterBlock = styled(Test)`
    width:30%;
`;
const DateBlock = styled(Test)`  
    width:65%;
`;

const Audio = styled.audio`
    width:100%;

    margin-top:30px;
`;
const Box = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:20%;
    height:50px;
    float:right;
`;

function VideoDetailPage(props){

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId}
    
    const [VideoDetail, setVideoDetail] = useState([])
    

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if(response.data.success){
                setVideoDetail(response.data.videoDetail)
            }else{
                alert('뮤직 정보를 가져오길 실패했습니다.')
            }
        })

        
    },[])

    if(VideoDetail.writer){
        return(
                <Layout>
                    <TitleBlock>
                        <i class="fas fa-play-circle" style={{marginRight:'10px'}}/>
                        {VideoDetail.title}    
                    </TitleBlock>  
                    <Box>  
                        <WriterBlock>
                            <i class="far fa-user" style={{marginRight:'5px'}}/>{VideoDetail.writer.name}    
                        </WriterBlock>     
                        <DateBlock>
                            <i class="far fa-calendar" style={{marginRight:'5px'}} />
                            {moment(VideoDetail.createdAt).format("YYYY - MM/DD")}
                        </DateBlock>     
                    </Box>             

                    <Audio src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                </Layout>
        )
    }else{
        return(
            <div>...loading</div>
        )
    }
}

export default VideoDetailPage