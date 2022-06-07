/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import PersonIcon from '@mui/icons-material/Person';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import ModalLogin from "views/LoginPage/ModalLogin";
import ModalReciboPago from "views/LoginPage/ModalGestionHumana/ModalReciboPago";
import ModalEditUser from "views/LoginPage/ModalEditUser";
import ModalConstanciaTrabajo from "views/LoginPage/ModalGestionHumana/ModalConstanciaTrabajo";
import { useUsuarioAutenticado } from "Context/ContextAutenticarUsurio";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CONFIG from 'config/config';
import { display } from "@mui/system";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const { autenticado, setAutenticado, nombreUsuario,loginModal, setLoginModal,setRegistro,codigoUsuario,menu, menuUsuario } =
    useUsuarioAutenticado();

  // const [loginModal, setLoginModal] = useState(false);
  const [modalReciboPago, setModalReciboPago] = useState(false);
  const [modalContanciaTrabajo, setModalContanciaTrabajo] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [dataApoyoDocumental, setDataApoyoDocumental] = useState([]);
  const [dataGestionHumana, setDataGestionHumana] = useState([]);
  const [aplicacionesintranet, setAplicacionesIntranet] = useState([]);
  const [administracionIntranet, setAdministracionIntranet] = useState([]);

  useEffect(() => {
    menuUsuario();
  }, [autenticado]);

/*Apoyo Documental */
  /* useEffect(() => {
    const llamadoApoyoDocumental = async () => {
      const res = await axios.get(
        `${CONFIG.endpoints.strapi}/navbar-apoyo-documentals`
      );
      setDataApoyoDocumental(res.data);
    };
    llamadoApoyoDocumental();
  }, []); */
/*-------------------------------------------------------------------------------- */
/*Gestion Humana*/
  /* useEffect(() => {
    const llamadoGestionHumana = async () => {
      const res = await axios.get(
        `${CONFIG.endpoints.strapi}/navbar-gestion-humanas`
      );
      setDataGestionHumana(res.data);
    };
    llamadoGestionHumana();
  }, []); */
/*----------------------------------------------------------------------------------------- */
/*Aplicaciones Intranet */
 /*  useEffect (() =>{
    const llamadoAplicacionesIntranet = async () =>{
      const res = await axios.get(
        `${CONFIG.endpoints.strapi}/aplicaciones-intranets`
      );
      setAplicacionesIntranet(res.data);
    };
    llamadoAplicacionesIntranet();
  },[]) */
  /*---------------------------------------------------------------------------------------------- */
  /*----------------------------------------------------------------------------------------- */
/*Administracion Intranet */
// useEffect (() =>{

// // const codPerfil = JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL
// // setCodigoPerfil(codPerfil)
// //  console.log(7,JSON.parse(sessionStorage.getItem('DATOS_USUARIO')))
// //  console.log(8,codigoPerfil)
//   //setCodigoPerfil(JSON.parse(sessionStorage.getItem('DATOS_USUARIO')).CODIGO_PERFIL)

//   const llamadoAdministracionIntranet = async () =>{
//     const res = await axios.get(
//       `${CONFIG.endpoints.strapi}/navbar-administracions`
      
//     );
//     setAdministracionIntranet(res.data);
//   };
//   llamadoAdministracionIntranet();
// },[])


    // if (codigoPerfil == 'adminDES'){
    //  alert('entro')
    // }

/*---------------------------------------------------------------------------------------------- */
  return (
    <List className={classes.list}>
      <ModalLogin loginModal={loginModal} setLoginModal={setLoginModal} />
      {
        modalReciboPago &&
        <ModalReciboPago
        modalReciboPago={modalReciboPago}
        setModalReciboPago={setModalReciboPago}
      />
      }
      {
        modalContanciaTrabajo &&
        <ModalConstanciaTrabajo
          modalContanciaTrabajo={modalContanciaTrabajo}
          setModalContanciaTrabajo={setModalContanciaTrabajo}
        />
      }
  
        <ModalEditUser
          modalEditUser={modalEditUser}
          setModalEditUser={setModalEditUser}
        />
      <ListItem className={classes.listItem}>
         <CustomDropdown
           noLiPadding
           buttonText="Apoyo Documental"
           buttonProps={{
             className: classes.navLink,
             color: "transparent",
           }}
           buttonIcon={FindInPageIcon}
           dropdownList={menu.map((data, i) => [
             <a href={data.URL} className={classes.dropdownLink} style={{ display: data.SUB_MENU == "100" ?"block" : "none"}}>
               {data.SUB_MENU == "100" ? data.NOMBRE_MENU : null}
             </a>,
           ])}
         />
       </ListItem>
      {autenticado && (
        <>
           <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Gestión Humana"
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={AccessibilityIcon}
            dropdownList=
            {menu.map((data, i) => {
              if (data.NOMBRE_MENU == "Recibos de Pago") {
                return (
                  <a
                    href={data.URL}
                    className={classes.dropdownLink} style={{ display: data.SUB_MENU == "300" ?"block" : "none"}}
                    onClick={() => setModalReciboPago(true)}
                  >
                    {data.SUB_MENU == "300" ? data.NOMBRE_MENU : null}
                  </a>
                );
              } else if (data.NOMBRE_MENU == "Constancia de Trabajo") {
                return (
                  <a
                    href={data.URL}
                    className={classes.dropdownLink} style={{ display: data.SUB_MENU == "300" ?"block" : "none"}}
                    onClick={() => setModalContanciaTrabajo(true)}
                  >
                    {data.SUB_MENU == "300" ? data.NOMBRE_MENU : null}
                  </a>
                );
              } else if (data.NOMBRE_MENU == "Consulta de Polizas") {
                return (
                   <Link
                   to={{
                     pathname: data.URL,
                   }}
                   className={classes.dropdownLink} style={{ display: data.SUB_MENU == "300" ?"block" : "none"}}

                 >
                   {data.NOMBRE_MENU}
                 </Link>
                );
              }
            })}
          />
        </ListItem> 
 {/* {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL == 'adminDES' ?    */}
 {JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))?.CODIGO_PERFIL != 'user' ?   
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Administracion"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={AdminPanelSettingsIcon}
          dropdownList={menu.map((data, i) => [
            <a href={data.URL} key={i} className={classes.dropdownLink} style={{ display: data.SUB_MENU == "400" ?"block" : "none"}}>
              {data.SUB_MENU == "400" ? data.NOMBRE_MENU : null}
            </a>,
          ])}
        />
      </ListItem> 
       : null } 
        </>

      )}
       <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Aplicaciones"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={menu.map((data, i) => [
            <a href={data.URL} key={i} className={classes.dropdownLink} style={{ display: data.SUB_MENU == "200" ?"block" : "none"}} target="_blank">
              {data.SUB_MENU == "200" ? data.NOMBRE_MENU : null}
            </a>,
          ])}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Siguenos en twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/SegPiramide?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
     
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Siguenos en instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/piramidesegurosoficial/?hl=es"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> 

      {!autenticado ? (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            style={{ fontWeight: 900 }}
            onClick={() => {
              setLoginModal(true);
              setRegistro(false);
            }}
          >
            Ingresar
          </Button>
        </ListItem>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText={nombreUsuario}
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              buttonIcon={PersonIcon}
              dropdownList={[
                <a
                  className={classes.dropdownLink}
                  onClick={() => {
                    setModalEditUser(true)
                  }}
                >
                Editar Perfil.
                </a>,
                <a
                href="/"
                className={classes.dropdownLink}
                onClick={() => {
                  if (window.confirm("Seguro que desea salir?")) {
                    setAutenticado(false);
                    sessionStorage.clear();
                  }
                }}
              >
                Cerrar Sesion.
              </a>,
              ]}
            />
          </ListItem>
        </>
      )}
    </List>
  );
}