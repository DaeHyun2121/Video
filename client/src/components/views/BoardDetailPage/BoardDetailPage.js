import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styled from "styled-components";
import moment from 'moment';

const List = styled.div`
    width:700px;
    height:350px;

    border: 1px solid #dfdfdf;
    border-radius:4px;

    margin-top:3rem;
    white-space:normal;
`;

const Top = styled.div`
    display:flex;
    height:70px;

    margin:0;
    border-bottom:1px solid #dfdfdf;
`;
const TopLeft = styled.div`
    width:60%;
    display:flex;
    align-items:center;
    padding:10px;

    font-size:20px;
    font-weight:600;
`;
const TopRight = styled.div`
    width:40%;

    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:500;

    border-left:1px solid #dfdfdf;
`;
const Bottom = styled.div`
    white-space: normal;
    width:100%;
    min-height:280px;
    padding:10px;

    overflow: auto;
`;


function BoardDetailPage(props){

    const boardId = props.match.params.boardId
    const variable = { boardId: boardId}
    
    const [BoardDetail, setBoardDetail] = useState([])
    

    useEffect(() => {
        Axios.post('/api/board/getBoardDetail', variable)
        .then(response => {
            if(response.data.success){
                setBoardDetail(response.data.boardDetail)
                console.log(BoardDetail.content);
            }else{
                alert('board 정보를 가져오길 실패했습니다.')
            }
        })

        
    },[])

    if(BoardDetail.writer){
        return(
            <List>
                <Top>
                    <TopLeft>{BoardDetail.title}</TopLeft>
                    <TopRight>작성자 : {BoardDetail.writer.name} 작성일 : {moment(BoardDetail.createdAt).format("YYYY.MM.DD")} </TopRight>
                </Top>
                <Bottom>
                    {BoardDetail.content}
                </Bottom>
                   
                
            </List>
        )
    }else{
        return(
            <div>...loading</div>
        )
    }
}

export default BoardDetailPage