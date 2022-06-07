import React, { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios'
import { Button, Tooltip } from "@material-ui/core";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonCancelSolicitud from "views/DashboardPiramide/components/Button/ButtonCancelSolicitud"
export const DataDashboardContext = createContext();
import CONFIG from 'config/config';

export const DashboardContext = ({ children }) => {
  /*==================================================================== */
    const [open, setOpen] = useState(false);
    const [totalDays, setTotalDays] = useState([]);
    const handleOpen = (e) => {
      setOpen(!open)
    };
  /*==================================================================== */

    const [modalVac, setModalVac] = useState(false)
    const handleOpenModal = (e) => {
       setModalVac(!modalVac)
    };
  /*==================================================================== */

    const [diapend, setDiaPend] = useState({pend:"",periodo:[]})
    const [data, setData] = useState([]);
    

    const handlePend = (e,data) => {
        // console.log(e.target.checked,diapend)
        let daySum = diapend.pend;
        let dataPeriodo = {...diapend}
        // console.log(typeof dataPeriodo.pend,diapend, typeof data.TOTAL_DIAS_DISFRUTE, typeof Number.parseInt(data.DIAS_DISFRUTADOS), data)
        if(e.target.checked){
          dataPeriodo.pend = Number.parseInt(daySum + (data.TOTAL_DIAS_DISFRUTE - data.DIAS_DISFRUTADOS))
          dataPeriodo.periodo.push(data.PERIODO_DESDE)
        } else {
          dataPeriodo.pend =  Number.parseInt(diapend.pend - (data.TOTAL_DIAS_DISFRUTE - data.DIAS_DISFRUTADOS))
          dataPeriodo.periodo =  diapend.periodo.filter(item => item != data.PERIODO_DESDE)
        }
        
        let daypend ={
          pend: dataPeriodo.pend,
          periodo: dataPeriodo.periodo
        }
        // console.log(dataPeriodo, daypend,diapend)
        setDiaPend({...daypend})
      }
   /*==================================================================== */
  const [diasolicitud, setDiaSolicitud] = useState(1);
  const [observacionSolicitante, setObservacionSolicitante] = useState("")
  const [observacionSupervisor, setObservacionSupervisor] = useState("")
  const [estatus, setEstatus] = useState("P");
  const [numeroSolicitud, setNumeroSolicitud] = useState()
  const [montoSolicitud, setMontoSolicitud] = useState()
  const [solicituVaciones, setSolicitudVacaciones] = useState([])
  const [diasSolicitados, setDiasSolicitados] = useState()
  const [fechaFinal, setFechaFinal] = useState("")
  const [daypend, setDayPend] = useState(0)
  const [tipoSolicitud, setTipoSolicitud] = useState("")
  // const [cardIdSolicitud, setCardIdSolicitud] = useState(1)

  /*==============Insertar Datos en la tabla de Solicitudes Vacaciones====================== */
  const getSolicitudesVacaciones = async() => {
    let sessionSolicitante = JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA
    let sessionsolicitanteString = sessionSolicitante.toString()

    let diaSolicitadoNumber = parseInt(diasolicitud)
    // console.log(3,typeof(valor))
    try {
      const solicitudVacaciones = await axios.post(`https://segurospiramide.com/asg-api/dbo/intranet/sp_crear_act_solicitudes`,{
        "p_tipo_solicitud":"V",
        "p_observacion_supervisor": "Prueba"/*observacionSupervisor*/,
        "p_observacion_solicitante": observacionSolicitante,
        "p_id_supervisor":"13459687",
        "p_id_solicitante": sessionsolicitanteString,
        "p_estatus": estatus,
        "p_nro_solicitud":numeroSolicitud,
        "p_dias_solicitado":diaSolicitadoNumber ,
        "p_monto_solicitado": montoSolicitud ,
        "p_periodo": fechaFinal,
        "p_dias_pendientes":daypend
      })
      console.log(2,solicitudVacaciones.data.cursor_solicitudes[0])

      if(solicitudVacaciones.data.cursor_solicitudes[0].VALOR == 'Solicitud ya procesada'){
        alert("Solicitud ya procesada anteriormente.")
        setModalVac(false)
        return;
      }
     alert("Solicitud Procesada con Exito")
     DatosSolicitud(solicitudVacaciones.data.cursor_solicitudes)

     setModalVac(false)
    }catch(error){
      console.log(error)
    }
  }

  const DatosSolicitud = (data) => {
   
      let res = data.map((item) => {
          return {
            fechaSolicitud: item.FECHA_SOLICITUD.slice(0,10),
            periodo: item.PERIODO,
            pend: item.DIAS_PENDIENTES,
            diasolicitud: item.DIAS_SOLICITADO,
            respon_autorizar: "Miguel Castillo",
            status: item.ESTATUS === "P" ? "Pendiente" : null ,
            observacion: item.OBSERVACION_SOLICITANTE,
            actions: (
              <div>
                <ButtonCancelSolicitud/>
              </div>
            )
          };
      })
        // console.log("res",res)
        setSolicitudVacaciones(res)
  }
/*========================CONSULTAR VACACIONES EN LAS SOLICITUDES================================ */
    const getConsultaVacaciones = async() => {
    let sessionSolicitante = JSON.parse(sessionStorage.getItem("DATOS_USUARIO")).CEDULA
    let sessionsolicitanteString = sessionSolicitante.toString()
    try {
      const consultaVaca = await axios.post(`https://segurospiramide.com/asg-api/dbo/intranet/consultaSolicitudes`,{
        "p_tipo_solicitud":"V",
        "p_id_solicitante":sessionsolicitanteString
      })
      DatosSolicitud(consultaVaca.data.cursor_consul_soli)
    } catch (error) {
      console.log(error)
    }
  }
/*==============Insertar Datos en la tabla de Solicitudes Prestaciones====================== */
// const getSolicitudesPrestaciones = async() => {
//   try {
//     const solicitudPrestaciones = await axios.post(`https://segurospiramide.com/asg-api/dbo/intranet/sp_crear_act_solicitudes`,{
//       "p_tipo_solicitud":"P",
//         "p_observacion_supervisor": "Prueba"/*observacionSupervisor*/,
//         "p_observacion_solicitante": observacionSolicitante,
//         "p_id_supervisor":"13459687",
//         "p_id_solicitante": sessionsolicitanteString,
//         "p_estatus": estatus,
//         "p_nro_solicitud":numeroSolicitud,
//         "p_dias_solicitado":null ,
//         "p_monto_solicitado": montoSolicitud ,
//         "p_periodo": fechaFinal,
//         "p_dias_pendientes":null
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

/*--------------------------------------------------Consumo de servicios Cards--------------------------------------------------------------- */
  const [card, setCard] = useState([]);
  const [buttonCard, setButtonCard] = useState([]);
  const [itemsCard, setItemsCard] = useState([]);
  const [checkHolidays, setCheckHolidays] = useState([]);
  const [socialBenefits, setSocialBenefits] = useState([]);
  const [iconCard, setIconCard] = useState("notifications")
  const [iconColor, setIconColor] = useState("linear-gradient(60deg,#B16F00,#E78810)");
  const [appColor, setAppColor] = useState("linear-gradient(60deg,#B16F00,#E78810)")
  const [title, setTitle] = useState("")
  const fetchCardDashboard = async () => {
    let dataCardDasboard = await getCardDashboard();
    if (dataCardDasboard?.length !== 0) {
      setCard(dataCardDasboard);
    }
  };

   const handlerIcon =  (icon,color, title) => {
  //  console.log(1, icon)
   setIconCard(icon)
   setIconColor(color)
   setAppColor(color)
   setTitle(title)
  //  console.log(2, iconCard)
  }
  const fetchCardButton = async () => {
    let dataButtomDashbaord = await getCardButtom();
    if(dataButtomDashbaord?.length !== 0){
      setButtonCard(dataButtomDashbaord)
      // console.log("Boton",dataButtomDashbaord)
    }
  }

  const fetchItemsCards = async () => {
    let dataItemsCards = await getItemsCards();
    if(dataItemsCards?.length !==0){
      setItemsCard(dataItemsCards)
    }
  }

  const fetchCheckHolidays = async () => {
    let dataCheckHolidays = await getCheckHolidays();
    if(dataCheckHolidays?.length !==0){
      setCheckHolidays(dataCheckHolidays)
    }
  }

  const fetchSocialBenefits = async () => {
    let dataSocialBenefits = await getSocialBenefits();
    if(dataSocialBenefits?.length !==0){
      setSocialBenefits(dataSocialBenefits)
    }
  }
  /*---------------------------------------------------------------------- */

  const getCardDashboard = async () => {
      try{
        const card = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/sp_card_dashboard`)
          if(card.length !== 0){
              return card.data.c_card_dashboard;
              
          }else{
              return [];
          }
      }
      catch(error)
      {
        console.log(error)
      }
    }
  
  const getCardButtom = async () => {
      try {
          const cardButton = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/sp_card_button`)
          
          if(cardButton.length !==0){
            // console.clear()
            // console.log(7,cardButton.data.c_card_button)
              return cardButton.data.c_card_button;
           
          }else{
              return [];
          }
      } 
      catch (error) {
          console.log(error)
      }
  }

  const getItemsCards = async () => {
    try {
      const itemsCards = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/sp_items_cards`)

      if(itemsCards.length !==0){
        // console.log("Items",itemsCards.data.c_items_cards)
        return itemsCards.data.c_items_cards;
      }else{
        return [];
      }
    } catch (error) {
      console.log(error)
    }
  }
  
    const getVacacionesyPrestaciones = async () => {

      try {
        setOpen(true);
        let dataHeader = []
        // console.log(dataHeader)
        const res = await axios.post(
          "https://segurospiramide.com/asg-api/dbo/intranet/consulta_vacaciones",
          {
            p_cia: 1,
            p_cedula: 11604787,
          }
        );
  
        const res2 = await axios.post(
          "https://segurospiramide.com/asg-api/dbo/intranet/consulta_prestaciones",
          {
            P_CIA: "01",
            P_CEDULA: 11604787,
          }
        );
  
        const prestacionesSociales = await axios.post(
          "https://segurospiramide.com/asg-api/dbo/intranet/sp_consulta_mov_prestaciones",
          {
            P_CIA: "01",
            P_CEDULA: 11604787,
          }
        );
      
  
        dataHeader = {
          ...dataHeader,
          data1: res2.data.P_consulta_prestacion[0].TOTAL_PRESTACIONES,
          data2: res2.data.P_consulta_prestacion[0].DISPONIBLE,
        };
      
        /*----------------------------------------------------------------------------------------------------------------------------------------------- */
      //   let total = 0;
      //   let dis = 0;
      //   for (var item of res.data.p_detalle_vacacion) {
      //     total += item.TOTAL_DIAS_DISFRUTE - item.DIAS_DISFRUTADOS;
      //     dis += item.DIAS_DISFRUTADOS;
      //   }
  
      //   dataHeaderVaca = {
      //     ...dataHeader,
      //     data1: dis,
      //     data2: total,
      //   };
      //   /*------------------------------------------------------------------------------------------------------------------------------------------------------------ */
        // setCards(dataHeader);
        // setDiaPend({ disfrutado: dis, pendientes: total });
        // setPrestaciones(res2.data.P_consulta_prestacion[0]);
        // setPrestacionesSociales(prestacionesSociales.data.P_consulta_prestacion);
        // setDataTablero(res.data.p_detalle_vacacion);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    };

    const getCheckHolidays = async () => {
      try {
        const checkHolidays = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/consulta_vacaciones`, {
          "p_cia": 1,
          "p_cedula": 11604787
        })
        if(checkHolidays.length !==0){
          // console.log(checkHolidays.data.p_detalle_vacacion)
          return {...checkHolidays.data.p_detalle_vacacion[0],
            DASHBOARD_ID: 23 }
        }else{
          return [];
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getSocialBenefits = async () => {

      try {
        const socialBenefits = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/consulta_prestaciones`,{
          "P_CIA": "01",
           "P_CEDULA": 11604787
        })

        if (socialBenefits.length !==0){
          // console.log(socialBenefits.data.P_consulta_prestacion)
          return {...socialBenefits.data.P_consulta_prestacion[0],
                   DASHBOARD_ID: 22  }
        }else{
          return [];
        }
      } catch (error) {
        console.log(error)
      }
     
    }

    useEffect(() => {
      fetchCardDashboard();
      fetchCardButton();
      fetchItemsCards();
      fetchCheckHolidays()
      fetchSocialBenefits()
    }, []);

  return (
    <DataDashboardContext.Provider
      value={{
        open,
        handleOpen,
        modalVac,
        handleOpenModal,
        setModalVac,
        handlePend,
        diapend,
        setDiaPend,
        data,
        setData,
        totalDays,
        setTotalDays,
        getSolicitudesVacaciones,
        setDiaSolicitud,
        fechaFinal,
        setFechaFinal,
        daypend,
        setDayPend,
        observacionSolicitante,
        setObservacionSolicitante,
        setSolicitudVacaciones,
        solicituVaciones,
        DatosSolicitud,
        getConsultaVacaciones,
        setMontoSolicitud,
        tipoSolicitud,
        setTipoSolicitud,
        card,
        buttonCard,
        itemsCard,
        checkHolidays,
        socialBenefits,
        iconCard,
        handlerIcon,
        iconColor,
        appColor,
        title
      }}
    >
      {children}
    </DataDashboardContext.Provider>
  );
};
