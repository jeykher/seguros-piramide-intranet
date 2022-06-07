import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';

import logo_small from "../../assets/img/Icons/png/logo_small.png";
import thumbs from "../../assets/img/Icons/png/thumbs.png";
import visibility from "../../assets/img/Icons/png/visibility.png";
import star from "../../assets/img/Icons/png/star.png";
import home from "../../assets/img/Icons/png/home.png";
import imgPira1 from "../../assets/img/imgPira1.png";


import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={6}>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          046-thumbs up
          <Tab label="Historia" icon={<img src={logo_small} style={{width:30}}/>}  {...a11yProps(0)} />
          <Tab label="Misión / Visión "  icon={<img src={thumbs} style={{width:30}}/>}  {...a11yProps(1)} />
          {/* <Tab label="Visión"  icon={<img src={visibility} style={{width:30}}/>} {...a11yProps(2)} /> */}
          <Tab label="Valores"  icon={<img src={star} style={{width:30}}/>}  {...a11yProps(3)} />
        
         
        </Tabs>
     
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          
        {/* Somos una empresa con más de 40 años en Venezuela cuidando del bienestar de nuestros asegurados */}
        <GridContainer justify="center">
        {/* <GridItem xs={12} sm={12} md={3}>
          <img src ={imgPira1} style = {{width:300,height:250}}/>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
          
          <h5 className={classes.description} style = {{textAlign:"justify",marginTop:-10}}>
          Nacimos como compañía de seguros el 18 de Noviembre de 1975 bajo el nombre de Seguros Hipotecarios Urbanos C.A con el número de registro 21 del tomo 155A del Registro Mercantil I. Desde ese momento nos dedicamos a la realización de operaciones relacionadas con el seguro de hipotecas y para la época éramos la única empresa que se dedicaba a esta actividad en Caracas. Nuestras oficinas estaban ubicadas en la torre Credimático TDC de Colinas de Bello Monte y contábamos con aproximadamente 30 empleados.

          Doce años después, es decir, en 1987 pasamos de ser Seguros Hipotecarios Urbanos C.A. a Seguros Fénix, C.A. y cambiamos nuestra razón social para realizar operaciones de seguros y reaseguros en todas sus formas y líneas de negocio.


          </h5>
        </GridItem>
      </GridContainer>
         
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div style={{display:"flex", flexDirection:"row"}}>
            <h4><b>Misión:</b></h4>
            <h5>Contribuir con el bienestar de la familia venezolana al proteger su patrimonio con nuestro respaldo y un excelente servicio.</h5>
          </div>
          <div style={{display:"flex", flexDirection:"row"}}>
            <h4><b>Visión:</b></h4>
            <h5> Ser una empresa que supere cada año su nivel de participación en el mercado asegurador con una rentabilidad sostenible en el tiempo.</h5>
          </div>

        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        Ser una empresa que supere cada año su nivel de participación en el mercado asegurador con una rentabilidad sostenible en el tiempo
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        Lo que es importante para nosotros:
       <ul>
          <li>Orientación al Servicio</li>
          <li>Adaptabilidad</li>
          <li>Trabajo en Equipo</li>
          <li>Profesionalismo</li>
          <li>Confianza</li>
        
       </ul>
        

        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Item Three jhgggggggggggggggggggggggggggggggg
        </TabPanel>
      
      </SwipeableViews>
    </div>
  );
}
