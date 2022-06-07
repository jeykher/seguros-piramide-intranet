import React,{useState,useContext} from "react";
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
import { DataAutenticarContext } from "../../Context/ContextAutenticarUsurio";
import styled from "styled-components";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";



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




export default function ModalEditUser({modalEditUser,setModalEditUser,}){
  const classes = useStyles();
  const{email, setEmail, editarusuario}=useContext(DataAutenticarContext);

  const editar = async () => {
    editarusuario()
    setModalEditUser(false);
  };
  
  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSignup,
        }}
        open={modalEditUser}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalEditUser(false)}
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
              onClick={() => setModalEditUser(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            {/* <AppBar position="static"> */}
            <h5 className={classes.cardTitle + " " + classes.modalTitle}>
            Editar Perfil.
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
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         id="outlined-basic"
                         label="Editar Correo:"
                        variant="outlined"
                        style={{ width: 850 }}
                      />
                    </Box>
                   
                    <div className={classes.textCenter}>
                      <ColorButton>
                        <Button
                          round
                           onClick={() => {editar();}}
                        >
                        Guardar.
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
