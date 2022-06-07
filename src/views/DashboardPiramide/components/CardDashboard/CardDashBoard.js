import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import FindInPageTwoToneIcon from "@material-ui/icons/FindInPageTwoTone";
import ArticleIcon from '@mui/icons-material/Article';
import Success from "components/Typography/Success.js";
import Icon from '@mui/material/Icon';
import {DataDashboardContext} from "views/DashboardPiramide/context/ContextDashboard"
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody4,
  Details,
  History,
  CardIcon
} from "views/DashboardPiramide/Styles/TableroStyle";
import { useBackdrop } from "Context/ContextBackdrop";
import useDashboardTablero from "hooks/useDashboardCard";


 const CardDashboard = ({title,icon,color, button, id, label, holidays, benefits}) => {
  const { setOpen } = useBackdrop();
  const { open, handleOpen,handlerIcon } = useContext(DataDashboardContext);
  return (
    <>
      <Card open={open} 
      >
        <CardIcon color={color}>
          <Icon style={{ width: "100%", marginTop: "7px", color: "white" }}>{icon}</Icon>
          </CardIcon>
        {/* {icon} */}
        <CardHeader open={open}>
          <p>{title}</p>
        </CardHeader>
          <CardBody4>
            {label.map((item,i)=>{
              // console.log("holidays dentro del map",dataHolidays)
              if(id === item.DASHBOARD_ID){
                return(
                  <>
                  <div>
                  <p style={{ textAlign: "left" }}>
                    {item.LABEL}:
                    </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p>
                    {id === 23 && item.LABEL === "Dias Pendientes" ? holidays.DIAS_PENDIENTES : null}
                    {id === 23 && item.LABEL === "Dias Disfrutados" ? holidays.DIAS_DISFRUTADO : null}
                    {id === 22 && item.LABEL === "Total Aporte" ? benefits.TOTAL_PRESTACIONES : null}
                    {id === 22 && item.LABEL === "Saldo Disponible" ? benefits.DISPONIBLE : null}
                    </p>
                </div>
                </>
                )
              }
          })}
          </CardBody4>
        <CardFooter>
            <>
            {button.map((item,i)=>{
              if(id === item.DASHBOARD_ID){
                return (
                  <div
                style={{
                  display: "grid",
                  marginTop: 8,
                  gridTemplateColumns: "25px 1fr",
                }}
              >
                <Success>
                <Icon>{item.ICON_BUTTON}</Icon>
                </Success>
                <Details
                  href="#"
                 onClick={()=> handlerIcon(icon, color, title)}
                >
                  {item.NAME_BUTTON}
                </Details>
              </div>
                )
                
              }
            })}
            </> 
        </CardFooter>
      </Card>
    </>
  );
};

export default CardDashboard;

//  <div
//                   style={{
//                     display: "grid",
//                     marginTop: 8,
//                     gridTemplateColumns: "25px 1fr",
//                   }}
//                 >
//                   <Success>
//                   <Icon>{iconbuttonsecond}</Icon>
//                   </Success>
//                   <History
//                     href="#"
                    
//                   >
//                     {/* {buttonsecond} */}
//                   </History>
//                 </div>