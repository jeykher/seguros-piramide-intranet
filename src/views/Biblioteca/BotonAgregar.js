import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Modal } from '../Biblioteca/Modal/Modal';
import { GlobalStyle } from './globalStyles';
import { makeStyles } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// import { DataDirectorioContext } from '../../Context/ContextDirectorio/ContextDirectorio';
import { ModalDirectorio } from './Modal/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DataDirectorioContext } from './Context/ContextDirectorio/ContextDirectorio';


const useStyles = makeStyles((theme) => ({
    root: {
    //   '& > *': {
        margin: theme.spacing(1),
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
       
    //   },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    marginGrid:{

      marginLeft:30,
      marginTop:8
  
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

    const [showModalDirectorio, setShowModalDirectorio] = useState(false);
    // const [codigoDirectorio, setCodigoDirectorio] = useState();

    const { obtenerCodDirectorio, codigoDirectorio, setCodigoDirectorio } = useContext(DataDirectorioContext);



  const openModal = async () => { 

      obtenerCodDirectorio()
      
      setShowModalDirectorio(prev => !prev);
  };

    
  
    return (
        <div className={classes.root}>
      <div >
      <Grid container spacing={3}   className={classes.marginGrid} >
      <Grid item xs={1}>
            <Tooltip title="Atras">
              <Link to="/">
                <IconButton><ArrowBackIcon /></IconButton>
              </Link>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={4} style={{marginTop:5}}>
          {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?
          <Button id="AgregarDirectorio"  onClick={openModal}>
          Agregar Directorio
          </Button>
          : null }
          </Grid>
        </Grid>
        <GlobalStyle /> 
        </div>
        <ModalDirectorio showModal={showModalDirectorio} setShowModal={setShowModalDirectorio} codigoDirectorio={codigoDirectorio}/>
        </div>
  );
}