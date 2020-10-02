import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

const MelonChartPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const datas = await axios.get("http://localhost:5000/melonchart");
      setData(datas.data);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data === null) {
    return <div>Load..</div>;
  } else {
    console.log(data);
    return (
      <div>      
        <Container>
        <Head>멜론 차트</Head>

        {data.map((element) => (
          <>
              <Item>
                <Rank>{element.rank} </Rank>
                <Img><img src={element.image}/> </Img> 
                <Title>{element.title}</Title>  
                <Artist>{element.artist}</Artist>
              </Item>
            <br />
          </>
        ))}
        </Container>
      </div>
    );
  }
};

const Container = styled.div`
  margin-top:20px;
  width: 80%;
  margin:0 auto;
`;

const Head = styled.h2`
  padding:10px 0px;
  margin:0;

  text-align:center;
`;

const Item = styled.div`
  width:100%;
  height:150px;
  
  display:flex;

  justift-content:center;
  align-items:center;

`

const Rank = styled.div`
  width: 10%;

  font-weight:bold;
  text-align:center;
  align-selfs:center;
`
const Img = styled.div`
  width: 20%;

  & > img{
    width:100px;
    height:100px;
  }
`
const Title = styled.div`
  width:50%;
`
const Artist = styled.div`
  width:20%;
`
export default MelonChartPage;
