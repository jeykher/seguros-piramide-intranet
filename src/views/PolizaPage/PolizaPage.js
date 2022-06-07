import React, { useState, useEffect } from "react";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import logoPira from "../../assets/img/logoPira.svg";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
// import Exportarexcel from '../../components/ExportarExcel/Exportarexcel'
import {
  Backdrop,
  CircularProgress,
  TablePagination,
  TextField,
} from "@material-ui/core";
import useConsultaPoliza from "hooks/useConsultaPoliza";
import { useBackdrop } from "Context/ContextBackdrop";
import ModalNewUser from "./ReportPoliza";

const dashboardRoutes = []; 

const Appbar = styled.div`
  .MuiAppBar-colorPrimary {
    color: #fff;
    background-color: #e39b30 !important;
  }
`;
const Tabla = styled.div`
  .tableData tr:nth-of-type(odd) {
    background-color: #f3f2f8 !important;
  }

  .tableData tr:hover {
    background-color: #ebebee !important;
  }

  .select:hover {
    background-color: #b08927 !important;
  }

  .theader {
    background-color: #747378 !important; /* Header Tabla*/
  }

  table>thead>tr>th{
    color:white !important;
    font-weight: 800px;
  
  }
`;

const PolizaPage = () => {
  const { polizas, obtenerReportesPolizas, reportesPoliza,obtenerReporte } = useConsultaPoliza();
  const { open } = useBackdrop();
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openModalPoliza, setOpenModalPoliza] = useState(false);

  const onChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
        <ModalNewUser openModalPoliza={openModalPoliza} setOpenModalPoliza={setOpenModalPoliza} reportesPoliza={reportesPoliza} obtenerReporte={obtenerReporte}/>
      {/* <Backdrop sx={{ color: "#fff", zIndex: -99999999999999 }} open={open}>
        
      </Backdrop> */}
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
      />
      <Card
        style={{ padding: "30px", marginTop: 110, margin: 90 }}
        elevation={14}
      >
         <Link to="/">
         <Tooltip title="Home">
        <IconButton aria-label="delete" style={{marginBottom:20}}>
        <HomeIcon />
      </IconButton>
      </Tooltip>
      </Link>
        <Appbar>
          <AppBar position="static">
            <h3 style={{ marginLeft: 20 }}>Polizas</h3>
          </AppBar>
        </Appbar>
        <div style={{ display: "flex" }}>
          <form
            noValidate
            autoComplete="off"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            <TextField
              name="busqueda"
              value={busqueda}
              onChange={onChange}
              label="Buscar"
              // variant="outlined"
              type="text"
            />
          </form>
          {/* <Exportarexcel
                    titulo={tituloTabla}
                    enviarjsonGrid={cursorIndicadores} /> */}
        </div>
        {/* TABLA */}
        {
          open?
          <CircularProgress color="inherit" />
          :
          <Tabla>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "10px 10px 10px 0 rgb(0 0 0 / 12%)" }}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead className="theader">
                <TableRow>
                  <TableCell align="center">Area</TableCell>

                  <TableCell align="center">No Póliza</TableCell>

                  <TableCell align="center">Titular</TableCell>
                  <TableCell align="center">Vigencia</TableCell>
                  <TableCell align="center">Cuadro de Poliza</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tableData">
                {polizas.map((item, i) => (
                  <TableRow>
                    <TableCell align="center">{item.DESCAREA}</TableCell>
                    <TableCell align="center">{item.CODPOL}-{item.CODOFIEMI}-{item.NUMPOL}</TableCell>
                    <TableCell align="center">{item.TITULAR}</TableCell>
                    <TableCell align="center">{item.VIGENCIA}</TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          backgroundColor: "#ff9800",
                          color: "#FFF",
                          display: "inline-block",
                          padding: "5px 12px",
                          fontSize: 10,
                          textAlign: "center",
                          fontWeight: 700,
                          lineHeight: 1,
                          borderRadius: 12,
                          textTransform: "uppercase",
                          verticalAlign: "baseline",
                          cursor:'pointer'
                        }}
                        onClick={() =>{
                            obtenerReportesPolizas(item.IDEPOL,item.NUMCERT)
                            setOpenModalPoliza(true)
                        }}
                      >
                        Visualizar
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              //filter(ele => ele.STSSOLI != "ATE")?.
              count={polizas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Tabla>}
      </Card>
    </div>
  );
};

export default PolizaPage;
