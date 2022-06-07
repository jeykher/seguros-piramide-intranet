import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Info from "components/Typography/Info.js";
import Primary from "components/Typography/Primary.js";
import Success from "components/Typography/Success.js";
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import MessageTwoToneIcon from '@material-ui/icons/MessageTwoTone';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import ReactTables from "../Tables/ReactTables";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import "../../assets/css/portalGestion.css"

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

const us_flag = require("assets/img/flags/US.png").default;
const de_flag = require("assets/img/flags/DE.png").default;
const au_flag = require("assets/img/flags/AU.png").default;
const gb_flag = require("assets/img/flags/GB.png").default;
const ro_flag = require("assets/img/flags/RO.png").default;
const br_flag = require("assets/img/flags/BR.png").default;

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const useStyles = makeStyles(styles);



export default function Dashboard() {
  const classes = useStyles();
  
  return (
    <div style={{marginTop:-40}}>
      <GridContainer >
        <GridItem xs={12} sm={6} md={6} lg={3} >
        
          <Card style={{height:"120px"}}>
            <CardHeader  stats icon>
            <CardIcon color="warning">
                <NotificationsActiveIcon style={{color:"white"}}/>
              </CardIcon>
              <p className={classes.cardCategory}>Prestaciones Solicitadas</p>
              <h3 className={classes.cardTitle}>
                50 
              </h3>
            </CardHeader>
            <CardFooter stats style={{marginTop:"-20px"}}>
              <div className={classes.stats}>
                <Success>
                  <FindInPageTwoToneIcon />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{color:"dodgers"}}>
                  Ver Detalle
                </a>
              </div>
            </CardFooter>
          </Card>
       
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card style={{height:"120px"}}>
            <CardHeader  stats icon>
              <CardIcon color="success">
                <MessageTwoToneIcon style={{color:"white"}}/>
              </CardIcon>
              <p className={classes.cardCategory} >Vacaciones Solicitadas</p>
              <h3 className={classes.cardTitle}>
                5 
              </h3>
            </CardHeader>
            <CardFooter stats style={{marginTop:"-20px"}}>
              <div className={classes.stats}>
                <Success>
                  <FindInPageTwoToneIcon />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{color:"dodgers"}}>
                  Ver Detalle
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card style={{height:"120px"}}>
            <CardHeader  stats icon>
              <CardIcon color="danger">
              <MonetizationOnTwoToneIcon style={{color:"white"}}/>
                
              </CardIcon>
              <p className={classes.cardCategory}>Prestaciones Sociales</p>

              <GridContainer style={{display:"flex",width:"130%"}}>
                <GridItem md={5}>
                      <span style={{fontSize:"9px",fontWeight:600}}> Disponible:  </span>
                      
                </GridItem>
                <GridItem md={7}>
                <span style={{fontSize:"9px",float:"right",fontWeight:600}}> 1.500.632,38 </span>
                    
                </GridItem>
                <GridItem md={5}>
                      <span style={{fontSize:"9px",fontWeight:600}}> Disponible 70%  </span>
                      
                </GridItem>
                <GridItem md={7}>
                <span style={{fontSize:"9px",float:"right",fontWeight:600}}>700.632,38 </span>
                    
                </GridItem>
              </GridContainer>
             
            </CardHeader>
            <CardFooter stats style={{marginTop:"-20px"}}>
            <GridContainer spacing={3}>
                <GridItem  xs={12} sm={6} md={6} lg={5}>
                <div className={classes.stats}>
                <Success>
                  <FindInPageTwoToneIcon />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{color:"dodgers"}}>
                  Solicitar
                </a>
               
                </div>
                
                </GridItem>
                <GridItem  xs={12} sm={6} md={6} lg={7}>
                <div className={classes.stats}>
                <Success>
                  <FindInPageTwoToneIcon />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{color:"dodgers"}}>
                  Ver Historial
                </a>
               
                </div>
               
                </GridItem>

              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card style={{height:"120px"}}>
            <CardHeader  stats icon>
              {/* <CardIcon color="info">
                <i style={{color:"white"}} className="fab fa-twitter" />
              </CardIcon> */}
              <CardIcon color="info">
                <BeachAccessIcon style={{color:"white"}}/>
              </CardIcon>
              <p className={classes.cardCategory}>Vacaciones Solicitadas</p>
              <GridContainer style={{display:"flex",width:"130%"}}>
                <GridItem md={6}>
                      <span style={{fontSize:"9px",fontWeight:600}}> Dias Pendientes:  </span>
                      
                </GridItem>
                <GridItem md={6}>
                <span style={{fontSize:"9px",float:"right",fontWeight:600}}> 45 </span>
                    
                </GridItem>
                <GridItem md={5}>
                      <span style={{fontSize:"9px",fontWeight:600}}>Estatus:  </span>
                      
                </GridItem>
                <GridItem md={7}>
                <span style={{fontSize:"9px",float:"right",fontWeight:600}}>Pendiente por Aprobar </span>
                    
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardFooter stats style={{marginTop:"-20px"}}>
              <GridContainer spacing={3}>
                <GridItem  xs={12} sm={6} md={6} lg={5}>
                <div className={classes.stats}>
                <Success>
                  <FindInPageTwoToneIcon />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{color:"dodgers"}}>
                  Solicitar
                </a>
               
                </div>
                
                </GridItem>
                <GridItem  xs={12} sm={6} md={6} lg={7}>
                <div className={classes.stats}>
                <Success>
                  <FindInPageTwoToneIcon />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{color:"dodgers"}}>
                  Ver Historial
                </a>
               
                </div>
               
                </GridItem>

              </GridContainer>
            
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader   className="PanelWarning"  color="warning" icon  style={{height:"50px"}}>
              <CardIcon color="warning" style={{marginTop:-14}}>
                <Language />
              </CardIcon>
              <h4 className={classes.cardIconTitle} style={{marginTop:-5,fontWeight:500,marginLeft:60}}>
                Prestaciones Sociales Solicitadas
              </h4>
            </CardHeader>
            <CardBody>
            <ReactTables />

             
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    
      
    </div>
  );
}
