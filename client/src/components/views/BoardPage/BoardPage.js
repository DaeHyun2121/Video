import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

const Layout = styled.div`
    width: 60%;
    margin: 3rem auto;
    border:1px solid #dfdfdf;
    border-radius:4px;
`;
const Head = styled.div`
    display:flex;
    width:100%;
    height:50px;
    border-bottom:1px solid #dfdfdf;

    justify-content:center;
    align-items:center;
    a
`;
const FirstHead = styled.div`
    width:10%;
    
    text-align:center;
`;
const SecondHead = styled.div`
    width:70%;
    height:100%;

    border:1px solid #dfdfdf;
    border-top: none;
    border-bottom:none;

    display:flex;
    justify-content:center;
    align-items:center;
`;
const ThirdHead = styled.div`
    width:20%;
    text-align:center;
`;
const Body = styled.div`
    display:flex;
    width:100%;
    height:40px;

    justify-content:center;
    align-items:center;

    text-align:center;
`;
const FirstBody = styled.div`
    width:10%;
`;
const SecondBody = styled.div`
    width:70%;
    height:100%;

    border:1px solid #dfdfdf;
    border-top: none;
    border-bottom:none;

    display:flex;
    justify-content:center;
    align-items:center;
`;
const ThirdBody = styled.div`
    width:20%;
`;




const { Title } = Typography;
const { Meta } = Card;

function BoardPage() {

    const [Boards, setBoards] = useState([])

    useEffect(() => {
        axios.get('/api/board/getBoards')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.boards)
                    setBoards(response.data.boards)
                } else {
                    alert('글 가져오기를 실패했습니다.')
                }
            })
    }, [])


    const renderCards = Boards.map((board, index) => {
        return (
        <>
        <Col>
            <Body>
                <FirstBody>           
                    <span>{board.writer.name} </span> 
                </FirstBody>
                <SecondBody><a href={`/board/${board._id}`} >
                    <Meta
                        title={board.title}
                    />
                    </a></SecondBody> <br />
                <ThirdBody><span> {moment(board.createdAt).format("YYYY.MM.DD")} </span></ThirdBody>
            </Body>
        </Col>
        </>

    )})



    return (
        <>
        {/* <MainTitle>R_Board</MainTitle> */}
        <Layout>
                <Head>
                    <FirstHead>작성자</FirstHead>
                    <SecondHead>제목</SecondHead>
                    <ThirdHead>작성일</ThirdHead>
                </Head>
                <Row>
                    {renderCards}
                </Row>
        </Layout>
        </>
    )
}

export default BoardPage