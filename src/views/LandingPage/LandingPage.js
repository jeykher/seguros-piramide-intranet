import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import CaruselNew from "../Components/Sections/CaruselNew.js";
import SectionSecondBar from "../Components/Sections/SectionSecondBar.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
// import  SpeedDial from "components/SpeedDial/Speed​​Dial.js" ;
// Sections for this page
import GestionHumanaSection from "./Sections/GestionHumanaSection.js";
import NoticiasSection from "./Sections/NoticiasSection.js";
import SeguridadSalud from "./Sections/SeguridadSalud.js";
import WorkSection from "./Sections/WorkSection.js";
import PrevencionSection from "./Sections/PrevencionSection.js";
import logoPira from "../../assets/img/logoPira.svg";
import "../../assets/css/landingPage.css";
import { Divider } from "@material-ui/core";
import AlliesSection from "./Sections/AlliesSection/DirectorioInteractivo";
import SectionAliados from "./Sections/SectionAliados";
import EnlacesInteres from "./Sections/EnlacesInteres";
import FooterNew from "../../components/FooterNew/index.js";
import IndexActividadesEventos from "./Sections/ActividadesEventosSection/IndexActividadesEventos.js";
import CumplanosPromoGradua from "./Sections/CumplanosPromoGradua/IndexActividadesEventos.js";
import "./index.css";
import { useBackdrop } from "Context/ContextBackdrop";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import ModalNewUser from "views/LoginPage/ModalNewUser.js"
import SpeedDials from "../../components/SpeedDialNavigator/SpeedDialNavigator"
import style from "../../style/global.css"

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const {open} =useBackdrop()
  return (
    <div> 
    <Backdrop
        sx={{ color: '#fff', zIndex: 99999 }}
        open={open}
      >
        <CircularProgress color="inherit" />
        </Backdrop>
      <Header
        color="secondary"
        routes={dashboardRoutes}
        brand=""
        brandImg={logoPira}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <div id="carousel">
      <CaruselNew />
      </div>
      <div className={classNames(classes.main)}>
        <div style={{ width: "100%",marginTop:15 }}>
          <SectionSecondBar />
          <Divider />
        </div>
        <div className={classes.container} style={{ marginTop: -0 }}>
          {/* GESTIÓN HUMANA */}
          <GestionHumanaSection />
          <SpeedDials />
          {/* ACTIVIDADES Y EVENTOS*/}
          <div
            style={{
              backgroundColor: "rgb(251 247 226)",
              width: "110%",
              marginLeft: "-5%",
            }}
          >
            <IndexActividadesEventos />
          </div>
          <div id="noticias">
            <NoticiasSection />
          </div>
         
          <AlliesSection
           
          />
          <div id="aliados">
          <SectionAliados />
          </div>
          <CumplanosPromoGradua />
          <div id="saludseguridad">
          <SeguridadSalud />
          </div>
          <div id="prevencion">
          <PrevencionSection />
          </div>
          <div id="enlacesInteres">
          <EnlacesInteres />
          </div>
          <ModalNewUser/>
          <WorkSection />
        </div>

      </div>
      <FooterNew />
 
    </div>
  );
}
