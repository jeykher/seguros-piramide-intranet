import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Modal } from '../EntornoImagenes/Modal/Modal';
import { GlobalStyle } from '../globalStyles';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { ModalDirectorio } from '../Modal/Modal'
import { DataDirectorioContext } from '../Context/ContextDirectorio/ContextDirectorio';
import { useUsuarioAutenticado } from "Context/ContextAutenticarUsurio";
// import { DataDirectorioContext } from '../../../Context/ContextDirectorio/ContextDirectorio';



const useStyles = makeStyles((theme) => ({
    root: {
    
        margin: theme.spacing(1),
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
       
    
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    marginGrid: {

      marginLeft: 30,
      marginTop: 10
  
    },
    
  }));

  const Button = styled.button`
  min-width: 100px;
    padding: 5px 10px;
    border-radius: 30px;
    border: none;
    background: #d68430;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  `;
  
  export default function FloatingActionButtons() {
    const classes = useStyles();
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);
    const [showModalDirectorio, setShowModalDirectorio] = useState(false);
    const [codigoDirectorioPadre, setCodigoDirectorioPadre] = useState('');

    const { Directorio,ObtenerDirectorioActual,obtenerCodDirectorio, codigoDirectorio, setCodigoDirectorio  } = useContext(DataDirectorioContext);
    const { autenticado, setAutenticado } =
    useUsuarioAutenticado();

  const openModal = () => {

   setShowModal(prev => !prev);
  };

  const openModalDirectorio = () => {

    obtenerCodDirectorio()

    setShowModalDirectorio(prev => !prev);

  };

  useEffect(() =>{
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);    
 
    const codigoDirectorio = params.get('carpeta');
    ObtenerDirectorioActual(codigoDirectorio)
    setCodigoDirectorioPadre(codigoDirectorio)
    // alert(codigoDirectorio)
  },[])

  
    return (
        <div className={classes.root}>
      <div >
      <Grid container spacing={3} className={classes.marginGrid} >
      <Grid item xs={1}>
            <Tooltip title="Atras">
              <Link onClick={() =>history.goBack()}>
                <IconButton><ArrowBackIcon /></IconButton>
              </Link>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Home">
              <Link to="/">
                <IconButton><HomeIcon /></IconButton>
              </Link>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <TextField
            style={{marginLeft:"1rem"}}
              placeholder="Buscar Documento"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {autenticado && (
          <>
          <Grid item xs={3} style={{ marginTop: 5 }}>
          {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
            <Button id="AgregarDirectorio" onClick={openModal}>
              Agregar Imagen
            </Button>
          : null }
          </Grid>
          <Grid item xs={3} style={{ marginTop: 5 }}>
          {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
                  Directorio.CODIGO_PERFIL ===  JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL &&
            <Button id="AgregarDirectorio" onClick={openModalDirectorio}>
              Agregar Directorio
            </Button>
          : null }
          </Grid>
          </>
          )}
        </Grid>
        <GlobalStyle />
        </div>
        <ModalDirectorio showModal={showModalDirectorio} setShowModal={setShowModalDirectorio} codigoDirectorio={codigoDirectorio} codigoDirectorioPadre={codigoDirectorioPadre}  />
        <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
  );
}