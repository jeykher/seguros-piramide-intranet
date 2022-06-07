import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Carousel from "react-elastic-carousel";
import "../../../../assets/css/carousel.css";
import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";
import CakeIcon from "@material-ui/icons/Cake";
import GradeIcon from "@material-ui/icons/Grade";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Card, TableHead } from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import Table from "../../../../components/Table/Table.js";
import classNames from "classnames";
import CardHeader from "components/Card/CardHeader.js";
import cardBlog4 from "assets/img/Graduando/image1.png";
import Info from "components/Typography/Info.js";
import axios from "axios";
import styled from 'styled-components';
import { get } from "react-scroll/modules/mixins/scroller";

import CONFIG from "config/config";
import { FaGalacticSenate } from "react-icons/fa";

const TitleHead = styled.div`
  
table>thead>tr>th{
  color:white !important;
  font-weight: 800px;

}
`;

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
    borderRadius: "50% !important",
    height: "60px !important",
    width: "60px !important",
  },
  imgRoundedCircleLarge: {
    borderRadius: "50% !important",
    height: "120px !important",
    width: "120px !important",
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
});

export default function SectionPills() {
  const [active, setActive] = useState(0)
  const [arrTable, setArrTable] = useState([{},{},{}]);
  const classes = useStyles();
  const classes2 = useStyles2();
  const imageClasses = classNames(
    classes2.imgRaised,
    classes2.imgRoundedCircle,
    classes2.imgFluid
  );

  const onChangeTitle = (active) => setActive(active)


  /*--------------------------------------------------------------PillsCumpleaños------------------------------------------------------------ */
  // const [dataPillsCumpleaños, setDataPillsCumpleaños] = useState([{},{},{}]);
  const [loadCumpleanos, setLoadCumpleanos] = useState(false)

  useEffect(() => {
    const llamadoPillsCumpleaños = async () => {
      setLoadCumpleanos(true)
      const res = await axios.post(
        `${CONFIG.endpoints.portal}dbo/intranet/devuelve_cumpleanios`
      );
      try{
        setArrTable(res.data?.c_cumple);
        setLoadCumpleanos(false)
      }catch(error){

      }     
    };
    if(active === 0) {
      llamadoPillsCumpleaños();
    }
    
  }, [active]);
  /*--------------------------------------------------------------PillsPromocion-------------------------------------------------------- */
  const [dataPillsPromociones, setDataPillsPromociones] = useState([{},{},{},{}]);
  const [loadPromocion, setLoadPromocion] = useState(false)

  useEffect(() => {
    const llamadoPillsPromociones = async () => {
      setLoadPromocion(true)
      const res = await axios.get(
        `${CONFIG.endpoints.strapi}/pills-promociones`
      );

      try{
        const dataOrdenada = res.data.sort((a, b) => a.order_section - b.order_section);
        setDataPillsPromociones(dataOrdenada);
        setLoadPromocion(false)

      }catch(error){

      }
     
    };
    if(active === 1) {
      llamadoPillsPromociones();
    }
    
  }, [active]);
  /*---------------------------------------------------------------PillsGraduaciones------------------------------------------------------ */
  // const [dataPillsGraduaciones, setDataPillsGraduaciones] = useState([{}]);
  // const [loadGraduacion, setLoadGraduacion] = useState(false)

  // useEffect(() => {
  //   const llamadoPillsGraduaciones = async () => {
  //     setLoadGraduacion(true)
  //     const res = await axios.get(
  //       `${CONFIG.endpoints.strapi}/pills-graduaciones`
  //     );
  //     try{
  //       let result = []
  //     console.log('promociones: ', res.data)
  //     var i =0;
  //     for (const item of res.data) {
  //       for (const key in  item) {
  //         if (key.search('list') !== -1) {
  //           item[key] = item[key].split('\n-')
  //         }
  //         i++;
  //       }
  //     }
  //     setDataPillsGraduaciones(res.data);
  //     setLoadGraduacion(false)
  //     }catch(error){

  //     }
      
  //   };
  //   if(active === 2) {
  //     llamadoPillsGraduaciones();
  //   }
    
  // }, [active]);
/*-------------------------------------------------------------PillsPromocionesTitle----------------------------------------------------------- */
const [datapromociontitle, setDataPromocionTitle] = useState([]);
const [loadPromocionTitle, setLoadPromocionTitle] = useState(false)

useEffect(()=>{
  const llamadoPillsPromocionesTitle = async () =>{
    setLoadPromocionTitle(true)
    const res = await axios.get(
      `${CONFIG.endpoints.strapi}/pills-promociones-titles`
    );
    try{
      setDataPromocionTitle(res.data)
      setLoadPromocionTitle(false)
    }catch(error){

    }
   
  };
  if(active === 1) {
    llamadoPillsPromocionesTitle();
  }
},[active])

/*--------------------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills" style={{ marginTop: "-90px" }}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <NavPills
                color="warning"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 2 },
                  contentGrid: { xs: 12, sm: 8, md: 10 },
                }}
                onclick = {onChangeTitle}
                tabs={[
                  {
                    tabButton: "Cumpleaños",
                    tabIcon: CakeIcon,
                    tabContent: (
                      <div className={classes.container}>
                        <Card plain>
                          <CardBody plain>
                            <TitleHead>
                            <Table
                              tableHead={[
                                "",
                                "",
                                "NOMBRE",
                                "FECHA",
                              ]}
                              tableData={arrTable.map((data, i) => {
                                return [
                                  "",
                                  <div className={classes.imgContainer} key={i}>
                                    {
                                      loadCumpleanos ? <Skeleton variant='rectangular' width={50} height={60} /> : <img
                                      src="images.png"
                                      className={classes2.imgRoundedCircle}
                                      alt="..."
                                    />
                                    }
                                  </div>,
                                  <div>{loadCumpleanos ? <Skeleton width={200} /> :data?.NOMBRE_COMPLETO}</div>,
                                
                                  <div>{loadCumpleanos ? <Skeleton width={100} /> :data?.CUMPLE}</div>,
                                ];
                              })}
                              tableShopping
                              customHeadCellClasses={[
                                classes.textCenter,
                                classes.description,
                                classes.description,
                                classes.textRight,
                                classes.textRight,
                                classes.textRight,
                              ]}
                              customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                              customCellClasses={[
                                classes.tdName,
                                classes.customFont,
                                classes.customFont,
                                classes.tdNumber,
                                classes.tdNumber +
                                  " " +
                                  classes.tdNumberAndButtonGroup,
                                classes.tdNumber + " " + classes.textCenter,
                              ]}
                              customClassesForCells={[1, 2, 3, 4, 5, 6]}
                            />
                            </TitleHead>
                          </CardBody>
                        </Card>
                      </div>
                    ),
                  },
                  {
                    tabButton: "Promociones",
                    tabIcon: GradeIcon,
                    tabContent: (
                      <div>
                        <small
                          className={classes.smallTitle}
                          style={{
                            fontWeight: 700,
                            color: "#29201d  !important",
                          }}
                        ></small>
                        {datapromociontitle?.map((data,i)=>(
                        <p id="TitleTabPromociones">
                          {loadPromocionTitle ?<Skeleton/> :data?.title}
                        </p>
                        ))}
                        <GridContainer>
                          <Carousel
                            pagination={false}
                            itemsToShow={4}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "10%",
                            }}
                          >
                            {dataPillsPromociones?.map((data, i) => (
                              <GridItem
                                xs={12}
                                sm={12}
                                md={12}
                                style={{ marginTop: 40 }}
                              >
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className={classes.itemGrid}
                                  style={{display:"flex", justifyContent:"center"}}
                                >
                                  {
                                    loadPromocion ? <Skeleton variant="rectangular" widht={120} height={70}/> : <img
                                    src={
                                      CONFIG.endpoints.strapi + data?.avatar?.url
                                    }
                                    alt="..."
                                    className={classes2.imgRoundedCircleLarge}
                                    style={{display:"flex", justifyContent:"center"}}
                                  />
                                  }
                                </GridItem>
                                <h4
                                  className={classes.cardTitle}
                                  style={{ textAlign: "center" }}
                                >
                                  <small
                                    className={classes.smallTitle}
                                    style={{
                                      fontWeight: 700,
                                      color: "#29201d  !important",
                                    }}
                                  >
                                    {loadPromocion ? <Skeleton/> :data?.name}
                                  </small>
                                  <br />
                                  <small
                                    className={classes.smallTitle}
                                    style={{ fontSize: 12 }}
                                  >
                                    {loadPromocion ?<Skeleton/> :data?.post}
                                  </small>
                                  <br />
                                  <small className={classes.smallTitle}>
                                    {loadPromocion ?<Skeleton/>:data?.date}
                                  </small>
                                </h4>
                              </GridItem>
                            ))}
                          </Carousel>
                        </GridContainer>
                      </div>
                    ),
                  },
                  // {
                  //   tabButton: "Graduaciones",
                  //   tabIcon: TrendingUpIcon,
                  //   tabContent: (
                  //     <div className={classes.blog}>
                  //       <div className={classes.container}>
                  //         <GridContainer>
                  //           {dataPillsGraduaciones.map((data, i) => (
                  //             <GridItem
                  //               xs={12}
                  //               sm={10}
                  //               md={10}
                  //               className={
                  //                 classes.mlAuto + " " + classes.mrAuto
                  //               }
                  //             >
                  //               <Card
                  //                 plain
                  //                 blog
                  //                 className={classes.card}
                  //                 style={{ width: "125%" }}
                  //               >
                  //                 <GridContainer >
                  //                   <GridItem xs={12} sm={5} md={5}>
                  //                     <CardHeader image plain>
                  //                       <a
                  //                         href="#pablito"
                  //                         onClick={(e) => e.preventDefault()}
                  //                       >
                  //                         {
                  //                           loadGraduacion ?<Skeleton height={320}/> :  <img
                  //                           src={
                  //                             CONFIG.endpoints.strapi + data?.image?.url
                  //                           }
                  //                           alt="..."
                  //                           style={{
                  //                             height: "320px",
                  //                             padding: "10px",
                  //                             marginTop: "5px",
                  //                             marginLeft: "10px",
                  //                             borderRadius: "10px",
                  //                           }}
                  //                         />
                  //                         }
                  //                       </a>
                  //                       <div
                  //                         className={classes.coloredShadow}
                  //                         style={{
                  //                           backgroundImage: `url(${cardBlog4})`,
                  //                           opacity: "1",
                  //                           borderRadius: "10",
                  //                         }}
                  //                       />
                  //                     </CardHeader>
                  //                   </GridItem>
                  //                   <GridItem xs={12} sm={7} md={7}> 
                  //                     <Info >
                  //                     <p
                  //                       className={classes.author}
                  //                       style={{
                  //                         float: "right",
                  //                         marginRight: "10px",
                  //                         fontSize: "11px",
                  //                       }}
                  //                     >
                  //                       {
                  //                         loadGraduacion ?<Skeleton width={50}/> : data?.date
                  //                       }
                  //                     </p>
                  //                       <h4
                  //                         className={classes.cardCategory}
                  //                         style={{
                  //                           marginTop: "20px",
                  //                           fontWeight: 700,
                  //                           color: "#b11616",
                  //                         }}
                  //                       >
                  //                         {loadGraduacion ? <Skeleton width={100}/>:data?.title}
                  //                       </h4>
                  //                     </Info>
                  //                     <h3
                  //                       className={classes.cardTitle}
                  //                       style={{ marginTop: "-5px" }}
                  //                     >
                  //                       <a
                  //                         href="#pablo"
                  //                         onClick={(e) => e.preventDefault()}
                  //                       >
                  //                         {loadGraduacion ?<Skeleton width={120}/> :data?.subtitle}
                  //                       </a>
                  //                     </h3>
                  //                     <p
                  //                       className={classes.description1}
                  //                       style={{ marginTop: "-5px" }}
                  //                     >
                  //                       {loadGraduacion ?<Skeleton /> : data?.description}
                  //                     </p>
                  //                     <p
                  //                       className={classes.description1}
                  //                       style={{ marginTop: "-10px" }}
                  //                     >
                  //                       { loadGraduacion ?<Skeleton /> :data?.textlist}
                  //                     </p>
                                      
                  //                     <GridContainer>
                  //                       <GridItem xs={12} sm={3} md={3}>
                  //                         <ul
                  //                           style={{
                  //                             fontSize: "9px",
                  //                             marginTop: "-10px",
                  //                           }}
                  //                         >
                  //                           { loadGraduacion ?<Skeleton/> :
                  //                             data?.list1?.map((key, item) => (
                  //                               item === 0?<li style={{listStyle:'none'}}><b>{key}</b></li>:key?.length > 0 && <li>{key}</li>
                  //                             ))
                  //                           }
                                            
                  //                         </ul>
                  //                       </GridItem>
                  //                       <GridItem
                  //                         xs={12}
                  //                         sm={3}
                  //                         md={3}
                  //                         style={{ marginLeft: "-10px" }}
                  //                       >
                  //                         <ul
                  //                           style={{
                  //                             fontSize: "9px",
                  //                             marginTop: "-10px",
                  //                           }}
                  //                         >
                  //                           {
                  //                             loadGraduacion ?<Skeleton/> :
                  //                             data?.list2?.map((key, item) => (
                  //                               item === 0?<li style={{listStyle:'none'}}><b>{key}</b></li>:key?.length > 0 && <li>{key}</li>
                  //                             ))
                  //                           }
                  //                         </ul>
                  //                       </GridItem>
                  //                       <GridItem
                  //                         xs={12}
                  //                         sm={3}
                  //                         md={3}
                  //                         style={{ marginLeft: "-10px" }}
                  //                       >
                  //                         <ul
                  //                           style={{
                  //                             fontSize: "9px",
                  //                             marginTop: "-10px",
                  //                           }}
                  //                         >
                  //                           {
                  //                             loadGraduacion ?<Skeleton/> :
                  //                             data?.list3?.map((key, item) => (
                  //                               item === 0?<li style={{listStyle:'none'}}><b>{key}</b></li>:key?.length > 0 && <li>{key}</li>
                  //                             ))
                  //                           }
                  //                         </ul>
                  //                       </GridItem>
                  //                       <GridItem
                  //                         xs={12}
                  //                         sm={3}
                  //                         md={3}
                  //                         style={{ marginLeft: "-10px" }}
                  //                       >
                  //                         <ul
                  //                           style={{
                  //                             fontSize: "9px",
                  //                             marginTop: "-10px",
                  //                           }}
                  //                         >
                  //                           {
                  //                             loadGraduacion ?<Skeleton/> :
                  //                             data?.list4?.map((key, item) => (
                  //                               item === 0?<li style={{listStyle:'none'}}><b>{key}</b></li>:key?.length > 0 && <li>{key}</li>
                  //                             ))
                  //                           }
                  //                         </ul>
                                          
                  //                       </GridItem>
                                        
                  //                     </GridContainer>
                  //                     <hr color="#b11616" style={{marginBottom: 5, marginTop:5}}/>
                  //                     <GridContainer>
                  //                       <GridItem md={6}>
                  //                         {
                  //                           loadGraduacion ?<Skeleton/> :  <a
                  //                           href={data?.url}
                  //                           style={{ fontSize: "11px", float: "right" }}
                  //                         >
                  //                           {" "}
                  //                           Ver Galería de Imágenes{" "}
                  //                         </a>
                  //                         }
                                       
                  //                     </GridItem>
                  //                     <GridItem md={6}>
                  //                       {
                  //                         loadGraduacion ?<Skeleton/> :  <a
                  //                         href={data?.urlvideo}
                  //                         style={{ fontSize: "11px", float: "right", marginRight:70}}
                  //                       >
                  //                         {" "}
                  //                         Ver Videos{" "}
                  //                       </a>
                  //                       }
                                     
                  //                     </GridItem>
                  //                     </GridContainer>
                                      
                  //                   </GridItem>
                  //                 </GridContainer>
                  //               </Card>
                  //             </GridItem>
                  //           ))}
                  //         </GridContainer>
                  //       </div>
                  //     </div>
                  //   ),
                  // },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
