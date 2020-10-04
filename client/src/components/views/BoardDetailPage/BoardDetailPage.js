import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';

function BoardDetailPage(props){

    const boardId = props.match.params.boardId
    const variable = { videoId: boardId}
    
    const [BoardDetail, setBoardDetail] = useState([])
    

    useEffect(() => {
        Axios.post('/api/board/getBoardDetail', variable)
        .then(response => {
            if(response.data.success){
                setBoardDetail(response.data.boardDetail)
            }else{
                alert('비디오 정보를 가져오길 실패했습니다.')
            }
        })

        
    },[])

    if(BoardDetail.writer.name){
        return(
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
    
                    <div style={{ width: '100%', padding:'3rem 4rem'}}>
                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                title={BoardDetail.writer.name}
                                content={BoardDetail.content}
                                />
                            
                        </List.Item>
                    </div>
     
                </Col>
            </Row>
        )
    }else{
        return(
            <div>...loading</div>
        )
    }
}

export default BoardDetailPage