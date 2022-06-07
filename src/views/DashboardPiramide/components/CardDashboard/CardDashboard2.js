import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import FindInPageTwoToneIcon from "@material-ui/icons/FindInPageTwoTone";
import Success from "components/Typography/Success.js";
import Icon from '@mui/material/Icon';
import {DataDashboardContext} from "views/DashboardPiramide/context/ContextDashboard"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardBody4,
  Details,
  CardIcon
} from "views/DashboardPiramide/Styles/TableroStyle";
import { useBackdrop } from "Context/ContextBackdrop";
import useDashboardTablero from "hooks/useDashboardCard";


 const CardDashboard2 = ({title, icon, color, button, id}) => {
    const { setOpen } = useBackdrop();
    const { open, handleOpen,handlerIcon } = useContext(DataDashboardContext);
    return (
      <>
        <Card open={open} 
        >
          <CardIcon color={color}>
          <Icon style={{ width: "100%", marginTop: "7px", color: "white" }}>{icon}</Icon>
          </CardIcon>
          <CardHeader open={open}>
            <p>{title}</p>
          </CardHeader>
            <CardBody>
              50
            </CardBody>
          <CardFooter>
            {button.map((item,i)=>{
              if(id === item.DASHBOARD_ID){
                return (
                  <div
                  key={i}
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
                  // style={{cursor:"pointer"}}
                  href="#"
                  onClick={()=> handlerIcon(icon, color, title)}
                >
                  {item.NAME_BUTTON}
                </Details>
              </div>
                )
              }
            })}
          
             
          </CardFooter>
        </Card>
      </>
    );
  };
  export default CardDashboard2;

//   <div
//   style={{
//     display: "grid",
//     marginTop: 8,
//     gridTemplateColumns: "25px 1fr",
//   }}
// >
//   <Success>
//   <Icon>{iconbuttonsecond}</Icon>
//   </Success>
//   <Details
//     href="#"
 
//   >
//     {/* {buttonsecond} */}
//   </Details>
// </div>