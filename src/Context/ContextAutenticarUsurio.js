import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useBackdrop } from "./ContextBackdrop";

import CONFIG from 'config/config';

export const DataAutenticarContext = createContext();

export const useUsuarioAutenticado = () => useContext(DataAutenticarContext);

export const AutenticarUsuarioContext = ({ children }) => {
  var section = JSON.parse(sessionStorage.getItem("DATOS_USUARIO"))
  // console.log("VAlor de la seccion"+section)
  const { setOpen } = useBackdrop();

  const [codigoUsuario, setCodigoUsuario] = useState(section ? section.CODIGO_USUARIO : "");
  const [contrasena, setContrasena] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [nombreUsuario, setNombreUsuario]= useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [nuevoNombreUsuario, setNuevoNombreUsuario] = useState("");
  const [nuevoCodigoUsuario, setNuevoCodigoUsuario] = useState("");
  const [registro, setRegistro] = useState(false)
  const [loginModal, setLoginModal] = useState(false);
  const [menu, setMenu] = useState([]);
  // const [submenu, setSubMenu] = useState([]);

  /* Endpoint para autenticar usuario en el directorio activo */
  const autenticarUserDirectorioActivo = async (codigoUsuario, contrasena) => {
    const codigoUsuarioAutenticar = codigoUsuario + "@spiramide";
    setOpen(true)
   
    const res = await axios.post(`${CONFIG.endpoints.auth}`, {
      user: codigoUsuarioAutenticar,
      password: contrasena,
    });

    if(res.data === "Usuario no autenticado"){
      alert("Usuario no perteneciente al dominio")
      setOpen(false)
      return;
    }
    
    const responseAutenticarUsuario = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/autenticarUsuario`, {
      p_codigo_usuario: codigoUsuario
    });

    if(responseAutenticarUsuario.data.c_cursor_usuario[0].VALOR === "No se encontro Valor"){
      alert("Usuario no registrado")
      setLoginModal(true)
      setRegistro(true)
     
      setOpen(false)
      return;
    }

    if (res.data === "Usuario Autenticado") {
      setAutenticado(sessionStorage.setItem("Autenticado", true));
      setNombreUsuario(responseAutenticarUsuario.data.c_cursor_usuario[0].NOMBRE_USUARIO);
      sessionStorage.setItem("USUARIO", JSON.stringify(responseAutenticarUsuario.data.c_cursor_usuario[0].NOMBRE_USUARIO))
      sessionStorage.setItem("DATOS_USUARIO", JSON.stringify(responseAutenticarUsuario.data.c_cursor_usuario[0]))
      

    }
    setCodigoUsuario("");
    setContrasena("");
    setNombreUsuario("")
    setContrasena("")
    setOpen(false)
  };

  const registrarusuario = async()=>{
    try{
      setOpen(true)
    const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/crearActualizarUsuario`,{
      p_codigo_usuario:codigoUsuario,
      p_cedula:cedula,
      p_nombre_usuario:nuevoNombreUsuario,
      p_email: email
    });
    setOpen(false)
    alert('Su usuario ha sido registrado exitosamente, para continuar por favor iniciar sesión')
    }catch(error){
      console.log(error)
    }
    
  }

  const editarusuario = async()=>{

    try{
      setOpen(true)
      const editar = JSON.parse(sessionStorage.getItem('DATOS_USUARIO'))
    const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/crearActualizarUsuario`,{
      p_codigo_usuario:editar.CODIGO_USUARIO,
      p_cedula:editar.CEDULA,
      p_nombre_usuario:editar.NOMBRE_USUARIO,
      p_email: email
    });
    setOpen(false)
    sessionStorage.setItem("DATOS_USUARIO", JSON.stringify(res.data.c_cursor_usuario[0]))
    alert('Su usuario ha sido actualizado exitosamente')
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    setAutenticado(sessionStorage.getItem("Autenticado", autenticado));
    setNombreUsuario(sessionStorage.getItem("USUARIO", nombreUsuario)?.replaceAll('"', " "))
  }, [autenticado,nombreUsuario]);

  
    const menuUsuario = async () =>{
      const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/obtener_menu_por_usuario`,{
        p_codigo_usuario: codigoUsuario
      })
      //  console.table(res.data.c_cursor_menu_usuario)
       setMenu(res.data.c_cursor_menu_usuario)
      //  setSubMenu(res.data.c_cursor_menu_usuario.SUB_MENU)
      //  console.log("Entro Valor"+res.data.c_cursor_menu_usuario.SUB_MENU)
    }
  


  return (
    <DataAutenticarContext.Provider
      value={{
        autenticado,
        setAutenticado,
        nombreUsuario,
        codigoUsuario,
        setCodigoUsuario,
        contrasena,
        setContrasena,
        autenticarUserDirectorioActivo,
        cedula,setCedula,
        email,setEmail,
        nuevoCodigoUsuario,setNuevoCodigoUsuario,
        nuevoNombreUsuario,setNuevoNombreUsuario,
        registrarusuario,registro,setRegistro,loginModal, setLoginModal,menu,menuUsuario,editarusuario
      }}
    >
      {children}
    </DataAutenticarContext.Provider>
  );
};
