import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
///-----------------------------------------------------------
import { Backdrop, Button, TablePagination, TextField, Typography } from '@material-ui/core';
///-----------------------------------------------------------
import "./index.css"

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 999999,
    color: '#fff',
  },
  // table: {
  //   width: "100%",
    
  // },
  none: {
    display: 'none'
  },
  button: {
    height: "30px !important",
    borderRadius: 50,
    margin: "20px 0px 0px 20px",
    fontSize: 10
  },
}));

function Documentos({proveedor}) {

  const classes = useStyles();
  const [pageAte, setPageAte] = useState(0);
  const [rowsPerPageAte, setRowsPerPageAte] = useState(3);

  const handleChangePageAte = (event, newPage) => {
    setPageAte(newPage);
  };

  const handleChangeRowsPerPageAte = (event) => {
    setRowsPerPageAte(+event.target.value);
    setPageAte(0);
  };

  return (
    <>    
      {/* ////////////////////////////////////////////// */}
      <TableContainer component={Paper} style={{boxShadow: "10px 10px 10px 0 rgb(0 0 0 / 12%)"}}>
        <Table  size="small" aria-label="a dense table">
          <TableHead style={{color:"white", backgroundColor:"#e39b30"}}>
          {/* #bd261e   47C0B6*/}
            <TableRow>
              <TableCell style={{color:"white"}} align="center">PROVEEDOR</TableCell>
              <TableCell style={{color:"white"}} align="center">DIRECCION</TableCell>
              <TableCell style={{color:"white"}} align="center">TELEFONOS</TableCell>
              <TableCell style={{color:"white"}} align="center">ESTADO</TableCell>
              <TableCell style={{color:"white"}} align="center">CIUDAD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {/* {rowsPend.map((row) => ( */}
            {proveedor.slice(pageAte * rowsPerPageAte, pageAte * rowsPerPageAte + rowsPerPageAte).map((row) => {
              return (
                <TableRow key={row.CODIGO_PROVEEDOR}>
                    <TableCell align="center">{row.NOMBRE_PROVEEDOR}</TableCell>
                  <TableCell align="left">{(row.DIRECCION_PROVEEDOR +" "+ row.MUNICIPIO_PROVEEDOR +" "+row.AVENIDA_PROVEEDOR +" "+ row.EDIFICIO_PROVEEDOR +" "+ row.PISO_PROVEEDOR +", Edo. " + row.ESTADO_PROVEEDOR +" - " +row.CIUDAD_PROVEEDOR).replace(/null|null,/gi, "")}</TableCell>
                  <TableCell style={{minWidth:100}} align="center">{row.TELEFONOS}</TableCell>
                  <TableCell align="center" >{row.ESTADO_PROVEEDOR}</TableCell>
                  <TableCell align="center" >{row.CIUDAD_PROVEEDOR}</TableCell>
                </TableRow>
              )
            })}
            {/* ))} */}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={proveedor.length}
          rowsPerPage={rowsPerPageAte}
          page={pageAte}
          onChangePage={handleChangePageAte}
          onChangeRowsPerPage={handleChangeRowsPerPageAte}
        />
      </TableContainer>
    </>
   
)}
    

export default Documentos