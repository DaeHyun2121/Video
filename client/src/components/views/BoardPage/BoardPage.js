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
    width:70%;

    text-align:center;
`;
const SecondHead = styled.div`
    width:10%;
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
`;
const FirstBody = styled.div`
    width:70%;
`;
const SecondBody = styled.div`
    width:10%;
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
        <div>

        <Col>
            <Body>
                <FirstBody>
                    <a href={`/board/${board._id}`} >
                    <Meta
                        title={board.title}
                    />
                    </a>
                </FirstBody>
                <SecondBody><span>{board.writer.name} </span> </SecondBody> <br />
                <ThirdBody><span> {moment(board.createdAt).format("YYYY-MM-DD")} </span></ThirdBody>
            </Body>
        </Col>
        </div>

    )})



    return (
        <Layout>
            {/* <Search/> */}
                <Head>
                    <FirstHead>제목</FirstHead>
                    <SecondHead>작성자</SecondHead>
                    <ThirdHead>작성일</ThirdHead>
                </Head>
                <Row gutter={16}>
                    {renderCards}
                </Row>
        </Layout>
    )
}

export default BoardPage