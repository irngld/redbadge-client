import styled from 'styled-components';
import background from '../assets/background.png';

export const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 90vw;
margin: auto;
`;

export const BtnMain = styled.div`
position: absolute;
top: 0;
right: 0;
`;


export const BackgrndContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  isolation: isolate;
  z-index: 0;
`;

export const Wrapper = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;



// font-size: calc(5rem - 2vh);
export const TextContainer = styled.div`
  position: absolute;
  left: 25px;
  top: 25px;
  padding: 25px;
  background: rgb(2,161,181, 0.7);
  height: 50vh;
  width: 25vw;
  h1 {
    color: black;
    font-size: 65px;
    font-weight: bolder;
    text-align: left;
  }
  p {
    color: white;
    font-size: 25px;
  }
  button {
    height: 40px;
    width: 150px;
    color: black;
    font-size: 15px;
    font-weight: bold;
    background: #fca311;
    border-radius: 5px;
    margin-bottom: 15px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
`;
