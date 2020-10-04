import React from "react";
import styled from "styled-components";


function Search(){
    return(
        <SearchLayout>
            <Input placeholder="검색"/>
            <Button>
                <i class="fa fa-search"></i>
            </Button>
        </SearchLayout>
    )
}

const SearchLayout = styled.div`
    width: 730px;
    height: 38px;

    margin: 50px 10px;

    display:flex;
    border:1px solid #dfdfdf;
    border-radius:4px;
`;

const Input = styled.input`
    width: 95%;

    padding-left: 0.5rem;

    border:none;
`;

const Button = styled.button`
    width :5%;
    border:none;
    background-color: #6c757d;

    & > i{
        color : #fff;
    }
`;


export default Search;