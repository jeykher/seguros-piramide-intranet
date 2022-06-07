import React,{useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';

// @material-ui/icons

import Schedule from "@material-ui/icons/Schedule";
import SportsHandball from "@material-ui/icons/SportsHandball";
import EmojiPeople from "@material-ui/icons/EmojiPeople";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import {DateDiff} from 'utils/dateDiff';
import Carousel from 'react-elastic-carousel'
import "../../../../assets/css/carousel.css"
import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";
import classNames from "classnames";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import styled from "styled-components"
import CONFIG from "config/config";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 80,
    },
    imgFluid: {
      maxWidth: "100%",
      height: "150px",
      
    },
  imgRoundedCircle: {
      borderRadius: "10% !important",
    },
    imgRaised: {
      boxShadow:
        "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    
});

const ImageNew = styled.img`
    position: absolute;
    height: 160px;
    width: 155px;
    z-index: 1;
    left: -24px;
    padding: 40px;
    top: -40px;
`;

export default function SectionPills() {
  const [active, setActive] = useState(0)
  
  const classes = useStyles();
  const classes2 = useStyles2();
  const imageClasses = classNames(
    classes2.imgRaised,
    classes2.imgRoundedCircle,
    classes2.imgFluid
  );

const onChangeTitle = (active) => setActive(active)

/*-----------------------------------------PillsActividades---------------------------------------------------------------- */
  const [dataPillsAct, setDataPillsAct] = useState([{},{},{}]);
  const [loadAct, setLoadAct] = useState(false)

  useEffect(() =>{
    const llamadoPillsAct = async() =>{
      setLoadAct(true)
      const res = await axios.get(`${CONFIG.endpoints.strapi}/pills-actividades`);
      try{
        const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
        console.log(dataOrdenada)
        setDataPillsAct(dataOrdenada)
        setLoadAct(false)
      }catch(error) {

      }      
    }
    if(active === 0) {
      llamadoPillsAct()
    }
    
  },[active])

/*--------------------------------------------PillsJornadas----------------------------------------------------- */
const [dataPillsJornada,setDataPillsJornada] = useState([{},{},{}]); 
const [loadJor, setLoadJor] = useState(false)

useEffect(() =>{
    const llamadoPillsJornada = async() =>{
      setLoadJor(true)
      const res = await axios.get(`${CONFIG.endpoints.strapi}/pills-jornadas`);
      try {
        const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
        setDataPillsJornada(dataOrdenada)
        setLoadJor(false)
      } catch (error) {
        
      }
     
    //   console.log(res.data)
    }
    
    if(active === 1) {
      llamadoPillsJornada()
    }
  },[active])
  /*-------------------------------------------------PillsEventos----------------------------------------------- */
const [dataPillsEvento,setDataPillsEvento] = useState([{},{},{}]);
const [loadEve, setLoadEve] = useState(false)

useEffect(()=>{
    const llamadoPillsEvento = async() =>{
      setLoadEve(true)
        const res = await axios.get(`${CONFIG.endpoints.strapi}/pills-eventos`);
        try{
          const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
          setDataPillsEvento(dataOrdenada)
          setLoadEve(false)
        } catch(error){

        }
        
    }
   if(active === 2) {
    llamadoPillsEvento()
    }
},[active])

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills" style={{ marginTop: "-90px" }}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <NavPills
                color="warning"
                onclick = {onChangeTitle}

                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 2 },
                  contentGrid: { xs: 12, sm: 8, md: 10 },
                }}
                tabs={[
                  {
                    tabButton: "Actividades Recreativas",
                    tabIcon: SportsHandball,
                    // onclick :  onChangeTitle,
                    tabContent: (
                      <div>
                        <GridContainer>
                          <Carousel pagination={false} itemsToShow={3}>
                            {dataPillsAct?.map((data, i) => (
                              <GridItem xs={12} sm={12} md={12}>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className={classes.itemGrid}
                                  style={{ textAlign: "center" }}
                                >
                                  {loadAct ? (<Skeleton variant="rectangular"height={120}/>) : (data.new ? <span><img src={CONFIG.endpoints.strapi + data?.image?.url}alt="..."className={imageClasses} /> <ImageNew src="new.png"/></span>:
                                    <img src={CONFIG.endpoints.strapi + data?.image?.url}alt="..."className={imageClasses} />
                                  )}
                                </GridItem>
                                <CardActionArea>
                                  <CardContent style={{ minHeight: 200 }}>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h5"
                                      style={{ color: "#C15E0A" }}
                                    >
                                      {loadAct ? <Skeleton />: data?.title}
                                    </Typography>

                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{ textAlign: "justify" }}
                                    >
                                      {loadAct ? (
                                        <Skeleton />
                                      ) : data?.description?.length > 50 ? (
                                        data?.description?.substring(0, 200) +
                                        "..."
                                      ) : (
                                        data?.description
                                      )}
                                    </Typography>
                                    <br></br>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      {loadAct ? <Skeleton /> : data?.place}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      {loadAct ? <Skeleton /> : data?.day}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions
                                  style={{ float: "right", marginTop: "-20px" }}
                                >
                                  {loadAct ? (
                                    <Skeleton width={50} />
                                  ) : data.url == "" ? (
                                    <Button
                                      href={data.url}
                                      style={{ textTransform: "none" }}
                                      color="primary"
                                    >
                                      Próximamente.
                                    </Button>
                                  ) : (
                                    <Button
                                      href={data.url}
                                      style={{ textTransform: "none" }}
                                      color="primary"
                                    >
                                      Ver Galería.
                                    </Button>
                                  )}
                                </CardActions>
                              </GridItem>
                            ))}
                          </Carousel>
                        </GridContainer>
                      </div>
                    ),
                  },
                  {
                    tabButton: "Jornadas Especiales",
                    tabIcon: EmojiPeople,
                    // onclick : () => onChangeTitle,
                    tabContent: (
                      <div>
                        <GridContainer>
                          <Carousel pagination={false} itemsToShow={3}>
                            {dataPillsJornada?.map((data, i) => (
                              <GridItem xs={12} sm={12} md={12}>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className={classes.itemGrid}
                                  style={{ textAlign: "center" }}
                                >
                                  {loadJor ? (<Skeleton variant="rectangular"height={120}/>) : (data.new ? <span><img src={CONFIG.endpoints.strapi + data?.image?.url}alt="..."className={imageClasses} /> <ImageNew src="new.png"/></span>:
                                    <img src={CONFIG.endpoints.strapi + data?.image?.url}alt="..."className={imageClasses} />
                                  )}
                                </GridItem>
                                <CardActionArea>
                                  <CardContent style={{ minHeight: 250 }}>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h5"
                                      style={{ color: "#C15E0A" }}
                                    >
                                      {loadJor ? <Skeleton /> : data?.title}
                                    </Typography>

                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{ textAlign: "justify" }}
                                    >
                                      {loadJor ? (
                                        <Skeleton />
                                      ) : data?.description?.length > 50 ? (
                                        data?.description?.substring(0, 200) +
                                        "..."
                                      ) : (
                                        data?.description
                                      )}
                                    </Typography>
                                    <br></br>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      {loadJor ? <Skeleton /> : data?.place}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      {loadJor ? <Skeleton /> : data?.day}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      .
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions
                                  style={{ float: "right", marginTop: "-20px" }}
                                >
                                  {loadJor ? (
                                    <Skeleton width={50} />
                                  ) : data.url == "" ? (
                                    <Button
                                      href={data.url}
                                      style={{ textTransform: "none" }}
                                      color="primary"
                                    >
                                      Próximamente.
                                    </Button>
                                  ) : (
                                    <Button
                                      href={data.url}
                                      style={{ textTransform: "none" }}
                                      color="primary"
                                    >
                                      Ver Galería.
                                    </Button>
                                  )}
                                </CardActions>
                              </GridItem>
                            ))}
                          </Carousel>
                        </GridContainer>
                      </div>
                    ),
                  },
                  {
                    tabButton: "Eventos",
                    tabIcon: Schedule,
                    // onclick : () => onChangeTitle,
                    tabContent: (
                      <div>
                        <GridContainer>
                          <Carousel pagination={false} itemsToShow={3}>
                            {dataPillsEvento?.map((data, i) => (
                              <GridItem xs={12} sm={12} md={12}>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className={classes.itemGrid}
                                  style={{ textAlign: "center" }}
                                >
                                  {loadEve ? (
                                    <Skeleton
                                      variant="rectangular"
                                      height={120}
                                    />
                                  ) : (data.new ? <span><img src={CONFIG.endpoints.strapi + data?.image?.url}alt="..."className={imageClasses} /> <ImageNew src="new.png"/></span>:
                                  <img src={CONFIG.endpoints.strapi + data?.image?.url}alt="..."className={imageClasses} />
                                )}
                                </GridItem>
                                <CardActionArea>
                                  <CardContent style={{ minHeight: 260 }}>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h5"
                                      style={{ color: "#C15E0A" }}
                                    >
                                      {loadEve ? <Skeleton /> :data?.title}
                                    </Typography>

                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{ textAlign: "justify" }}
                                    >
                                      {loadEve ? (
                                        <Skeleton />
                                      ) : data?.description?.length > 50 ? (
                                        data?.description?.substring(0, 200) +
                                        "..."
                                      ) : (
                                        data?.description
                                      )}
                                    </Typography>
                                    <br></br>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      {loadEve ? <Skeleton /> : data?.place}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      {loadEve ? <Skeleton /> : data?.day}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{
                                        fontSize: "11px",
                                        textAlign: "right",
                                      }}
                                    >
                                      .
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions
                                  style={{ float: "right", marginTop: "-20px" }}
                                >
                                  {loadEve ? (
                                    <Skeleton width={50} />
                                  ) : data.url == "" ? (
                                    <Button
                                      href={data.url}
                                      style={{ textTransform: "none" }}
                                      color="primary"
                                    >
                                      Próximamente.
                                    </Button>
                                  ) : (
                                    <Button
                                      href={data.url}
                                      style={{ textTransform: "none" }}
                                      color="primary"
                                    >
                                      Ver Galería.
                                    </Button>
                                  )}
                                </CardActions>
                              </GridItem>
                            ))}
                          </Carousel>
                        </GridContainer>
                      </div>
                    ),
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
