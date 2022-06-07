import React,{useContext,useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import App from './App';
import TabSucursales from "./TabSucursales"
import { DataProvider } from './context/DataContext';
import { DataContext } from './context/DataContext';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { TextField, Grid } from '@material-ui/core';
import useDirectorioActivo from 'hooks/useDirectorioActivo';
import TablaDirectorioActivo from './TablaDirectorioActivo';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    // textAlign: "center"
  },
  backdrop: {
    zIndex: 999999,
    color: '#fff',
  },
  section: {
    padding: "70px 0",
   
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px",
  },
  btnColor:{
    background: "#e39b30 "
  },
  $hover:{

  },
  
}));



export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [hidden, setHidden] = useState(false)
  const {estadoSelec,busqueda,valoresTabla,loader,ciudadSelec} = useContext(DataContext)
  const {  nombre,
    setNombre,
    obtenerDirectorioActivo,
    apellido,
    setApellido,
    ubicacion,
    setUbicacion,
    cargo,
    setCargo,
    cedula,
    setCedula,
    palabra,
    setPalabra,
    directorioActivo} = useDirectorioActivo();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Tabs
        id="tabsActividades"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Directorio Telefónico" {...a11yProps(0)} />
        <Tab label="Aliados Comerciales" {...a11yProps(1)} />
        <Tab label="Sucursales" {...a11yProps(2)} />
      </Tabs>
      {/* </AppBar> */}
      <TabPanel  value={value} index={0}>
        <div>
          <GridContainer justify="center">
            <form>
              <GridContainer>
                <GridItem  xs={12} sm={12} md={4} style={{display:"flex", justifyContent:"end"}}>
                  <TextField
                    value={nombre}
                    id="Nombre"
                    label="Nombre"
                    variant="standard"
                    onChange={(e) => setNombre(e.target.value) }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
               
                <GridItem xs={12} sm={12} md={4} >
                   <TextField
                    value={apellido}
                    id="Apellido"
                    label="Apellido"
                    variant="standard"
                    onChange={(e) => setApellido(e.target.value) }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                
                </GridItem>
               
                <GridItem xs={12} sm={12} md={4} style={{display:"flex", justifyContent:"end"}}>
                   <TextField
                    value={cargo}
                    id="Cargo"
                    label="Cargo"
                    variant="standard"
                    onChange={(e) => setCargo(e.target.value) }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <TextField
                    value={ubicacion}
                    id="Ubicacion"
                    label="Ubicacion"
                    variant="standard"
                    onChange={(e) => setUbicacion(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4} style={{display:"flex", justifyContent:"start"}}>
                   <TextField
                    value={palabra}
                    id="Palabra Clave"
                    label="Palabra-Frase Referencial"
                    variant="standard"
                    onChange={(e) => setPalabra(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:20}}>
                  <Button style={{marginTop:20}}
                    className={classes.btnColor}
                    style={{ color: "rgb(250 248 248) !important" }}
                    onClick={() =>{
                      obtenerDirectorioActivo()
                      setNombre("")
                      setApellido("")
                      setUbicacion("")
                      setCargo("")
                      setPalabra("")
                    }}
                  >
                    Buscar
                  </Button>
                </GridItem>
               
              </GridContainer>
            </form>
            <TablaDirectorioActivo directorioActivo={directorioActivo}/>
          </GridContainer>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <App />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabSucursales />
      </TabPanel>
    </div>
  );
}
