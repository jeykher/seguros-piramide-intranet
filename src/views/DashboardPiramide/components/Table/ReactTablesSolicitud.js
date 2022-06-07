import React, { useState, useContext, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTableSolicitud from "../Table/ReactTableSolicitud";
import { dataTable } from "variables/general.js";
// import IconButton from '@mui/material/IconButton';
import {DataDashboardContext} from "views/DashboardPiramide/context/ContextDashboard"
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



export default function ReactTables2({id}) {
  const {solicituVaciones,DatosSolicitud,getConsultaVacaciones} = useContext(DataDashboardContext)
  
  useEffect(()=>{
    
  },[solicituVaciones])

  useEffect(()=>{
      getConsultaVacaciones()
  },[])

  const classes = useStyles();

  const SolicitudVacaciones = [
    {
      Header: "FECHA SOLICITUD",
      accessor: "fechaSolicitud",
    },
    {
      Header: "ESTATUS",
      accessor: "status",
    },
    {
      Header: "PERÍODO",
      accessor: "periodo",
    },
    {
      Header: "DÍAS PENDIENTES",
      accessor: "pend",
    },
    {
      Header: "DÍAS SOLICITADOS",
      accessor: "diasolicitud",
    },
    {
        Header: "RESPONSABLE",
        accessor: "respon_autorizar",
    },
  
    {
      Header: "OBSERVACIÓN",
      accessor: "observacion",
    },
    {
      Header: "ACCIÓN",
      accessor: "actions",
    },
  ]

  const SolicitudPrestaciones = [
    {
      Header: "FECHA SOLICITUD",
      accessor: "",
    },
    {
      Header: "MONTO TOTAL",
      accessor: "",
    },
    {
      Header: "MONTO SOLICITADO",
      accessor: "",
    },
    {
      Header: "RESPONSABLE",
      accessor: "",
    },
    {
        Header: "ESTATUS",
        accessor: "",
    },
    {
        Header: "OBSERVACION",
        accessor: "observacion",
    },
    {
      Header: "ACCIÓN",
      accessor: "actions",
    },
  ]
// console.log(id)
  return (
    <GridContainer>
      <GridItem xs={12}>
            <ReactTableSolicitud
            id={id}
              columns={
                id === 4 
                ? SolicitudVacaciones
                : id === 3
                ? SolicitudPrestaciones
                : []
              }
              data={id === 4 ? solicituVaciones : []}
            />
      </GridItem>
    </GridContainer>
  );
}
