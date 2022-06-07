import axios from "axios";
import { useBackdrop } from "Context/ContextBackdrop";
import {useUsuarioAutenticado} from "Context/ContextAutenticarUsurio";
import { useEffect, useState } from "react";

import CONFIG from 'config/config';

const useGestionHumana = () => {

  const [listaReportes, setListaReportes] = useState([]);
  const [constanciaTrabajo, setConstanciaTrabajo] = useState([]);
  const [reporte, setReporte] = useState([]);
  const [anios, setAnios] = useState([]);
  const [meses, setMeses] = useState([]);
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [quincena, setQuincena] = useState([]);
  const [tituloReciboPago, setTituloReciboPago] = useState("");
  const [tipoRec, setTipoRec] = useState("");
  const [quincenaSeleccionada, setQuincenaSeleccionada] =useState("");
  const { setOpen } = useBackdrop();
  const {autenticado} = useUsuarioAutenticado()


  console.log(autenticado)

  const obtenerListaReportes = async () => {
    try {
      const { data } = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/lista_reportes`
      );
      setListaReportes(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerReciboPagoAnios = async (tipoRecibo) => {
    try {
       setOpen(true);
      const { data } = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/lista_ano`,
        {
          p_cedula: JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA,
          p_tiporec: tipoRecibo,
        }
      );
      setAnios(data.result);
       setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMesesReciboPago = async (anioSelec) => {
     setOpen(true);
    const meses = await axios.post(
      `${CONFIG.endpoints.portal}dbo/intranet/lista_mes`,
      {
        p_cedula: JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA,
        p_ano: anioSelec,
        p_tiporec: tipoRec,
      }
    );
    setMeses(meses.data.result);
     setOpen(false);
  };

  const obtenerQuincenaReciboPago = async (mesSelect) => {
     setOpen(true);
    const quincena = await axios.post(
      `${CONFIG.endpoints.portal}dbo/intranet/lista_quincena`,
      {
        p_cedula: JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA,
        p_mes: mesSelect,
        p_ano: anio,
        p_tiporec: tipoRec,
      }
    );
    setQuincena(quincena.data.result);
     setOpen(false);
  };

  const obtenerConstanciaTrabajo = async () => {
    try {
       setOpen(true);
      const { data } = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/lista_cartas_trabajo`
      );
      setConstanciaTrabajo(data.result);
       setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerReporte = async ({
    p_titulo,
    p_dirigida,
    p_tipocarta,
    p_membrete,
  }) => {
    try {
       setOpen(true);
      const { data } = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/ejecuta_reporte_rec`,
        {
          p_cia: "01",
          p_cedula: JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA,
          p_correo: JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).EMAIL,
          p_quincena: null,
          p_mes: null,
          p_ano: null,
          p_titulo: p_titulo,
          p_tiporec: "Q",
          p_idreporte: 65,
          p_dirigida: p_dirigida,
          p_tipocarta: p_tipocarta,
          p_membrete: p_membrete,
        }
      );
      setReporte(data.p_url);
      
      await fetch(data.p_url, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
       setOpen(false);
      alert("En breves momentos llegara su solicitud a su correo");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerReciboPago = async () => {
    try {
       setOpen(true) 
      const { data } = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/ejecuta_reporte_rec`,
        {
          p_cia: "01",
          p_cedula: JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA,
          p_correo: JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).EMAIL,
          p_quincena: quincenaSeleccionada,
          p_mes: mes,
          p_ano: anio,
          p_titulo: tituloReciboPago,
          p_tiporec: tipoRec,
          p_idreporte: 49,
          p_dirigida: "",
          p_tipocarta: "",
          p_membrete: "",
        }
      );
      setReporte(data.p_url);

      await fetch(data.p_url, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      // setListaReportes([])
      setMeses([])
      setAnios([])
      setQuincena([])
      setTituloReciboPago("")
      setQuincenaSeleccionada("")
      
       setOpen(false);
      alert("En breves momentos llegara su solicitud a su correo");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(autenticado){
      if(listaReportes.length === 0) {
        obtenerListaReportes();
      }

      if(constanciaTrabajo.length === 0) {
        obtenerConstanciaTrabajo();
      }
      
    
    }
  }, [autenticado]);

  return {
    listaReportes,
    constanciaTrabajo,
    reporte,
    anios,
    obtenerReciboPagoAnios,
    setTipoRec,
    obtenerReporte,
    anio,
    setAnio,
    meses,
    mes,
    setMes,
    obtenerMesesReciboPago,
    quincena,
    setQuincena,
    obtenerQuincenaReciboPago,
    tituloReciboPago,
    setTituloReciboPago,
    obtenerReciboPago,
    quincenaSeleccionada, setQuincenaSeleccionada
  };
};

export default useGestionHumana;
