import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Assignment from "@material-ui/icons/Assignment";
import Face from "@material-ui/icons/Face";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import img1 from "views/LoginPage/image/PiramideRegistro.png";
import styled from "styled-components";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

const After = styled.div`
  .MuiInput-underline:after {
    border-color: #e39b30 !important;
  }
`;

const ModalImg = styled.img`
  width: 350px;
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

  .MuiTableCell-head {
    color: #ffffffde !important;
    font-weight: 500;
    line-height: 1.5rem;
}

  width: 800px
`;

export default function ReportPoliza({
  openModalPoliza,
  setOpenModalPoliza,
  reportesPoliza,
  obtenerReporte
}) {
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSignup,
        }}
        open={openModalPoliza}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenModalPoliza(false)}
        aria-labelledby="signup-modal-slide-title"
        aria-describedby="signup-modal-slide-description"
      >
        <Card plain className={classes.modalSignupCard}>
          <DialogTitle
            id="signup-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => setOpenModalPoliza(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h5 className={classes.cardTitle + " " + classes.modalTitle}>
              Documentos
            </h5>
          </DialogTitle>
          <DialogContent
            id="signup-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer
              style={{ display: "flex", justifyContent: "center",marginTop:30, width:"100%" }}
            >
              <Tabla>
                <TableContainer
                  component={Paper}
                  style={{ boxShadow: "10px 10px 10px 0 rgb(0 0 0 / 12%)" }}
                >
                  <Table size="small" aria-label="a dense table">
                    <TableHead className="theader">
                      <TableRow>
                        <TableCell align="center">REPORTE</TableCell>
                        <TableCell align="center">DETALLE</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableData">
                      {reportesPoliza.map((item, i) => (
                        item.REPORTE == "Cuadro Poliza" && (
                        <TableRow >
                          <TableCell align="center">{item.REPORTE}</TableCell>
                          <TableCell align="center">{item.DETALLE}</TableCell>
                          <TableCell align="center"><span
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
                        onClick={() => obtenerReporte(item)}
                      >
                        Generar Reporte
                      </span></TableCell>

                        </TableRow>
                        )
                      ))} 
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[6]}
                    component="div"
                    //filter(ele => ele.STSSOLI != "ATE")?.
                    count={reportesPoliza.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Tabla>
            </GridContainer>
          </DialogContent>
        </Card>
      </Dialog>
    </div>
  );
}
