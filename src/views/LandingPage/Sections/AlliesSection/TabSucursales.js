import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./components/index.css";
import { Card, Grid, IconButton, MenuItem, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

///-----------------------------------------------------------
import { TablePagination, Typography } from "@material-ui/core";
import axios from "axios";
///-----------------------------------------------------------

import { DataContext } from "./context/DataContext";

import CONFIG from "config/config";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 999999,
    color: "#fff",
  },
  none: {
    display: "none",
  },
  button: {
    height: "30px !important",
    borderRadius: 50,
    margin: "20px 0px 0px 20px",
    fontSize: 10,
  },
}));

function TabsSucursales() {
  const classes = useStyles();
  const { setLoader, loader } = useContext(DataContext);
  const [pageAte, setPageAte] = useState(0);
  const [rowsPerPageAte, setRowsPerPageAte] = useState(5);
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const handleChangePageAte = (event, newPage) => {
    setPageAte(newPage);
  };

  useEffect(() => {
    setLoader(true);
    const obtenerSucursales = async () => {
      const res = await axios.post(
        `${CONFIG.endpoints.emergencia24}/BuscaOficinas`,
        {
          cCodEstado: "",
          cCodCiudad: "",
        }
      );
      setData(res.data);
      setLoader(false);
    };
    obtenerSucursales();
  }, []);

  const handleChangeRowsPerPageAte = (event) => {
    setRowsPerPageAte(+event.target.value);
    setPageAte(0);
  };

  return (
    <>
      <Grid container spacing={2} style={{ margin: "0px 0px 20px 0px" }}>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label="Buscar Oficina"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
            }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        style={{ boxShadow: "10px 10px 10px 0 rgb(0 0 0 / 12%)" }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead style={{ color: "white", backgroundColor: "#e39b30" }}>
            <TableRow>
              <TableCell
                style={{ color: "white", display: "none" }}
                align="center"
              >
                Código Oficina
              </TableCell>
              <TableCell
                style={{ color: "white", display: "none" }}
                align="center"
              >
                Dirección
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                OFICINA
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                DIRECCION
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                EMAIL
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                TELEFONOS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {data
              ?.filter((item) => {
             
                if (busqueda == "" || busqueda == "0") {
                  return item;
                } else if (
                  JSON.stringify(
                    item.DESCCIUDAD?.toLowerCase().includes(
                      busqueda?.toLowerCase()
                    )
                  )
                ) {
                  return item.DESCCIUDAD.toLowerCase().includes(
                    busqueda.toLowerCase()
                  );
                }
              })
              .slice(
                pageAte * rowsPerPageAte,
                pageAte * rowsPerPageAte + rowsPerPageAte
              )
              .map((row) => {
                return (
                  <TableRow key={row.CODOFI}>
                    <TableCell align="center" style={{ display: "none" }}>
                      {row.CODOFI}
                    </TableCell>
                    <TableCell align="center" style={{ display: "none" }}>
                      {row.CODESTADO}
                    </TableCell>
                    <TableCell align="left">{row.OFICINA}</TableCell>
                    <TableCell style={{ maxWidth: 200 }} align="left">
                      {row.DESCCIUDAD +
                        " " +
                        " EDIFICIO " +
                        row.EDIFICIO +
                        " " +
                        row.PISO}
                    </TableCell>
                    <TableCell align="left">{row.EMAIL}</TableCell>
                    <TableCell align="left">{row.TELEF1}</TableCell>
                  </TableRow>
                );
              })}
            {/* ))} */}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPageAte}
          page={pageAte}
          onChangePage={handleChangePageAte}
          onChangeRowsPerPage={handleChangeRowsPerPageAte}
        />
      </TableContainer>
    </>
  );
}

export default TabsSucursales;
