import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

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
        return <Col lg={6} md={8} xs={24}>
            <div>
            <a href={`/board/${board._id}`} >
            <Meta
                title={board.title}
            />
            </a>
            <span>{board.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {moment(board.createdAt).format("YYYY - MM/DD")} </span>
            </div>
        </Col>

    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            {/* <Search/> */}
                <Row gutter={16}>
                    {renderCards}
                </Row>
        </div>
    )
}

const Test = styled.div`
border:1px solid #dfdfdf;`;

export default BoardPage