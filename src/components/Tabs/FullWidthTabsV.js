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
      Nacimos como compa????a de seguros el 18 de Noviembre de 1975 bajo el nombre de Seguros Hipotecarios Urbanos C.A con el n??mero de registro 21 del tomo 155A del Registro Mercantil I. Desde ese momento nos dedicamos a la realizaci??n de operaciones relacionadas con el seguro de hipotecas y para la ??poca ??ramos la ??nica empresa que se dedicaba a esta actividad en Caracas. Nuestras oficinas estaban ubicadas en la torre Credim??tico TDC de Colinas de Bello Monte y cont??bamos con aproximadamente 30 empleados.

Doce a??os despu??s, es decir, en 1987 pasamos de ser Seguros Hipotecarios Urbanos C.A. a Seguros F??nix, C.A. y cambiamos nuestra raz??n social para realizar operaciones de seguros y reaseguros en todas sus formas y l??neas de negocio.

En 1996 es cuando los actuales accionistas de Seguros Pir??mide deciden comprar Seguros F??nix, C.A., siendo el ??rea de Fianzas el principal ramo de negocio. Esto hizo que nuestra compa????a creciera, se fortaleciera y obtuviese un amplio reconocimiento, alcanzando as?? una de las tres primeras posiciones dentro del raking de primas cobradas de fianzas.

En 1999 cambiamos nuestro nombre de Seguros F??nix, C.A. a Seguros Pir??mide C.A. para afianzar atributos valorados por los accionistas de la empresa, entre los cuales se encuentran: solidez, durabilidad, precisi??n, confiabilidad, fuerza, permanencia en el tiempo, entre otras cosas. En ese mismo a??o mudamos nuestras oficinas ubicadas en S??bana Grande a la urbanizaci??n El Rosal en la ciudad de Caracas, donde hoy en d??a se ubica nuestra Sede Principal. Para la fecha cont??bamos con tan s??lo 100 metros cuadrados y 12 empleados.

En el 2003 inauguramos nuestra primera sucursal en Puerto Ordaz y de all?? en adelante la apertura de nuevas oficinas ha sido continua.

Posteriormente, en el 2006 en Seguros Pir??mide C.A impulsamos con fuerza el desarrollo de otras l??neas de negocio del mercado asegurador (Personas, Autom??vil y Patrimoniales) y realizamos un cambio radical en la estructura organizacional y en el enfoque comercial de la empresa, contando con la aprobaci??n y confianza de nuestros accionistas quienes incrementaron el capital a Seis Millones de Bol??vares Fuertes (6.000.000).

Desde el 2008 y hasta el 2010, ratificando esta tendencia de expansi??n y crecimiento, se aprobaron incrementos sucesivos de capital hasta la cantidad de Cuarenta Millones de Bol??vares Fuertes (40.000.000), totalmente suscritos y pagados en un 100%.

Actualmente tenemos una infraestructura de m??s 6.000 metros cuadrados en nuestra sede principal y con 13 sucursales a nivel nacional. Contamos una amplia red de aliados o proveedores y una plataforma tecnol??gica que contribuye al desarrollo permanente de novedades y alternativas para cubrir las necesidades de nuestros asesores de seguros y asegurados. Adem??s poseemos un talento humano conformado por m??s de 500 colaboradores que brindan productos y servicios de excelente respaldo, cobertura y solidez, ya que tenemos una amplia capacidad y experiencia para responder a los requerimientos de los clientes del mercado actual.

Hoy en d??a tenemos una trayectoria de 38 a??os posicion??ndonos como una s??lida empresa que ha demostrado un crecimiento sostenido. D??a a d??a nos consolidamos m??s realizando inversiones para el mejoramiento de nuestro talento humano, infraestructura, tecnolog??a y procesos. Estamos seguros que as?? prestaremos a nuestros clientes un servicio: confiable, diligente, profesional y agradable.
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
