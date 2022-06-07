import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";

import styled from "styled-components";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useGestionHumana from "../../../hooks/useGestionHumana";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

const After = styled.div`
  .MuiInput-underline:after {
    border-color: #e39b30 !important;
  }
`;

const ColorButton = styled.div`
  .MuiButtonBase-root {
    background-color: #ff0000 !important;
  }
`;

export default function ModalReciboPago({
  modalReciboPago,
  setModalReciboPago,
}) {
  const classes = useStyles();
  const [reciboPago, setReciboPago] = React.useState("");
 
  /*ModalRecibo de Pago APi */
  const {
    listaReportes,
    anios,
    setTipoRec,
    obtenerReciboPagoAnios,
    anio,
    setAnio,
    obtenerMesesReciboPago,
    meses,
    setMes,
    mes,
    quincena,
    setQuincena,
    obtenerQuincenaReciboPago,
    tituloReciboPago,
    setTituloReciboPago,
    obtenerReciboPago, 
    quincenaSeleccionada, 
    setQuincenaSeleccionada
  } = useGestionHumana();

  const handleChange = (event) => {
    setReciboPago(event.target.value);
    setTituloReciboPago(event.target.value?.split("-")[2]);
    setTipoRec(event.target.value?.split("-")[1]);
    obtenerReciboPagoAnios(event.target.value?.split("-")[1]);
  };

  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSignup,
        }}
        open={modalReciboPago}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalReciboPago(false)}
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
              onClick={() => setModalReciboPago(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            {/* <AppBar position="static"> */}
            <h5 className={classes.cardTitle + " " + classes.modalTitle}>
              Recibo de Pago.
            </h5>
            {/* </AppBar> */}
          </DialogTitle>
          <DialogContent
            id="signup-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} className={classes.mrAuto}>
                <After>
                  <form className={classes.form} style={{ marginTop: 50 }}>
                    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Tipo de Recibo:
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={reciboPago}
                          label="Tipo:"
                          onChange={handleChange}
                        >
                          {listaReportes?.map((item, i) => (
                            <MenuItem
                              key={i}
                              value={item.VALOR + "-" + item.DESCRIP}
                            >
                              {item.DESCRIP}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Año:
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={anio}
                          label="Año:"
                          onChange={(e) => {
                            const anioSelec = e.target.value;
                            setAnio(anioSelec);
                            obtenerMesesReciboPago(anioSelec);
                          }}
                        >
                          {anios?.map((item, i) => (
                            <MenuItem key={i} value={item.ANO}>
                              {item.ANO}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Mes:
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={mes}
                          label="Mes:"
                          onChange={(e) => {
                            setMes(e.target.value);
                            const mesSelect = e.target.value;
                            obtenerQuincenaReciboPago(mesSelect);
                          }}
                        >
                          {meses?.map((item, i) => (
                            <MenuItem key={i} value={item.MES}>
                              {item.DESCRIPCION}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 100, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Quincena:
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={quincenaSeleccionada}
                          label="Quincena:"
                          onChange={(e) =>{
                            setQuincenaSeleccionada(e.target.value)
                          }}
                        >
                          {quincena?.map((item, i) => (
                            <MenuItem key={i} value={item.QUINCENA}>
                              {item.QUINCENA}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <div className={classes.textCenter}>
                      <ColorButton>
                        <Button round onClick={() =>{
                           obtenerReciboPago()
                          setModalReciboPago(false)
                        }}>
                          Emitir
                        </Button>
                      </ColorButton>
                    </div>
                  </form>
                </After>
              </GridItem>
            </GridContainer>
          </DialogContent>
        </Card>
      </Dialog>
    </div>
  );
}
