import React, { useState, useEffect, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "../Table/ReactTable";
import Tooltip from '@mui/material/Tooltip';
import { dataTable } from "variables/general.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import {GrEdit} from "react-icons/gr"
import handleDates from 'utils/dataDate'
import {DataDashboardContext} from 'views/DashboardPiramide/context/ContextDashboard'
import Checkbox from 'views/DashboardPiramide/components/Checkbox/CheckBox'

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ReactTables({dataRows,id,prestacionesSociales}) {
  const classes = useStyles();
  const {handlePend,diapend,setDiaPend,data, setData} = useContext(DataDashboardContext)

  // console.log(prestacionesSociales)
  useEffect(() => {
    
    let newArray = []
    dataRows.map((item, index) =>{
     if (item.MONTO!=0){
       newArray.push(item)
     }
   })
   
      let res = newArray.map((prop, i) => {
        prop.id = i
        if(id === 4){
      // console.log(newArray)
          return {
            name: prop.PERIODO_DESDE,
            position: prop.TOTAL_DIAS_DISFRUTE,
            office: prop.DIAS_DISFRUTADOS === null ? 0 : prop.DIAS_DISFRUTADOS,
            pend: prop.TOTAL_DIAS_DISFRUTE - prop.DIAS_DISFRUTADOS,
            isPend: prop.TOTAL_DIAS_DISFRUTE - prop.DIAS_DISFRUTADOS === 0,
            status:
              prop.TOTAL_DIAS_DISFRUTE - prop.DIAS_DISFRUTADOS === 0
                ? "Finalizado"
                : "Pendiente",
            actions: (
              <div className="actions-right">
                <Checkbox 
                prop={prop}/>
              </div>
            ),
          };
        }
        
        if(id === 3){
          return {
            fecha: handleDates.formatDayMonthYear(prop.FECHA),
            monto:(<span style={{color:prop.MONTO.toString().search("-") !== -1 ? "red" : "black"}}>{prop.MONTO.toFixed(2)}</span>) ,
            tipo_movi: prop.DESCRIPCION,
            saldo: prop.SALDO_DISPONIBLE.toFixed(2)
          };
        }else{
          return res = []
        }
      })

      setData(res)
      // console.log(res)


  },[dataRows]);

  const columnasVacaciones = [
    {
      Header: "PERÍODO",
      accessor: "name",
    },
    {
      Header: "TOTAL VACACIONES",
      accessor: "position",
    },
    {
      Header: "DÍAS DISFRUTADOS",
      accessor: "office",
    },
    {
      Header: "DÍAS PENDIENTES",
      accessor: "pend",
    },
    {
      Header: "ESTATUS",
      accessor: "status",
    },
    {
      Header: "ACCIÓN",
      accessor: "actions",
    },
  ]

  const columnasPrestaciones = [
    {
      Header: "FECHA INGRESO",
      accessor: "fecha",
    },
    {
      Header: "TIPO MOVIMIENTO",
      accessor: "tipo_movi",
    },
    {
      Header: "MONTO",
      accessor: "monto",
    },
    {
      Header: "SALDO",
      accessor: "saldo",
    },
  ]

  const columnasPrestacionesSolici = [
    {
      Header: "prestaciones1Solici",
      accessor: "name",
    },
    {
      Header: "prestaciones2Solici",
      accessor: "position",
    },
    {
      Header: "Días Disfrutados",
      accessor: "office",
    },
    {
      Header: "Días Pendientes",
      accessor: "pend",
    },
    {
      Header: "Estatus",
      accessor: "status",
    },
    {
      Header: "Acción",
      accessor: "actions",
    },
  ]

  const columnasVacacionesSolici = [
    {
      Header: "VacacionesSolici",
      accessor: "name",
    },
    {
      Header: "Total VacacionesSolici",
      accessor: "position",
    },
    {
      Header: "Días Disfrutados",
      accessor: "office",
    },
    {
      Header: "Días Pendientes",
      accessor: "pend",
    },
    {
      Header: "Estatus",
      accessor: "status",
    },
    {
      Header: "Acción",
      accessor: "actions",
    },
  ]
  return (
    <>
      <GridContainer>
        <GridItem xs={12}>
          <ReactTable
          id={id}
          // checked={checked}
            columns={
              id === 1
                ? columnasPrestacionesSolici
                : id === 2
                ? columnasVacacionesSolici
                : id === 3
                ? columnasPrestaciones
                : 
               columnasVacaciones
             
            }
            data={data}
          />
        </GridItem>
      </GridContainer>
    </>
  );
}

