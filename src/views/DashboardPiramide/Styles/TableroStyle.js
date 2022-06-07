import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
place-items: center;
margin-bottom: 5rem;
margin-top: -30px;
`;
export const Card = styled.div`
margin-top: 70px;
display: grid;
position: relative;
width:${props => props.open ? "18vw" : "20vw"} ;
height: 15vh;
background-color: white;
border-radius: 10px;
box-shadow: 14px 40px 2px #AFAFAF;
`;
export const CardIcon = styled.div`
z-index: 99;
position: absolute;
margin-top: -17px;
background: ${props => props.color};
width: 3.5rem;
left: 1rem;
justify-content: center;
align-items: center;
height: 5vh;
border-radius: 20%;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);

`;
export const CardIcon2 = styled.div`
z-index: 99;
position: absolute;
margin-top: -17px;
background: linear-gradient(60deg,#234d25,#43a047);
width: 3.5rem;
left: 1rem;
justify-content: center;
align-items: center;
height: 5vh;
border-radius: 20%;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);

`;
export const CardIcon3 = styled.div`
z-index: 99;
position: absolute;
margin-top: -17px;
background: linear-gradient(60deg,#959595,#d40a0a);
width: 3.5rem;
left: 1rem;
justify-content: center;
align-items: center;
height: 5vh;
border-radius: 20%;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);

`;
export const CardIcon4 = styled.div`
z-index: 99;
position: absolute;
margin-top: -17px;
background: linear-gradient(60deg,#3b516d,#00acc1);
width: 3.5rem;
left: 1rem;
justify-content: center;
align-items: center;
height: 5vh;
border-radius: 20%;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
`;
export const CardHeader = styled.div`
position: relative;
text-align: right;
font-size: 80%;
padding-right: 2rem;
height: 6vh;

p {
  font-size: ${props => props.open ? "13px" : "15px"};
  font-weight: 400;
}

@media screen and (max-width: 1400px) {
  p {
    font-size: 12px !important;
    font-weight: 400;
  }
}
`;
export const CardBody = styled.div`
position: relative;
text-align: center;
font-size: 250%;
font-weight: 600;
// padding-right: 2rem;
height: 5vh;
// padding-top: 0.5rem;
`;
export const CardFooter = styled.div`
position: relative;
padding-left: 2rem;
background-color: #f1f1f1;
height: 5vh;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
margin-top: 20px;
display:grid;
grid-template-columns:1fr 1fr;
justify-content: center;
place-items: center;
a{
font-size: 12px;
}
`;
export const CardBody3 = styled.div`
// position: relative;
// font-size: 170%;
// // font-weight: bold;
// padding-right: 2rem;
// padding-left: 2rem;
// padding-top: 0.5rem;
// display: grid;
// grid-template-columns: 1fr 1fr;
// top: -15px;
`;
export const CardBody4 = styled.div`
position: relative;
font-size: 170%;
// font-weight: bold;
padding-right: 2rem;
padding-left: 2rem;
height: 5vh;
padding-top: 0.5rem;
display: grid;
grid-template-columns: 1fr 1fr;
top: -15px;
// row-gap: 1rem

@media screen and (max-width: 1400px) {
  p {
    font-size: 12px !important;
  }
`;
export const ContainerTable = styled.div`
margin-bottom: 2%;
display: grid;
position: relative;
margin-top: 50px;
`;
export const AppbarTable = styled.div`
background: white;
height: 5vh;
position: relative;
z-index: 999;
width: 95%;
margin-left: 1.5%;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
background: ${props => props.color};
border-radius: 5px;


p{
margin-top:7px; 
font-weight: 900;
margin-left:90px; 
font-size:18px !important;
color: white !important;
}
`;
export const CardIconTable = styled.div`
width: 3.5rem;
left: 1rem;
height: 5vh;
border-radius: 20%;
position: absolute;
background:${props => props.color} 
// linear-gradient(60deg,#B16F00,#E78810)
;
margin-top: -17px;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
`;
export const CardTable = styled.div`
margin-right: 2%;
display: grid;
position: relative;
margin-top: -20px;
background: white;
border-radius: 5px;
grid-auto-rows: auto;
box-shadow: 0 4px 4px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
margin-bottom: 3rem;

`;
export const CardBodyTable = styled.div`
width: 95%;
margin: 40px 0px 20px 2.5%;
background: white;
border-radius: 5px;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
`;
export const Details = styled.a`
font-size:14px !important;
`;
export const History = styled.a`
font-size:14px !important;
`;
export const AppbarTableSolicitud = styled.a`
background: white;
height: 5vh;
position: relative;
z-index: 999;
width: 95%;
margin-left: 1.5%;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
background: linear-gradient(60deg,#006bb9,#73b2b5);
border-radius: 5px;


p{
margin-top:7px; 
font-weight: 900;
margin-left:90px; 
font-size:18px !important;
color: white !important;
}
`;
export const CardIconTableSolicitud = styled.div`
width: 3.5rem;
left: 1rem;
height: 5vh;
border-radius: 20%;
position: absolute;
background: linear-gradient(60deg,#006bb9,#73b2b5);
margin-top: -17px;
box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
`;

