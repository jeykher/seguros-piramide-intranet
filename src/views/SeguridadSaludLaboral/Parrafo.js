import React,{useState, useEffect} from "react";
// core components
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
export default function Parrafo(props) {

  const Parrafo = styled.div`
  p {
    font-size: 14px !important;
  }

`;

  return (
    <div>
      <Grid container style={{ display: "flex", justifyContent: "center" }}>
        <Grid item md={10}>
          <Parrafo>
          <div>
            <p style={{ textAlign: "justify", fontSize: 14, margin: "0"  }}>
              {props.dataSections.paragraph}
            </p>
          </div>
          </Parrafo>
        </Grid>
      </Grid>
    </div>
  );
}
