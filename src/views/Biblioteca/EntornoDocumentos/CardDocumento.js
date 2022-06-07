import React,{useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ImgWord from '../image/word.svg';
import ImgExcel from '../image/excel.svg';
import ImgPDF from '../image/PDF.png';
import axios from 'axios';
import Button from '@mui/material/Button';
import Img2 from '../image/carpeta_img.png';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LogoPiramide from '../image/logoPiramide.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {DataDocumentoContext} from  '../Context/ContextDocumentos/ContextDocumento';
import { whiteColor } from 'assets/jss/material-dashboard-pro-react';
import styled from 'styled-components'
import { a } from '@react-spring/web';
import { DataDirectorioContext } from '../Context/ContextDirectorio/ContextDirectorio';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ModalDocumento} from "../EntornoDocumentos/ModalDocumento";
import { useUsuarioAutenticado } from "Context/ContextAutenticarUsurio";
import { ModalEliminarDirectorio } from '../DirectorioDocumentos/ModalEliminarDirectorioDoc';

const Boton = styled.div`
  button {
    border-top: 10px;
    min-width: 133px;
    padding: 9px 30px;
    border-radius: 51px;
    border: none;
    background: #e89525;
    color: #fff;
    font-size: 9.5px;
    cursor: pointer;
    position: inherit !important;
    height: 27px;
  }

  button:hover {
    background-color: #a8621b !important;
  }
`;
const Botoneliminar = styled.div`
  button {
    border: none;
    cursor: pointer;
    position: inherit !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    // height: 610,
    marginLeft: 40,
    marginRight: 40,
    // overflow: 'scroll',
    // padding:30
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  img: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 18,
    alignItems: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  appBar: {
    width: "104%",
    marginLeft: -16,
    marginTop: -16,
    border: 20,
    background: "linear-gradient(45deg, #f5b06a  22%, #e57d12  90%)",
  },
  toolbar: {
    fontSize: 20,
    fontFamily: "ui-sans-serif",
    color: "#494747",
    position: "inherit !important",
  },

  a: {
    fontSize: 10,
  },

  button: {
    background:
      "linear-gradient(45deg, #f5b06a  22%, #e57d12  90%) ! important",
    position: "inherit !important",
  },
  tituloToolbar: {
    marginLeft: 15,
    fontSize: "16px !important",
    marginTop: 6,
  },
}));

export default function SimpleCard() {
  const classes = useStyles();
  const { autenticado, setAutenticado } =
  useUsuarioAutenticado();
  
  const {
    mostrarDocumento,
    dataDocumento,
    open,
    setOpen,
    openModalConfirmacion,
    setOpenModalConfirmacion,
  } = useContext(DataDocumentoContext);

  const [codigoDirectorioPadre,setCodigoDirectorioPadre] = useState("")
  const [codigoDirectorioSelect,setCodigoDirectorioSelect] = useState("")
  const [nombreDocumento,setNombreDocumento] = useState("") 
  const { Directorio, dataDirectorio, setDataDirectorio, llamadoBaseDatos } = useContext(
    DataDirectorioContext
  );

  const [nombreDirectorio, setNombreDirectorio] = useState("");
  const [openModalDict, setOpenModalDict] = useState(false)
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const DownloadImg = async(url, name) => {
    console.log('url:', url)
      const res = await axios({
        url,
        method: 'GET',
        responseType: 'blob'
      })
    const data = window.URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = data;
    let type =url.split('.')
    link.setAttribute('download', `${name}.${type[type.length-1]}`);
    document.body.appendChild(link);
    link.click();
  }

  useEffect(() => {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    const codigoDirectorio = params.get("carpeta");
    const nombreDirectorio = params.get("nomDirectorio");
    setCodigoDirectorioPadre(codigoDirectorio)
    llamadoBaseDatos("DOC", codigoDirectorio);
    mostrarDocumento(codigoDirectorio);
    setNombreDirectorio(nombreDirectorio);
  }, []);

  return (
    <>
    <ModalEliminarDirectorio open={openModalDict}  setOpen={setOpenModalDict} tipoDirectorio={''} codigoDirectorio={codigoDirectorioSelect}  codigoDirectorioPadre={codigoDirectorioPadre}/>
    <ModalDocumento open={openModalConfirmacion}  setOpen={setOpenModalConfirmacion} codigoDirectorioSelect={codigoDirectorioSelect} nombreDocumento={nombreDocumento} />
      <Backdrop className={classes.backdrop}  open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card className={classes.root} style={{ marginTop: -16 }} elevation={20}>
        <CardContent>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <img src={LogoPiramide} alt="." style={{ width: 45 }} />
              <p className={classes.tituloToolbar}>
                {" "}
                Galeria de Documentos ({nombreDirectorio})
              </p>
            </Toolbar>
          </AppBar>
          <Grid container style={{ marginTop: 22 }}>
            {dataDocumento.map((item, i) =>
              item.MINE_TYPE === "pdf" ? (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                 {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                  <Botoneliminar>
                    <Button style={{ zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioSelect( item.COD_DIRECTORIO)
                          setNombreDocumento(item.NOMBRE_DOCUMENTO)
                        }}
                      />
                    </Button>
                  </Botoneliminar>
                  : null }
                  <img src={ImgPDF} alt="·" style={{ width: 60 }} />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>
                  <Boton>
                    {item.DOCUMENTO.search("/strapi") !== -1 ? 
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.DOCUMENTO, item.NOMBRE_DOCUMENTO)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button> :  
                    <Button variant="contained" className="button">
                      <a
                        href={`data:application/pdf;base64, ${item.DOCUMENTO}`}
                        download={item.NOMBRE_DOCUMENTO}
                        style={{ textAlign: "center", color: "white " }}
                      >
                        Descargar{" "}
                      </a>
                      <ArrowDownwardIcon style={{ height: 17 }} />
                    </Button>} 
                  </Boton>
                </Grid>
              ):
              item.MINE_TYPE === "do" ? (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                  {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                  <Botoneliminar>
                    <Button style={{ zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioSelect( item.COD_DIRECTORIO)
                          setNombreDocumento(item.NOMBRE_DOCUMENTO)
                        }}
                      />
                    </Button>
                  </Botoneliminar>
                : null }
                  <img src={ImgPDF} alt="·" style={{ width: 60 }} />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>

                  <Boton>
                    {item.DOCUMENTO.search("/strapi") !== -1 ? 
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.DOCUMENTO, item.NOMBRE_DOCUMENTO)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button> : <Button variant="contained" className="button">
                      <a
                        href={`data:application/pdf;base64, ${item.DOCUMENTO}`}
                        download={item.NOMBRE_DOCUMENTO}
                        style={{ textAlign: "center", color: "white " }}
                      >
                        Descargar{" "}
                      </a>
                      <ArrowDownwardIcon style={{ height: 17 }} />
                    </Button>}
                  </Boton>
                </Grid>
              )
              : item.MINE_TYPE === "docx" ? (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                 {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                  <Botoneliminar>
                    <Button style={{ position: "relative", zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioSelect( item.COD_DIRECTORIO)
                          setNombreDocumento(item.NOMBRE_DOCUMENTO)
                        }}
                      />
                    </Button>
                  </Botoneliminar>
                   : null }
                  <img src={ImgWord} alt="·" style={{ width: 60 }} />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>
                  <Boton>
                    {item.DOCUMENTO.search("/strapi") !== -1 ? 
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.DOCUMENTO, item.NOMBRE_DOCUMENTO)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button> : <Button variant="contained" className="button">
                      <a
                        href={`data:application/msword;base64, ${item.DOCUMENTO}`}
                        download={item.NOMBRE_DOCUMENTO}
                        style={{ textAlign: "center", color: "white " }}
                      >
                        Descargar{" "}
                      </a>
                      <ArrowDownwardIcon style={{ height: 17 }} />
                    </Button>}
                    
                  </Boton>
                </Grid>
              ) : item.MINE_TYPE === "doc" ? (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                   {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                  <Botoneliminar>
                    <Button style={{ position: "relative", zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioSelect( item.COD_DIRECTORIO)
                          setNombreDocumento(item.NOMBRE_DOCUMENTO)
                        }}
                      />
                    </Button>
                  </Botoneliminar>
                  : null }
                  <img src={ImgWord} alt="·" style={{ width: 60 }} />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>
                  <Boton>
                    {item.DOCUMENTO.search("/strapi") !== -1 ? 
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.DOCUMENTO, item.NOMBRE_DOCUMENTO)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button> :  <Button variant="contained" className="button">
                      <a
                        href={`data:application/msword;base64, ${item.DOCUMENTO}`}
                        download={item.NOMBRE_DOCUMENTO}
                        style={{ textAlign: "center", color: "white " }}
                      >
                        Descargar{" "}
                      </a>
                      <ArrowDownwardIcon style={{ height: 17 }} />
                    </Button>}
                  </Boton>
                </Grid>
              ) : item.MINE_TYPE === "xlsx" ? (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                  {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                  <Botoneliminar>
                    <Button style={{ position: "relative", zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioSelect( item.COD_DIRECTORIO)
                          setNombreDocumento(item.NOMBRE_DOCUMENTO)
                        }}
                      />
                    </Button>
                  </Botoneliminar>
                  : null }
                  <img src={ImgExcel} alt="·" style={{ width: 60 }} />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>
                  <Boton>
                    {item.DOCUMENTO.search("/strapi") !== -1 ? 
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.DOCUMENTO, item.NOMBRE_DOCUMENTO)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button> : <Button variant="contained">
                      <a
                        href={`data:application/vnd.ms-excel;base64, ${item.DOCUMENTO}`}
                        download={item.NOMBRE_DOCUMENTO}
                        style={{
                          textAlign: "center",
                          color: "white ",
                          fontsize: 10,
                          fontFamily: "sans-serif",
                        }}
                      >
                        Descargar{" "}
                      </a>
                      <ArrowDownwardIcon style={{ height: 17 }} />
                    </Button>}
                  </Boton>
                </Grid>
              ) :
               item.MINE_TYPE === "xls" ? (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                 {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                  <Botoneliminar>
                    <Button style={{ position: "relative", zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioSelect( item.COD_DIRECTORIO)
                          setNombreDocumento(item.NOMBRE_DOCUMENTO)
                        }}
                      />
                    </Button>
                  </Botoneliminar>
                  : null }
                  <img src={ImgExcel} alt="·" style={{ width: 60 }} />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>
                  <Boton>
                    {item.DOCUMENTO.search("/strapi") !== -1 ? 
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.DOCUMENTO, item.NOMBRE_DOCUMENTO)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button> :  <Button variant="contained">
                      <a
                        href={`data:application/vnd.ms-excel;base64, ${item.DOCUMENTO}`}
                        download={item.NOMBRE_DOCUMENTO}
                        style={{
                          textAlign: "center",
                          color: "white ",
                          fontsize: 10,
                          fontFamily: "sans-serif",
                        }}
                      >
                        Descargar{" "}
                      </a>
                      <ArrowDownwardIcon style={{ height: 17 }} />
                    </Button>}
                  </Boton>
                </Grid>
              ) :
              
              item.MINE_TYPE === "xlsm" ? (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                 {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                  <Botoneliminar>
                    <Button style={{ position: "relative", zIndex: 9999 }}>
                      <HighlightOffIcon
                        style={{ marginRight: "70", top: -10, left: -15 }}
                        onClick={async () => {
                          setOpenModalConfirmacion(true) 
                          setCodigoDirectorioSelect( item.COD_DIRECTORIO)
                          setNombreDocumento(item.NOMBRE_DOCUMENTO)
                        }}
                      />
                    </Button>
                  </Botoneliminar>
                  : null }
                  <img src={ImgExcel} alt="·" style={{ width: 60 }} />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>
                  <Boton>
                    {item.DOCUMENTO.search("/strapi") !== -1 ? 
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.DOCUMENTO, item.NOMBRE_DOCUMENTO)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button> : <Button variant="contained">
                      <a
                        href={`data:application/vnd.ms-excel.sheet.macroEnabled.12;base64, ${item.DOCUMENTO}`}
                        download={item.NOMBRE_DOCUMENTO}
                        style={{
                          textAlign: "center",
                          color: "white ",
                          fontsize: 10,
                          fontFamily: "sans-serif",
                        }}
                      >
                        Descargar{" "}
                      </a>
                      <ArrowDownwardIcon style={{ height: 17 }} />
                    </Button>}
                  </Boton>
                </Grid>
              ):
              (
                <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                  <embed
                    src={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${item.DOCUMENTO}`}
                    alt="."
                    style={{ width: 150 }}
                  />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "Verdana,sans-serif",
                    }}
                  >
                    {item.NOMBRE_DOCUMENTO}
                  </p>
                </Grid>
              )
            )}
            {dataDirectorio.map((item, i) => (
              <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
                 {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  autenticado &&
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
                <Botoneliminar>
                   <Button style={{ zIndex: 9999 }}>
                      <HighlightOffIcon
                        onClick={async () => {
                          setOpenModalDict(true) 
                          setCodigoDirectorioSelect(item.COD_DIRECTORIO)
                        }}
                        style={{ marginRight: "70", top: -10, left: -15 }}
                      />
                    </Button>
                </Botoneliminar>
                : null }
                <a
                  href={`/Documentos?carpeta=${item.COD_DIRECTORIO}&nomDirectorio=${item.DESCRIPCION}`}
                >
                  <img src={Img2} alt="." style={{ width: 60 }} />
                </a>
                <p className={classes.descripcion}>{item.DESCRIPCION}</p>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}