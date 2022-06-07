import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Button from "@material-ui/core/Button";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import {DateDiff} from 'utils/dateDiff';

import Carousel from "react-elastic-carousel";
//import "../../../assets/css/carousel.css";
import styled from "styled-components"
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import axios from "axios";
import {Link} from "react-router-dom"
import Skeleton from '@mui/material/Skeleton';

import CONFIG from "config/config";

const Parrafo = styled.div`
p{
  height: 100px !important;
}
`;

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  /*-------------------Gestion Humana----------------------- */
  const [dataGestionHumanaSection, setDataGestionHumanaSection] = useState([{},{},{},{}]);
  const [load, setLoad] = useState(false)

  useEffect(() => {

    const llamadoGestionHumanaSection = async () => {
      setLoad(true)
      const res = await axios.get(`${CONFIG.endpoints.strapi}/gestion-humanas`);
      
      try{
        const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
        setDataGestionHumanaSection(dataOrdenada);
        setLoad(false)
      } catch(error) {

      }

      // console.log('ver valor *******' + JSON.stringify(dataOrdenada))
    };
    llamadoGestionHumanaSection();
  }, []);
  return (
    <div className={classes.title2}>
      <GridContainer justify="center">
        <GridItem
          xs={12}
          sm={12}
          md={8}
          style={{ marginTop: "-100px !important" }}
        >
          <h2 className={classes.title}>{load?<Skeleton />:'Gestión Humana'}</h2>
          <h5 className={classes.description} style={{ color: "#29201d" }}>
          {load?<Skeleton />:'La gestión humana es el conjunto de actividades orientadas a la coordinación del recurso humano que forma parte de una organización para potenciarlo y optimizar su desempeño en pro de alcanzar los objetivos.'}
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer >
          <Carousel  pagination={false} itemsToShow={4}>
            {dataGestionHumanaSection?.map((data, i) => (
              <GridItem xs={12} sm={12} md={12} >
                {/* La seccion para modificar los estilos de los iconos esta en el componente InfoArea */}
                <Parrafo>
                <InfoArea
                load={load}
                newPublic={data.new}
                  title={load?<Skeleton />: data?.title}
                  description={load?<Skeleton />:data?.description?.length > 50 ? data.description.substring(0,200)+"..." : data?.description}
                  img={load?<Skeleton />:`${CONFIG.endpoints.strapi}${data.icon?.url}`}
                  vertical
                />
                </Parrafo>
               {data.url == undefined ||  data.url == ''?  
                load?<Skeleton variant='text' />:  
               <Button
                  color="primary"
                  style={{ float: "right", fontSize: "10px"}}
                >
                  <Link
                    to={{
                      pathname: `/calidad-vida/${data.id}`,
                      data: data
                    }}
                  >
                   Ir al Enlace
                  </Link>
                </Button> : 
                load?<Skeleton variant='text' />:
                <Button
                  href={data.url}
                  color="primary"
                  style={{ float: "right", fontSize: "10px"}}
                >
                  Ir al Enlace
                </Button>}
             
              </GridItem>
            ))}
          </Carousel>
        </GridContainer>
      </div>
    </div>
  );
}
