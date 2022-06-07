import { useState, useEffect } from "react";
import axios from "axios";
import { useBackdrop } from "Context/ContextBackdrop";

import CONFIG from 'config/config';

const useConsultaPoliza = () => {
  const [polizas, setPolizas] = useState([]); 
  const [reportesPoliza, setReportesPoliza] = useState([])
  const { setOpen } = useBackdrop();

  const obtenerPolizas = async () => {
    try {
      setOpen(true);
      // alert(`${JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA.toString().length}`)
      const res = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/devuelve_polizas`,
        {
          p_codinter: "14",
          p_codcli: `${JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA.toString().length}` <=7 ?
                    `0000000${JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA}` :
                    `000000${JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA}`
        }
      );
      setPolizas(res.data.c_polizas);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const obtenerReportesPolizas = async (idpol, idcert) => {
    const res = await axios.post(
      `${CONFIG.endpoints.portal}dbo/general_policies/get_policy_report`,
      { 
        p_policy_id: idpol, 
        p_certified_id: idcert 
      }
    );
    setReportesPoliza(res.data.c_reports)
  };

  const obtenerReporte = async(reporte) =>{
    const res = await axios.post(`${CONFIG.endpoints.portal}dbo/general_policies/get_report`,{
      p_params: JSON.stringify(reporte)
    })
    window.open("https://segurospiramide.com/reporte/?reportRunId="+ res.data.p_url)
  }

  useEffect(() => {
    obtenerPolizas();
  }, []);

  return {
    polizas,
    obtenerReportesPolizas,
    reportesPoliza,
    obtenerReporte
  };
};

export default useConsultaPoliza;
