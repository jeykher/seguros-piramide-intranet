import { useState, useContext } from "react";
import axios from "axios";
import { DataContext } from '../views/LandingPage/Sections/AlliesSection/context/DataContext';

import CONFIG from 'config/config';

const useDirectorioActivo = () => {
  const [directorioActivo, setDirectorioActivo] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cargo, setCargo] = useState("");
  const [cedula, setCedula] = useState("");
  const [palabra, setPalabra] = useState("");
  const [correo, setCorreo] = useState("");
 
  const { setLoader, loader } = useContext(DataContext);

  const obtenerDirectorioActivo = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/consulta_empleados`,

        {
          P_CIA: "01",
          P_CEDULA: cedula,
          P_NOMBRE: nombre,
          P_APELLIDO: apellido,
          P_CARGO: cargo,
          P_UBIC: ubicacion,
          P_PALABRA: palabra,
          CORREO_ELECTRONICO:correo
        }
      );
       console.log(10,res.data);
      setDirectorioActivo(res.data.P_CURSOR);
      
      setLoader(false);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    nombre,
    setNombre,
    obtenerDirectorioActivo,
    apellido,
    setApellido,
    ubicacion,
    setUbicacion,
    cargo,
    setCargo,
    cedula,
    setCedula,
    palabra,
    setPalabra,
    directorioActivo,
    correo, setCorreo
  };
};

export default useDirectorioActivo;
