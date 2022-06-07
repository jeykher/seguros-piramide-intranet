import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import LogoPiramide from "../image/logoPiramide.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@mui/material";
import styled from "styled-components";
import Button from "@mui/material/Button";
import styles from "./Estilos/galeria.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; 
import Img2 from '../image/carpeta_img.png';
import { DataDirectorioContext } from '../Context/ContextDirectorio/ContextDirectorio';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Modalconfirmacion } from "./Modalimagen";
import { DataImagenContext } from "../Context/ContextImagen/ContextImagen";
import { useUsuarioAutenticado } from "Context/ContextAutenticarUsurio";
import { ModalEliminarDirectorioImagen } from '../ModalEliminarImagen';


const Img = styled.img`
  height: 100px;

  &:hover {
    cursor: pointer;
    filter: opacity(0.8);
  }
`;

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
    marginLeft: 40,
    marginRight: 40,
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
    padding: 30,
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
  
  const { Directorio,dataDirectorio, setDataDirectorio, llamadoBaseDatos }
   = useContext(DataDirectorioContext);

  const {
    open,
    setOpen,
    mostrarImagen,
    dataImagen,
    openModalConfirmacion,
    setOpenModalConfirmacion, 

  } = useContext(DataImagenContext);
  const [nombreDirectorio, setNombreDirectorio] = useState("");
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState("");
  const [codigoDirectorioSelect,setCodigoDirectorioSelect] = useState("")
  const [nombreImagen,setNombreImagenSelect] = useState("")  
  const [openConfirmacion,setOpenConfirmacion] = useState(false)        
  
  const [codigoDirectorioPadre,setCodigoDirectorioPadre] = useState("")
  const [openModalDict, setOpenModalDict] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const getImg = (IMAGEN) => {
    setTempImgSrc(IMAGEN);
    setModel(true);
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
    mostrarImagen(codigoDirectorio);
    llamadoBaseDatos('IMG', codigoDirectorio)
    setNombreDirectorio(nombreDirectorio);
  }, []);

  return (
    <>
    <ModalEliminarDirectorioImagen open={openModalDict}  setOpen={setOpenModalDict} tipoDirectorio={''} codigoDirectorio={codigoDirectorioSelect}  codigoDirectorioPadre={codigoDirectorioPadre} />
    <Modalconfirmacion open={openConfirmacion} setOpen={setOpenConfirmacion} codigoDirectorioSelect={codigoDirectorioSelect} nombreImagen={nombreImagen}/>
      <div className={model ? "model open" : "model"}>
        <img src={tempImgSrc} />
        <CloseIcon onClick={() => setModel(false)} />
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card className={classes.root} style={{ marginTop: -16 }} elevation={20}>
        <CardContent>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <img src={LogoPiramide} alt="." style={{ width: 45 }} />
              <p className={classes.tituloToolbar}>
                {" "}
                Galeria de Imagenes ({nombreDirectorio})
              </p>
            </Toolbar>
          </AppBar>
          <Grid container style={{ marginTop: 22 }}>
            {dataImagen.map((item, i) => (
              <Grid item xs={6} sm={3} md={2} className={classes.img} key={i}>
{JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' || Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL ?
                 autenticado?
                 <Botoneliminar style={{ width:"100%", left:-11  }}>
                 <Button style={{zIndex:9999, position:"absolute"}}>
                   <HighlightOffIcon   
                    onClick={ async () =>{
                        setOpenConfirmacion(true) 
                        setCodigoDirectorioSelect(item.COD_DIRECTORIO)
                        setNombreImagenSelect(item.NOMBRE_IMAGEN)
                      }}
                      /> 
  
                    </Button> 

                    </Botoneliminar>
                    :
                    <></>
                    : null }
                <Img
                  src={item.IMAGEN.search("/strapi")
                  !== -1 ? item.IMAGEN :`data:image/png;base64, ${item.IMAGEN}`}
                  alt="·"
                  style={{ width: 150 }}
                  onClick={() =>
                    getImg(item.IMAGEN.search("/strapi")
                    !== -1 ? item.IMAGEN :`data:image/png;base64, ${item.IMAGEN}`)
                  }
                />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontFamily: "Verdana,sans-serif",
                  }}
                >
                  {item.NOMBRE_IMAGEN}
                </p>
                <Boton>
                  {
                    item.IMAGEN.search("/strapi")
                    !== -1 ?
                    <Button variant="contained" className="button" onClick={() => { DownloadImg(item.IMAGEN, item.NOMBRE_IMAGEN)}}>
                      Descargar {" "}
                      <ArrowDownwardIcon style={{height: 17}}/>
                    </Button>
                    :
                    <Button variant="contained" className="button">
                    <a
                      href={`data:image/png;base64, ${item.IMAGEN}`}
                      download={item.NOMBRE_IMAGEN }
                      style={{ textAlign: "center", color: "white " }}
                    >
                      Descargar {" "}
                    </a>
                    <ArrowDownwardIcon style={{height: 17}}/>
                  </Button>
                  }
                </Boton>
              </Grid>
            ))}
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
                  href={`/Imagen?carpeta=${item.COD_DIRECTORIO}&nomDirectorio=${item.DESCRIPCION}`}
                >
                  <img src={Img2} alt="." style={{ width: 70 }} />
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
