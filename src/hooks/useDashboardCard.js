import React,{useState, useEffect} from 'react'
import axios from "axios"
import { useBackdrop } from "Context/ContextBackdrop";
import CONFIG from 'config/config';

const useDashboardCard = () => {
  // const [card, setCard] = useState([]);
  // const [buttonCard, setButtonCard] = useState([]);
  // const [itemsCard, setItemsCard] = useState([]);
  // const [checkHolidays, setCheckHolidays] = useState([]);
  // const [socialBenefits, setSocialBenefits] = useState([]);
  // const [iconCard, setIconCard] = useState("")
/*---------------------------------------------- */
    const [diaPend, setDiaPend] = useState({ data1: 0, data2: 0 });
    const [prestaciones, setPrestaciones] = useState({ total: 0, disponible: 0 });
    const [prestacionesSociales, setPrestacionesSociales] = useState([]);
    const [dataTablero, setDataTablero] = useState([]);
    const { setOpen, open: openbd } = useBackdrop();
    // /*--------------------------------Consumo de Peticiones-------------------------------------- */
    // const fetchCardDashboard = async () => {
    //   let dataCardDasboard = await getCardDashboard();
    //   if (dataCardDasboard?.length !== 0) {
    //     setCard(dataCardDasboard);
    //   }
    // };

    //  const handlerIcon =  (icon) => {
    //  console.log(1, icon)
    //  setIconCard(icon)
    // //  console.log(2, iconCard)
    // }
    // const fetchCardButton = async () => {
    //   let dataButtomDashbaord = await getCardButtom();
    //   if(dataButtomDashbaord?.length !== 0){
    //     setButtonCard(dataButtomDashbaord)
    //     // console.log("Boton",dataButtomDashbaord)
    //   }
    // }
  
    // const fetchItemsCards = async () => {
    //   let dataItemsCards = await getItemsCards();
    //   if(dataItemsCards?.length !==0){
    //     setItemsCard(dataItemsCards)
    //   }
    // }
  
    // const fetchCheckHolidays = async () => {
    //   let dataCheckHolidays = await getCheckHolidays();
    //   if(dataCheckHolidays?.length !==0){
    //     setCheckHolidays(dataCheckHolidays)
    //   }
    // }
  
    // const fetchSocialBenefits = async () => {
    //   let dataSocialBenefits = await getSocialBenefits();
    //   if(dataSocialBenefits?.length !==0){
    //     setSocialBenefits(dataSocialBenefits)
    //   }
    // }
    // /*---------------------------------------------------------------------- */

    // const getCardDashboard = async () => {
    //     try{
    //       const card = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/sp_card_dashboard`)
    //         if(card.length !== 0){
    //             return card.data.c_card_dashboard;
                
    //         }else{
    //             return [];
    //         }
    //     }
    //     catch(error)
    //     {
    //       console.log(error)
    //     }
    //   }
    
    // const getCardButtom = async () => {
    //     try {
    //         const cardButton = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/sp_card_button`)
            
    //         if(cardButton.length !==0){
    //           // console.clear()
    //           // console.log(7,cardButton.data.c_card_button)
    //             return cardButton.data.c_card_button;
             
    //         }else{
    //             return [];
    //         }
    //     } 
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // const getItemsCards = async () => {
    //   try {
    //     const itemsCards = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/sp_items_cards`)

    //     if(itemsCards.length !==0){
    //       // console.log("Items",itemsCards.data.c_items_cards)
    //       return itemsCards.data.c_items_cards;
    //     }else{
    //       return [];
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    
    //   const getVacacionesyPrestaciones = async () => {

    //     try {
    //       setOpen(true);
    //       let dataHeader = []
    //       // console.log(dataHeader)
    //       const res = await axios.post(
    //         "https://segurospiramide.com/asg-api/dbo/intranet/consulta_vacaciones",
    //         {
    //           p_cia: 1,
    //           p_cedula: 11604787,
    //         }
    //       );
    
    //       const res2 = await axios.post(
    //         "https://segurospiramide.com/asg-api/dbo/intranet/consulta_prestaciones",
    //         {
    //           P_CIA: "01",
    //           P_CEDULA: 11604787,
    //         }
    //       );
    
    //       const prestacionesSociales = await axios.post(
    //         "https://segurospiramide.com/asg-api/dbo/intranet/sp_consulta_mov_prestaciones",
    //         {
    //           P_CIA: "01",
    //           P_CEDULA: 11604787,
    //         }
    //       );
        
    
    //       dataHeader = {
    //         ...dataHeader,
    //         data1: res2.data.P_consulta_prestacion[0].TOTAL_PRESTACIONES,
    //         data2: res2.data.P_consulta_prestacion[0].DISPONIBLE,
    //       };
        
    //       /*----------------------------------------------------------------------------------------------------------------------------------------------- */
    //     //   let total = 0;
    //     //   let dis = 0;
    //     //   for (var item of res.data.p_detalle_vacacion) {
    //     //     total += item.TOTAL_DIAS_DISFRUTE - item.DIAS_DISFRUTADOS;
    //     //     dis += item.DIAS_DISFRUTADOS;
    //     //   }
    
    //     //   dataHeaderVaca = {
    //     //     ...dataHeader,
    //     //     data1: dis,
    //     //     data2: total,
    //     //   };
    //     //   /*------------------------------------------------------------------------------------------------------------------------------------------------------------ */
    //       // setCards(dataHeader);
    //       // setDiaPend({ disfrutado: dis, pendientes: total });
    //       // setPrestaciones(res2.data.P_consulta_prestacion[0]);
    //       // setPrestacionesSociales(prestacionesSociales.data.P_consulta_prestacion);
    //       // setDataTablero(res.data.p_detalle_vacacion);
    //       setOpen(false);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   const getCheckHolidays = async () => {
    //     try {
    //       const checkHolidays = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/consulta_vacaciones`, {
    //         "p_cia": 1,
    //         "p_cedula": 11604787
    //       })
    //       if(checkHolidays.length !==0){
    //         // console.log(checkHolidays.data.p_detalle_vacacion)
    //         return {...checkHolidays.data.p_detalle_vacacion[0],
    //           DASHBOARD_ID: 23 }
    //       }else{
    //         return [];
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    //   const getSocialBenefits = async () => {

    //     try {
    //       const socialBenefits = await axios.post(`${CONFIG.endpoints.portal}/dbo/intranet/consulta_prestaciones`,{
    //         "P_CIA": "01",
    //          "P_CEDULA": 11604787
    //       })
  
    //       if (socialBenefits.length !==0){
    //         // console.log(socialBenefits.data.P_consulta_prestacion)
    //         return {...socialBenefits.data.P_consulta_prestacion[0],
    //                  DASHBOARD_ID: 22  }
    //       }else{
    //         return [];
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
       
    //   }

    //   useEffect(() => {
    //     fetchCardDashboard();
    //     fetchCardButton();
    //     fetchItemsCards();
    //     fetchCheckHolidays()
    //     fetchSocialBenefits()
    //   }, []);
  return {
    dataTablero,
    prestacionesSociales,
    prestaciones,
    // card,
    // buttonCard,
    // itemsCard,
    // checkHolidays,
    // socialBenefits,
    // setCard,
    // iconCard,
    // setIconCard,
    // handlerIcon
    // getCardDashboard,
    // getVacacionesyPrestaciones,
    // getCardButtom,
    // getItemsCards,
    // getCheckHolidays,
    // getSocialBenefits
  }
}

export default useDashboardCard