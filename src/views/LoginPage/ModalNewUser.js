import React from "react";
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
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
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
import img1 from "views/LoginPage/image/PiramideRegistro.png"
import styled from "styled-components"
import style from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

const After = styled.div `
.MuiInput-underline:after{
  border-color: #e39b30 !important;
}
`;

const ModalImg = styled.img`
width: 350px;

`;


export default function ModalNewUser() { 
  const [signupModal, setSignupModal] = React.useState(false);
  const classes = useStyles();
  return (
    <div>
      {/* <Button round onClick={() => setSignupModal(true)}>
        <Assignment /> Signup
      </Button> */}
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSignup
        }}
        open={signupModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setSignupModal(false)}
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
              onClick={() => setSignupModal(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h5 className={classes.cardTitle + " " + classes.modalTitle}>
              Registro de Usuario
            </h5>
          </DialogTitle>
          <DialogContent
            id="signup-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <GridItem xs={12} sm={5} md={5} className={classes.mlAuto}>
             
              <ModalImg src={img1} alt='piramides' />
              
               
              </GridItem>
              <GridItem xs={12} sm={5} md={5} className={classes.mrAuto}>

               <After>
                <form className={classes.form} style={{marginTop:50}}>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                      className: classes.customFormControlClasses
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Nombre de Usuario..."
                    }}
                  />
                   <CustomInput
                    formControlProps={{
                      fullWidth: true,
                      className: classes.customFormControlClasses
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <PermIdentityIcon className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Numero de Cédula..."
                    }}
                  />
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                      className: classes.customFormControlClasses
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Correo Electronico..."
                    }}
                  />
                  
                  <div className={classes.textCenter}>
                    <Button round color="warning">
                      Registrar
                    </Button>
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