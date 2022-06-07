import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Language from "@material-ui/icons/Language";
import {
  containerOpen,
  container,
} from "../components/Sidebar/style.module.scss";
import Dashboard from "../Dashboard";
import { DataDashboardContext } from "views/DashboardPiramide/context/ContextDashboard";
import ReactTables from "../components/Table/ReactTables";
import ReactTablesSolicitud from "../components/Table/ReactTablesSolicitud";
import {
  Container,
  ContainerTable,
  AppbarTable,
  CardIconTable,
  CardTable,
  CardBodyTable,
  AppbarTableSolicitud,
  CardIconTableSolicitud,
} from "views/DashboardPiramide/Styles/TableroStyle";
import CardTablero from "views/DashboardPiramide/pages/CardTablero"
import { CardDashboard } from "../components/CardDashboard/CardDashBoard";
// import { dataHeader } from "../Data/CardsDashboard";
import { useBackdrop } from "Context/ContextBackdrop";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@material-ui/core";
import ModalPrestaciones from "../components/Modal/ModalPrestaciones";
import CardDashboard1 from "views/DashboardPiramide/components/CardDashboard/CardDashBoard";
import useDashboardTablero from "hooks/useDashboardCard";
import Icon from '@mui/material/Icon';


const Tablero = () => {
  const [openModalPrestaciones, setModalPrestaciones] = useState(false);
  const { open, handleOpen } = useContext(DataDashboardContext);
  const { dataTablero,prestacionesSociales, prestaciones} = useDashboardTablero();
  const { setOpen, open: openbd } = useBackdrop();
  const {
    iconCard,iconColor,appColor,title
  } = useContext(DataDashboardContext);
  // console.log(8,iconCard)
  // console.log(9,iconColor)
  // console.log(7,title)
  // console.log(7,appColor)
  return (
    <>
      <Dashboard>
        <Backdrop
          sx={{ color: "#fff", zIndex: "99999999 !important" }}
          open={openbd}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div></div>
        <Container className={open ? containerOpen : container}>
        <CardTablero/>
        </Container>
        <ContainerTable className={open ? containerOpen : container}>
          <AppbarTable color={appColor}>
          <CardIconTable color={iconColor}>
          <Icon style={{ width: "100%", marginTop: "7px", color: "white" }}>{iconCard}</Icon>
          </CardIconTable>
            <p>
              {title}
              </p>
          </AppbarTable>
          <CardTable>
            <CardBodyTable>
              {dataTablero.length > 0 && (
                <ReactTables
                  dataRows={dataTablero}
                  prestacionesSociales={prestacionesSociales}
                />
              )}
            </CardBodyTable>
          </CardTable>
          <AppbarTableSolicitud>
            <CardIconTableSolicitud>
              <Language
                style={{ width: "100%", marginTop: "10px", color: "white" }}
              />
            </CardIconTableSolicitud>
            <p>Solicitudes</p>
          </AppbarTableSolicitud>
          <CardTable>
            <CardBodyTable>
              {dataTablero.length > 0 && <ReactTablesSolicitud  />}
            </CardBodyTable>
          </CardTable>
        </ContainerTable>
      </Dashboard>
      <ModalPrestaciones
        openModalPrestaciones={openModalPrestaciones}
        setModalPrestaciones={setModalPrestaciones}
        prestaciones={prestaciones}
      />
    </>
  );
};

export default Tablero;
