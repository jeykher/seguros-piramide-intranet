import React,{useState} from "react";
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
import TextField from "@mui/material/TextField";
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

export default function ModalConstanciaTrabajo({
  modalContanciaTrabajo,
  setModalContanciaTrabajo,
}){
  const classes = useStyles();
  const [dirigidoA, setDirigidoA] = useState("")
  const [reciboPago, setReciboPago] = useState("");
  const [membrete, setMembrete] = useState("")
  const [tipoCarta, setTipoCarta] = useState("")
  const { reporte, constanciaTrabajo,obtenerReporte } = useGestionHumana();

  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSignup,
        }}
        open={modalContanciaTrabajo}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalContanciaTrabajo(false)}
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
              onClick={() => setModalContanciaTrabajo(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            {/* <AppBar position="static"> */}
            <h5 className={classes.cardTitle + " " + classes.modalTitle}>
              Constancia de Trabajo.
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
                      <TextField
                        value={dirigidoA}
                        onChange={(e) => setDirigidoA(e.target.value)}
                        id="outlined-basic"
                        label="Dirigido a:"
                        variant="outlined"
                        style={{ width: 850 }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Tipo de Carta:
                        </InputLabel>
                        <Select
                          value={reciboPago+"|"+tipoCarta}
                          onChange={(e) =>{
                            setReciboPago(e.target.value.split("|")[0])
                            setTipoCarta(e.target.value.split("|")[1])
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Tipo de Carta:"
                        >
                          {constanciaTrabajo?.map((item, i) => (
                            <MenuItem value={item.DESCRIP+"|"+item.VALOR}>
                              {item.DESCRIP}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Membrete:
                        </InputLabel>
                        <Select
                          value={membrete}
                          onChange={(e) => setMembrete(e.target.value)}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Mes:"
                        >
                          <MenuItem value={"S"}>Si</MenuItem>
                          <MenuItem value={"N"}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <div className={classes.textCenter}>
                      <ColorButton>
                        <Button
                          round
                          onClick={() => {
                            // alert(JSON.stringify( {
                            //   p_titulo:reciboPago,
                            //   p_dirigida:dirigidoA,
                            //   p_tipocarta:tipoCarta,
                            //   p_membrete:membrete 
                            // }))
                            obtenerReporte(
                              {
                                p_titulo:reciboPago,
                                p_dirigida:dirigidoA,
                                p_tipocarta:tipoCarta,
                                p_membrete:membrete 
                              }
                            )
                            setModalContanciaTrabajo(false)
                            setDirigidoA("")
                          }}
                        >
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
