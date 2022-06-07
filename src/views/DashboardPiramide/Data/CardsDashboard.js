import React, {useState, useEffect} from 'react'
import { CardIcon, CardIcon2, CardIcon3, CardIcon4} from 'views/DashboardPiramide/Styles/TableroStyle'
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MessageTwoToneIcon from "@material-ui/icons/MessageTwoTone";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";


export const dataHeader = [
    {
      id:1,
      title:"Total Prestaciones Sociales",
      icon: (<CardIcon><NotificationsActiveIcon style={{ width: "100%", marginTop: "7px", color: "white" }}/></CardIcon>),
      total: "50",
      styleCard:"linear-gradient(60deg,#b16f00,#e78810)",
      api:'',
      button: "linear-gradient(60deg,#b16f00,#e78810)"
    },
    {
      id:2,
      title:"Total Vacaciones Solicitadas",
      icon: (<CardIcon2><MessageTwoToneIcon style={{ width: "100%", marginTop: "7px", color: "white" }}/></CardIcon2>),
      total: "65",
      styleCard:"linear-gradient(60deg,#234d25,#43a047)",
      api:'',
      button: "linear-gradient(60deg,#234d25,#43a047)"
    },
    {
      id:3,
      title:"Prestaciones Sociales",
      icon: (<CardIcon3><MonetizationOnTwoToneIcon style={{ width: "100%", marginTop: "7px", color: "white" }}/></CardIcon3>),
      labeltitle: "Total Aporte:",
      styleCard:"linear-gradient(60deg,#822927,#e53935)",
      labeltitle2: "Saldo Disponible:",
      api:'sp_consulta_mov_prestaciones',
      button: "linear-gradient(60deg,#959595,#d40a0a)"
  
    },
    {
      id:4,
      title:"Vacaciones",
      icon: (<CardIcon4><BeachAccessIcon style={{ width: "100%", marginTop: "7px", color: "white" }}/></CardIcon4>),
      labeltitle: "Dias Pendientes:",
      styleCard:"linear-gradient(60deg,#3b516d,#00acc1)",
      labeltitle2: "Dias Disfrutados:",
      api:'consulta_vacaciones',
      button: "linear-gradient(60deg,#3b516d,#00acc1)"
    },
  ]