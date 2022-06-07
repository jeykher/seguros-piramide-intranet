import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className={classes.root}
      style={{
        color: "yellow !important",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgb(76 65 65)",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        style={{
          color: "yellow !important",
          display: "flex",
          justifyContent: "center",
        }}
        centered
      >
        <Link
          to="eventAct"
          offset={-70}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab
            label="Eventos / Actividades / Jornadas"
            {...a11yProps(1)}
            style={{ color: "white" }}
          />
        </Link>

        <Link
          to="noticias"
          offset={-50}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab label="Noticias" {...a11yProps(2)} style={{ color: "white" }} />
        </Link>

        <Link
          to="dirTelf"
          offset={-70}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab
            label="Directorio Telefónico"
            {...a11yProps(2)}
            style={{ color: "white" }}
          />
        </Link>
        <Link
          to="aliados"    
          offset={-70}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab
            label="Nuestros Aliados"
            {...a11yProps(3)}
            style={{ color: "white" }}
          />
        </Link>

        <Link
          to="cumplePromGradua"
          offset={-60}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab
            label="Cumpleaños/Promociones"
            {...a11yProps(3)}
            style={{ color: "white" }}
          />
        </Link>

        <Link
          to="saludseguridad"
          offset={-80}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab
            label="Salud y Seguridad Laboral"
            {...a11yProps(4)}
            style={{ color: "white" }}
          />
        </Link>

        <Link
          to="prevencion"
          offset={-50}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab
            label="Administración de Riesgos de LC/FT/FPADM"
            {...a11yProps(5)}
            style={{ color: "white" }}
          />
        </Link>

        <Link
          to="enlacesInteres"
          offset={-80}
          smooth={true}
          duration={1000}
          style={{ color: "white !important" }}
        >
          <Tab
            label="Enlaces de Interés"
            {...a11yProps(6)}
            style={{ color: "white" }}
          />
        </Link>
      </Tabs>
    </div>
  );
}
