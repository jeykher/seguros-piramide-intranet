import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import CONFIG from 'config/config';

export default function Image(props) {
  return (
    <>
      <Grid container style={{ display: "flex", justifyContent: "center",padding: 20  }}>
        <Grid item md={12}>
          <img
            src={CONFIG.endpoints.strapi + props.dataSections.image?.url}
            style={{
              height: 249,
              display: "block",
              margin: "auto",
              borderRadius: 10,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

