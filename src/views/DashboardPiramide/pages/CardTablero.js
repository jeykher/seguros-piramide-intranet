import React, { useState, useContext, useEffect } from "react";
import { useBackdrop } from "Context/ContextBackdrop";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@material-ui/core";
// import useDashboardTablero from "hooks/useDashboardCard";
import {DataDashboardContext} from "views/DashboardPiramide/context/ContextDashboard"
import CardDashboard1 from "views/DashboardPiramide/components/CardDashboard/CardDashBoard";
import CardDashboard2 from "views/DashboardPiramide/components/CardDashboard/CardDashboard2";
const Tablero = () => {
    const {
      card,
      buttonCard,
      itemsCard,
      checkHolidays,
      socialBenefits,
      iconCard,
    } = useContext(DataDashboardContext);
  const { setOpen, open: openbd } = useBackdrop();

  return (
    <>
      {card
        ?.sort((a, b) => a.ORDER_TO_SHOW - b.ORDER_TO_SHOW)
        ?.map((item, i) => {
          let cardTemporal = null;
          if (item.TYPE_CARD == 1) {
            cardTemporal = (
              <CardDashboard2
                id={item.DASHBOARD_ID}
                title={item.TITLE}
                icon={item.ICON}
                color={item.COLOR}
                button={buttonCard}
                label={itemsCard}
              />
            );
          } else {
            cardTemporal = (
              <CardDashboard1
                id={item.DASHBOARD_ID}
                title={item.TITLE}
                icon={item.ICON}
                color={item.COLOR}
                button={buttonCard}
                label={itemsCard}
                holidays={checkHolidays}
                benefits={socialBenefits}
                menu={item.ITEM}
                menu2={item.ITEM2}
              />
            );
          }
          return <>{cardTemporal}</>;
        })}
    </>
  );
};

export default Tablero;
