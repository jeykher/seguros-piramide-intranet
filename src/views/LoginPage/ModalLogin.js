import React, { useContext, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Assignment from "@material-ui/icons/Assignment";
import Mail from "@material-ui/icons/Mail";
import Face from "@material-ui/icons/Face";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Email from "@material-ui/icons/Email";
import img1 from "views/LoginPage/image/PiramideRegistro.png"
import style from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import styled from "styled-components";
import { DataAutenticarContext } from "../../Context/ContextAutenticarUsurio";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Alert } from "@mui/material";

const After = styled.div`
  .MuiInput-underline:after {
    border-color: #e39b30 !important;
  }
`;
const ModalContent = styled.div`
  transform: none;
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 6.8;
`;

const ModalImg = styled.img`
width: 350px;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function ExampleLogin({ loginModal, setLoginModal }) {

  const {
    codigoUsuario,
    setCodigoUsuario,
    contrasena,
    setContrasena,
    autenticarUserDirectorioActivo,
    cedula,
    email,
    nuevoCodigoUsuario,
    nuevoNombreUsuario,setCedula,setEmail,setNuevoNombreUsuario,setNuevoCodigoUsuario,registrarusuario,registro,setRegistro
  } = useContext(DataAutenticarContext);

  const [showPassword, setShowPassword] = useState(false);
  // const [registro, setRegistro] = useState(false)

  const classes = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const autenticar = async () => {
    if (!codigoUsuario || !contrasena) { 
      alert("debe ingresar los datos");
      return;
    } else {
      autenticarUserDirectorioActivo(codigoUsuario, contrasena);
      setLoginModal(false);
    }
  };

  const registrar = async () => {
    registrarusuario()
    setLoginModal(false);
  };
  

  return (
    <div>
      <ModalContent>
        <Dialog
          classes={!registro ? ({root: classes.modalRoot,paper: classes.modal + " " + classes.modalLoginAutenticar}) 
          : ({root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalSignup})}
          open={loginModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setLoginModal(false);
            setRegistro(false)
          }}
          aria-labelledby="login-modal-slide-title"
          aria-describedby="login-modal-slide-description"
        >
          <Card plain className={!registro ? (classes.modalLoginCard) : (classes.cardLoginHeader1)}>
            <DialogTitle
              id="login-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <CardHeader
                plain
                color="warning"
                className={!registro ? (`${classes.textCenter} ${classes.cardLoginHeader}`) : (`${classes.textCenter} ${classes.cardLoginHeader}`)} 
              >
                <Button
                  simple
                  className={!registro ? (classes.modalCloseButton) : (classes.modalCloseButton)}
                  key="close"
                  aria-label="Close"
                  onClick={() => {
                    setLoginModal(false);
                    setCodigoUsuario("");
                    setContrasena("");
                    setRegistro(false)
                  }}
                >
                  {" "}
                  <Close className={classes.modalClose} />
                </Button>
                {!registro ? 
                (<h5 className={classes.cardTitleWhite}>Inicia Sesión</h5>):
                (<h5 className={classes.cardTitleWhite}>Registrar Usuario</h5>)}
              </CardHeader>
              
            </DialogTitle>
            <DialogContent
              id="login-modal-slide-description"
              className={classes.modalBody}
            >
              <After>
              {!registro ? (
                  <form>
                  <CardBody className={classes.cardLoginBody} style={{ marginTop: 30 }}>
                    <CustomInput
                      id="login-modal-first"
                      value={codigoUsuario}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Face className={classes.icon} />
                          </InputAdornment>
                        ),
                        placeholder: "Codigo Usuario",
                        onChange: (e) => setCodigoUsuario(e.target.value),
                      }}
                    />
                    <Input
                      style={{ marginTop: 30 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon className={classes.icon}>lock_outline</Icon>
                        </InputAdornment>
                      }
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={contrasena}
                      placeholder="Contraseña"
                      onChange={(e) => setContrasena(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </CardBody>
                </form>
              ):(
                <GridContainer>
                <GridItem xs={12} sm={5} md={5} className={classes.mlAuto}>
                <ModalImg src={img1} alt='piramides' />
                </GridItem>
                <GridItem xs={12} sm={5} md={5} className={classes.mrAuto}>
                <form className={classes.form} style={{marginTop:30}}>
                <CustomInput
                  value={nuevoNombreUsuario}
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
                    placeholder: "Nombre de Usuario...",
                    onChange: (e) => setNuevoNombreUsuario(e.target.value),
                  }}
                />
                 <CustomInput
                 value={cedula}
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
                    placeholder: "Numero de Cédula...",
                    onChange: (e) => setCedula(e.target.value),
                  }}
                />
                <CustomInput
                value={email}
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
                    placeholder: "Correo Electronico...",
                    onChange: (e) => setEmail(e.target.value),
                  }}
                />                
              </form>
              </GridItem>
              </GridContainer>
              )}
              </After>
            </DialogContent>
            <DialogActions
              className={`${classes.modalFooter} ${classes.justifyContentCenter}`}
              style={{display:"flex", flexDirection:"column"}}
            >
              <Button
                style={{ marginTop: 20 }}
                type="button"
                color="warning"
                onClick= { () => !registro ? autenticar() : registrar()}
              >
               {!registro ? ("Ingresar"):("Registrarse")}
              </Button>
              {/* <a style={{marginTop:"10px", cursor:"pointer"}} onClick={() =>{ 
                setContrasena("")
                setCodigoUsuario("")
                setRegistro(!registro)
                
              }}>{!registro ? ("Registrarse"):("Iniciar Sesión")}</a> */}
              
            </DialogActions>
          </Card>
        </Dialog>
      </ModalContent>
    </div>
  );
}
