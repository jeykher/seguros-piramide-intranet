import React from 'react'
import Grid from "@mui/material/Grid";
import CONFIG from 'config/config';

const Flyers = (props) => {
  return (
    <>
      <Grid container style={{ display: "flex", justifyContent: "center"  }}>
        <Grid item md={12}>
          <img
            src={CONFIG.endpoints.strapi + props.dataSections.image?.url}
            style={{
              height: "100%",
              width: "80%",
              display: "block",
              margin: "auto",
              borderRadius: 10,
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Flyers