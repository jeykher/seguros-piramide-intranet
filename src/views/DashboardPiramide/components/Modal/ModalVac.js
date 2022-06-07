import React, { useState, useContext, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
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
import TextField from '@mui/material/TextField';
import CardHeader from "components/Card/CardHeader.js";
import {DataTableContext} from 'views/DashboardPiramide/context/ContextTable'
import handleDates from 'utils/dataDate' 
import {DataDashboardContext} from 'views/DashboardPiramide/context/ContextDashboard'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(style);


const ColorButton = styled.div`
  .MuiButtonBase-root {
    background-color: #ff0000 !important;
  }
`;

const CustomMenuItem = styled(MenuItem)`
    display:block !important;
    text-align:center !important;
`;

const CustomObservations = styled.div`
  display: "flex";
  justify-content:"center";

  .MuiInputBase-inputMultiline {
    height: auto;
    resize: none;
    padding: 5px !important;
}
`;

const FormTitle = styled.h5`
font-weight:200;
color:#3c4858; 
font-size: 15px !important;
`;

export default function ModalVac() {
  const classes = useStyles();
  //  console.log(diapend)
  // const {DatosSolicitud} = useContext(DataTableContext)
  const {modalVac, setModalVac, totalDays,getSolicitudesVacaciones,setDiaSolicitud,fechaFinal,
    setFechaFinal,daypend,setDayPend,observacionSolicitante,setObservacionSolicitante,solicituVaciones} = useContext(DataDashboardContext)
  
  const handleChange = (e) => {
    if(e.target.value <= daypend && e.target.value > 0){
      // console.log(e.target.value)
      setDiaSolicitud(e.target.value)
    }
    else{
      alert("El valor supera o es inferior a el limite permitido.")
    }
  };

  const handleChangeObservacionSoli = (e) => {
    setObservacionSolicitante(e.target.value)
  }

  const formatedDate = () => {
  let minData = 0;
  let maxData = 0;
  let dateConcat = ""

   let DataFormated = totalDays.sort((a,b)=>{
     return a.PERIODO_DESDE - b.PERIODO_DESDE
   })
   DataFormated.map((item,i)=>{
    dateConcat+=`${item.PERIODO_DESDE}`
    dateConcat+=DataFormated.length -1  !== i?"/":""
   })
  //  console.log(dateConcat)
  //  minData = DataFormated[0].PERIODO_DESDE
  //  maxData = DataFormated[DataFormated.length - 1].PERIODO_DESDE
  //  setFechaFinal(`${minData}/${maxData}`)
  setFechaFinal(dateConcat)
  }

  // const DatosTabla = (data) =>{
    //     let solicitud = [
    //         ...DatosSolicitud
    //     ]
    //     const valSol = solicitud.find(element => element.name == datoSolicitud.PERIODO)
    //     if(valSol){
    //         alert("Solicitud ya procesada")
    //         return;
    //     }
    //     solicitud.push(data)
    //     console.log(solicitud)
    //     DatosSolicitud(solicitud)
    // }

  const additionTotal = () => {
    let pendiente = 0;

    let additionPeriodo = totalDays.map((item, i) =>{
      pendiente = pendiente+(item.TOTAL_DIAS_DISFRUTE - item.DIAS_DISFRUTADOS)
    })
    // console.log("toco",pendiente)
    setDayPend(pendiente)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    getSolicitudesVacaciones()
    setObservacionSolicitante("")
    // DatosSolicitud()
    //  console.log(solicituVaciones)
  }

  useEffect(()=>{
    formatedDate()
    additionTotal()
    //  handleSubmit()
  },[])
  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSignup,
        }}
        open={modalVac}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalVac(false)}
        aria-labelledby="signup-modal-slide-title"
        aria-describedby="signup-modal-slide-description"
      >
        <Card plain className={classes.modalSignupCard}>
          <DialogTitle
            id="signup-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <CardHeader
                plain
                color="danger"
                className={classes.textCenter + classes.cardLoginHeader}
                style={{marginTop:"-70px"}}
              >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => setModalVac(false)}
              style={{color:"white"}}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            {/* <AppBar position="static"> */}
            <h5 className={classes.cardTitle + " " + classes.modalTitle} style={{color:"white"}}>
              SOLICITAR VACACIONES
            </h5>

              </CardHeader>
            
            {/* </AppBar> */}
          </DialogTitle>
          <DialogContent
            id="signup-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer >
              <GridItem xs={12} sm={12} md={12} className={classes.mrAuto}>
                <form
                 onSubmit={handleSubmit}
                  className={classes.form}
                >
                <Card elevation={10}>
                  <div style={{
                    marginTop: 50,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    placeItems: "center",
                    margin:"inherit"
                  }}> 
                  <Box sx={{ minWidth: 120 }} style={{display:"grid", gridTemplateColumns:"1fr 8vw", columnGap:"1vw" }}>
                    <FormTitle>Período:</FormTitle>
                    <TextField id="standard-basic"  variant="standard" value={fechaFinal} disabled={true} />
                  </Box>
                  <Box sx={{ minWidth: 120 }} style={{display:"grid", gridTemplateColumns:"1fr 5vw", columnGap:"1vw" }}>
                    <FormTitle>Dias Pendientes:</FormTitle>
                  <TextField id="standard-basic"  variant="standard" value={daypend} disabled={true} />
                  </Box>
                  <Box sx={{ minWidth: 120 }} style={{display:"grid", gridTemplateColumns:"1fr 5vw", columnGap:"1vw", placeItems:"center" }}>
                  <FormTitle>Dias Solicitados:</FormTitle>
                  <input type="number" min={1}  
                   max={daypend} onChange={handleChange}
                   />
                  </Box>
                  </div>
                  </Card>
                <CustomObservations>
                  <TextField
                    id="outlined-multiline-static"
                    label="Observaciones del Solicitante"
                    multiline
                    rows={3}
                    style={{width:"100%"}}
                    value={observacionSolicitante}
                    onChange={handleChangeObservacionSoli}
                  />
                </CustomObservations>
                <div className={classes.textCenter} style={{marginTop:20}}>
                  <ColorButton>
                    <Button round type="submit" >Guardar</Button>
                  </ColorButton>
                </div>
                </form>
              </GridItem>
            </GridContainer>
          </DialogContent>
        </Card>
      </Dialog>
    </div>
  );
}
