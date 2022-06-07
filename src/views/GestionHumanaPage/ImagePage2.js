import React,{useState, useEffect} from "react";
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

import CONFIG from 'config/config';

export default function ImagePage2(props) {

  const Parrafo = styled.div`
  p {
    font-size: 14px !important;
  }

`;

  return (
    <div>
          <Grid container style={{padding:10}}>
            <Grid item md={8} style={{ padding: 40 }}>
            <Parrafo>

              <p style={{ textAlign: "justify"}}>
              {props.dataSections.paragraph}
              </p>
              </Parrafo>
            </Grid>
            <Grid item md={4} style={{display:'flex', justifyContent:'center'}}>
              <img src={CONFIG.endpoints.strapi + props.dataSections.image?.url} style={{ height: 240, borderRadius:50}}  />
            </Grid>
          </Grid>
    </div>
  );
}