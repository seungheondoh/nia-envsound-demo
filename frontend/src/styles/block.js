import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 6em 4em;
    margin-top: 10em;
`;

export const SelectGrid = styled.div`
    width:250px;
    height:250px;
    margin-top: 10em;
`;

export const SongButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color : white;
    margin: 0;
    transition: 0.5s all ease-out;
    &:hover {
    color: white;
    }
`;

export const H7 = styled.p`
    margin: 0;
    margin-top: 5px;
    color: rgba(255,255,255,0.5);
    font-size: 12pt;
`

export const SearchContainer = styled.form`
    margin: 0;
    font-weight: normal;
    display: flex;
    align-items: center;
`


// SoungImage
export const FirstCircle = styled.div `
  position: absolute;
  z-index: 10;
  top: 0px;
`;


export const ImageContainer = styled.div `
  margin-bottom: 10px;
  position: relative;
  background-color: rgba(25,25,25,0.8);
`;

export const SongContainer = styled.div `
    font-size: 15px;
    width : 100%;
`;