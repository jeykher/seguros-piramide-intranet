import React,{useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Img1 from './image/carpeta_img.png';
import { Link } from "react-router-dom";
import LogoPiramide from './image/logoPiramide.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataDirectorioContext } from './Context/ContextDirectorio/ContextDirectorio';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styled from 'styled-components'
import { ModalEliminarDirectorioImagen } from './ModalEliminarImagen';


const useStyles = makeStyles((theme) =>({
  root: {
    // minWidth: 275,
    // height: 610,
    marginLeft: 40,
    marginRight: 40,
    // overflow: 'scroll',
    // padding:30
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  img: {
    display:'flex',
    justifyContent:'center', 
    flexDirection:'column',
    padding:30,
    alignItems:"center"

    

  },

  // img:hover{
  //   filter:"opacity (.8)"
  // },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  appBar: {
    width: '104%',
    marginLeft: -16,
    marginTop: -16,
    border: 20,
    background: 'linear-gradient(45deg, #f5b06a  22%, #e57d12  90%)',
  },
  toolbar: {
    fontSize: 20,
    fontFamily: 'ui-sans-serif',
    color: '#494747',
    position: "inherit !important"
  },
  tituloToolbar:{
    marginLeft: 15,
    fontSize: '16px !important' ,
    marginTop:6
  },
  descripcion:{
    textAlign:'center',
    fontSize: '12px !important', 
    fontFamily:'Verdana,sans-serif'
  }
}));
const Botoneliminar = styled.div`
  button {
    border: none;
    cursor: pointer;
    position: inherit !important;
  }
`;
export default function SimpleCard() {
  const classes = useStyles();  
  // const [dataDirectorio, setDataDirectorio] = useState([]);

  const { dataDirectorio, setDataDirectorio,
    llamadoBaseDatos, open, setOpen, eliminarDirectorio,openModalConfirmacion,setOpenModalConfirmacion,setCodigoDirectorioPadre,codigoDirectorioPadre } = useContext(DataDirectorioContext);
    const [tipoDirectorio, setTipoDirectorio] = useState("")

    const handleClose = () => {
      setOpen(false);
    };

  useEffect(() =>{   
    const tipoDirectorio = 'IMG';
    llamadoBaseDatos(tipoDirectorio);
  },[])
 
  return (
    <>
         <ModalEliminarDirectorioImagen open={openModalConfirmacion}  setOpen={setOpenModalConfirmacion} tipoDirectorio={tipoDirectorio} codigoDirectorioPadre={codigoDirectorioPadre} />

      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>

    <Card className={classes.root}  elevation={20}>
      <CardContent>
      <AppBar position="static" className={classes.appBar}  >
            <Toolbar className={classes.toolbar}>
              <img src={LogoPiramide} alt="." style={{ width: 45 }} />
              <p className={classes.tituloToolbar}> Directorio de Imagenes </p>
            </Toolbar>
          </AppBar>
        <Grid container>
          {dataDirectorio.map((item,i) => (
           item.CODIGO_PERFIL === "adminDES" ||
             JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL === item.CODIGO_PERFIL ?
            <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
{/* JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
               <Botoneliminar>
                <Button style={{ zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioPadre(item.COD_DIRECTORIO)
                          setTipoDirectorio(item.descripcion)
                         
                        }}
                      />
                    </Button>
                    </Botoneliminar>
: null  */}
                <Link to= {`/Imagen?carpeta=${item.COD_DIRECTORIO}&nomDirectorio=${item.DESCRIPCION}`}>
                <img src={Img1} alt="." style={{width:60}}/>
                </Link>
                <p className={classes.descripcion} >{item.DESCRIPCION}</p>  
            </Grid>
            :
            <></>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </>
  );
}