import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import Grid from "@material-ui/core/Grid";
import CalidadPage from "views/GestionHumanaPage/CalidadPage.js";
import NoticiasPiramide from "views/NoticiasPiramide/NoticiasPiramide";
import SeguridadSalud from "views/SeguridadSaludLaboral/SeguridadSalud";
import PrevencionSection from "views/PrevencionLegitimacion/PrevencionLegitimacion";
import Reproductor from "./views/ReproductorVideos/Reproductor"
import ReproductorGraduacion from "./views/ReproductorVideos/ReproductorGraduacion"
// import Biblioteca from "views/Components/BibliotecaIntranet/App"
// import LoginPage from "views/LoginPage/ModalLogin";
import PortalGestion from "views/PortalGestion/PortalGestion.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
//Biblioteca de Documentos e Imagenes

/*------------Directorio de Imagenes------------------ */
import Card from "./views/Biblioteca/Card";
import Agregar from "./views/Biblioteca/BotonAgregar";

/*------------Directorio de Documentos--------------- */
import CardDocu from "./views/Biblioteca/DirectorioDocumentos/CardDocu";
import AgregarDocu from "./views/Biblioteca/DirectorioDocumentos/BotonAgregarDoc";

/*------------Entorno del Directorio de Imagenes------------- */
import CardImagen from "./views/Biblioteca/EntornoImagenes/CardImagen";
import AgregarImagen from "./views/Biblioteca/EntornoImagenes/AgregarImagen";

/*------------Entorno del Directorio de Documentos---------------- */
import CardDocumentos from "./views/Biblioteca/EntornoDocumentos/CardDocumento";
import AgregarDocumentos from "./views/Biblioteca/EntornoDocumentos/AgregarDocumento";
import HeaderLink from "components/Header/HeaderLinks.js";
import PolizaPage from "views/PolizaPage/PolizaPage";
import ReportPoliza from "views/PolizaPage/ReportPoliza";
import { BackDropProvider } from "Context/ContextBackdrop";
import { DirectorioContext } from "views/Biblioteca/Context/ContextDirectorio/ContextDirectorio";
import { ImagenContext } from "views/Biblioteca/Context/ContextImagen/ContextImagen";
import { DocumentoContext } from "views/Biblioteca/Context/ContextDocumentos/ContextDocumento";
import { AutenticarUsuarioContext } from "Context/ContextAutenticarUsurio";
import {DashboardContext} from "../src/views/DashboardPiramide/context/ContextDashboard"
import {TableContext} from "views/DashboardPiramide/context/ContextTable"
import {SpeedDialProvider} from "Context/ContextSpeedDial"
import DashboardPiramide from "./views/DashboardPiramide/pages/Tablero"


var hist = createBrowserHistory();

ReactDOM.render(
  <BackDropProvider>
    <SpeedDialProvider>
  <AutenticarUsuarioContext>
    <DirectorioContext>
      <ImagenContext>
        <DocumentoContext>
        <DashboardContext>
          <TableContext>
          <Router history={hist}>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              {/* Vistas secciones Intranet */}
              <Route path="/calidad-vida/:id" component={CalidadPage} />
              <Route
                path="/noticias-piramide/:id"
                component={NoticiasPiramide}
              />
              <Route path="/seguridad-salud/:id" component={SeguridadSalud} />
              <Route
                path="/prevencion-legitimacion/:id"
                component={PrevencionSection}
              />
              {/* <Route path="/login-page" component={LoginPage} /> */}
              <Route path="/consulta-poliza" component={PolizaPage} />
              <Route path="/reporte-poliza" component={ReportPoliza} />
              <Route path="/nuevo_ingreso" component={Reproductor} />
              <Route path="/graduacion_piramide" component={ReproductorGraduacion} />
              {/* <Biblioteca/> */}
                <Route path="/DirectorioImagen">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Agregar />
                    </Grid>
                    <Grid item xs={12}>
                      <Card />
                    </Grid>
                  </Grid>
                </Route>
                <Route path="/Imagen">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <AgregarImagen />
                    </Grid>
                    <Grid item xs={12}>
                      <CardImagen />
                    </Grid>
                  </Grid>
                </Route>
                <Route path="/DirectorioDocumento">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <AgregarDocu />
                    </Grid>
                    <Grid item xs={12}>
                      <CardDocu />
                    </Grid>
                  </Grid>
                </Route>
                <Route path="/Documentos">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <AgregarDocumentos />
                    </Grid>
                    <Grid item xs={12}>
                      <CardDocumentos />
                    </Grid>
                  </Grid>
                </Route>

              {/* <Route path="/portal-gestion" component={PortalGestion} /> */}
              <Route path="/dash-portal" component={Dashboard} />
              <Route path="/rtl" component={RtlLayout} />
              <Route path="/auth" component={AuthLayout} />
              <Route path="/admin" component={AdminLayout} />
              
              <Route path="/portal-gestion" component={DashboardPiramide} />
            
              {/* Dashboard */}
              <Route path="/" component={Dashboard} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </Router>
          </TableContext>
          </DashboardContext>
        </DocumentoContext>
      </ImagenContext>
    </DirectorioContext>
  </AutenticarUsuarioContext>
  </SpeedDialProvider>
  </BackDropProvider>,
  document.getElementById("root")
);
