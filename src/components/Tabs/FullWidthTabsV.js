import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
      Nacimos como compañía de seguros el 18 de Noviembre de 1975 bajo el nombre de Seguros Hipotecarios Urbanos C.A con el número de registro 21 del tomo 155A del Registro Mercantil I. Desde ese momento nos dedicamos a la realización de operaciones relacionadas con el seguro de hipotecas y para la época éramos la única empresa que se dedicaba a esta actividad en Caracas. Nuestras oficinas estaban ubicadas en la torre Credimático TDC de Colinas de Bello Monte y contábamos con aproximadamente 30 empleados.

Doce años después, es decir, en 1987 pasamos de ser Seguros Hipotecarios Urbanos C.A. a Seguros Fénix, C.A. y cambiamos nuestra razón social para realizar operaciones de seguros y reaseguros en todas sus formas y líneas de negocio.

En 1996 es cuando los actuales accionistas de Seguros Pirámide deciden comprar Seguros Fénix, C.A., siendo el área de Fianzas el principal ramo de negocio. Esto hizo que nuestra compañía creciera, se fortaleciera y obtuviese un amplio reconocimiento, alcanzando así una de las tres primeras posiciones dentro del raking de primas cobradas de fianzas.

En 1999 cambiamos nuestro nombre de Seguros Fénix, C.A. a Seguros Pirámide C.A. para afianzar atributos valorados por los accionistas de la empresa, entre los cuales se encuentran: solidez, durabilidad, precisión, confiabilidad, fuerza, permanencia en el tiempo, entre otras cosas. En ese mismo año mudamos nuestras oficinas ubicadas en Sábana Grande a la urbanización El Rosal en la ciudad de Caracas, donde hoy en día se ubica nuestra Sede Principal. Para la fecha contábamos con tan sólo 100 metros cuadrados y 12 empleados.

En el 2003 inauguramos nuestra primera sucursal en Puerto Ordaz y de allí en adelante la apertura de nuevas oficinas ha sido continua.

Posteriormente, en el 2006 en Seguros Pirámide C.A impulsamos con fuerza el desarrollo de otras líneas de negocio del mercado asegurador (Personas, Automóvil y Patrimoniales) y realizamos un cambio radical en la estructura organizacional y en el enfoque comercial de la empresa, contando con la aprobación y confianza de nuestros accionistas quienes incrementaron el capital a Seis Millones de Bolívares Fuertes (6.000.000).

Desde el 2008 y hasta el 2010, ratificando esta tendencia de expansión y crecimiento, se aprobaron incrementos sucesivos de capital hasta la cantidad de Cuarenta Millones de Bolívares Fuertes (40.000.000), totalmente suscritos y pagados en un 100%.

Actualmente tenemos una infraestructura de más 6.000 metros cuadrados en nuestra sede principal y con 13 sucursales a nivel nacional. Contamos una amplia red de aliados o proveedores y una plataforma tecnológica que contribuye al desarrollo permanente de novedades y alternativas para cubrir las necesidades de nuestros asesores de seguros y asegurados. Además poseemos un talento humano conformado por más de 500 colaboradores que brindan productos y servicios de excelente respaldo, cobertura y solidez, ya que tenemos una amplia capacidad y experiencia para responder a los requerimientos de los clientes del mercado actual.

Hoy en día tenemos una trayectoria de 38 años posicionándonos como una sólida empresa que ha demostrado un crecimiento sostenido. Día a día nos consolidamos más realizando inversiones para el mejoramiento de nuestro talento humano, infraestructura, tecnología y procesos. Estamos seguros que así prestaremos a nuestros clientes un servicio: confiable, diligente, profesional y agradable.
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}
