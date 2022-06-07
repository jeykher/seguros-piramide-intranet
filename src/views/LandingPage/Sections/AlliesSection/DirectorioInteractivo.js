import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React from 'react'
import App from './App';
import { makeStyles } from "@material-ui/core/styles";
import { DataProvider } from './context/DataContext';
import styles from "../../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import Tabs from "./Tabs"

const useStyles = makeStyles(styles);
function DirectorioInteractivo() {
    const classes = useStyles();

    return (
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgb(251 247 226)",
          width: "110%",
          marginLeft: "-5%",
          padding: "20px",
        }}
        id="dirTelf"
      >
        <DataProvider>
          <div style={{ height: 10 }}></div>
          <h2 className={classes.title} style={{ marginTop: 40 }}>
            Directorio Telefónico/Aliados Pirámide/Sucursales
          </h2>

          <Tabs />
        </DataProvider>
      </div>
    );
}

export default DirectorioInteractivo





