import React,{useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Card, Grid } from '@material-ui/core';
import { CamposInputs } from './components/CamposInputs';
import { DataContext } from './context/DataContext';
import TblClinicas from "./components/TblClinicas"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios"

const useStyles = makeStyles((theme) => ({  
//   root: {
//     height: 180,
//   },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function App() {
  const classes = useStyles();
  const {estadoSelec,busqueda,valoresTabla,loader,ciudadSelec} = useContext(DataContext)

  return (
    <>
    <div className={classes.root}>
      <div className={classes.container}>
        {/* <Backdrop className={classes.backdrop} open={loader} >
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <Grid container>
            <Grid item xs={12}>
              <CamposInputs />
            </Grid>
            <Grid item xs={12} >
              <Paper elevation={8} className={classes.paper}>
                <TblClinicas proveedor={valoresTabla?.filter((item) =>{
                  if(estadoSelec == "" || estadoSelec == "0"){
                    return item
                  }else 
                  (JSON.stringify(((item.ESTADO_PROVEEDOR?.toUpperCase()).includes(estadoSelec?.toUpperCase()))))
                    {
                    return item.ESTADO_PROVEEDOR.includes(estadoSelec)
                  }
                }).filter((item)=>{
                  if(ciudadSelec == "" || ciudadSelec == "0"){
                    return item
                  }else 
                  (JSON.stringify(((item.CIUDAD_PROVEEDOR?.toUpperCase()).includes(ciudadSelec?.toUpperCase()))))
                    {
                    return item.CIUDAD_PROVEEDOR.includes(ciudadSelec)
                  }
                })
                .filter((item)=>{
                  if(busqueda == ""){
                    return item
                  }else if(
                    JSON.stringify(((item.NOMBRE_PROVEEDOR?.toUpperCase()).includes(busqueda?.toUpperCase()))) 
                    ){
                    return item.NOMBRE_PROVEEDOR.toUpperCase().includes(busqueda.toUpperCase())
                  }
                })} />
              </Paper>
            </Grid>
       </Grid>
      </div>
    </div>
  </>
  );
}
