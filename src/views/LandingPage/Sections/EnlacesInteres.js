import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "@material-ui/core/Button";
import Carousel from "react-elastic-carousel";
import "../../../assets/css/carousel.css";
import axios from "axios";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import {DateDiff} from 'utils/dateDiff';
import CONFIG from "config/config";
import styled from "styled-components"

const useStyles = makeStyles(styles);
const ImageNew = styled.img`
    position: absolute;
    height: 160px;
    width: 155px;
    z-index: 1;
    left: -24px;
    padding: 40px;
    top: -40px;
`;
export default function EnlacesInteres() {
  const classes = useStyles();

  const [dataEnlacesInteres, setDataEnlacesInteres] = useState([{},{},{}]);
  const [loadEnlaces, setLoadEnlaces] = useState(false)

  useEffect(() => {
    const llamadoEnlacesInteres = async () => {
      setLoadEnlaces(true)
      const res = await axios.get(
        `${CONFIG.endpoints.strapi}/enlaces-intereses`
      );
        try{
          const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);

          setDataEnlacesInteres(dataOrdenada);
          setLoadEnlaces(false)
        }catch(error){

        }
    };
    llamadoEnlacesInteres();
  }, []);

  return (
    <div
      className={classes.title2}
      id="aliados"
      style={{ backgroundColor: "rgb(251 247 226)", width: "110%", marginLeft: "-5%" }}
    >
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Enlaces de Interés</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <Carousel pagination={false} itemsToShow={3}>
            {dataEnlacesInteres?.map((data, i) => (
              <GridItem xs={12} sm={3} md={12} key={i}>
                <Card profile plain className={classes.card3}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {
                          loadEnlaces ? <Skeleton variant='rectangular' height={120}/> : data.new ? <span><img
                          src={CONFIG.endpoints.strapi + data?.logo?.url}
                          alt="..."
                          style={{ width: 130, height: 100 }}
                        /><ImageNew src="new.png"/> </span> : <img
                        src={CONFIG.endpoints.strapi + data?.logo?.url}
                        alt="..."
                        style={{ width: 130, height: 100 }}
                      />
                        }
                        
                      </a>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CardBody plain style={{ height: 200 }}>
                        <h5
                          className={classes.cardTitle}
                          style={{ color: "#C15E0A", fontWeight: 500 }}
                        >
                          {loadEnlaces ? <Skeleton/> : data?.title}
                        </h5>

                        <p className={classes.description}>
                   {loadEnlaces ? <Skeleton/> : data?.description?.length > 50 ? data?.description?.substring(0,200)+"..." : data?.description}
                        </p>
                      </CardBody>
                      <CardFooter
                        plain
                        className={classes.justifyContentCenter}
                        style={{backgroundColor: "rgb(251 247 226)", justifyContent: "center"}}
                      >
                        {
                          loadEnlaces ? <Skeleton width={50}/> : <Button justIcon simple color="twitter">
                          <a href={data?.twiter} class="nav-link" target="_blank">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </Button>
                        }
                        {
                          loadEnlaces ? <Skeleton width={50}/> : <Button justIcon simple color="facebook">
                          <a href={data?.facebook} class="nav-link" target="_blank">
                            <i className="fab fa-facebook-square" />
                          </a>
                        </Button>
                        }
                        {
                          loadEnlaces ? <Skeleton width={50}/> : <Button justIcon simple color="google">
                          <a href={data?.google} class="nav-link" target="_blank">
                            <i className="fab fa-google" />
                          </a>
                        </Button>
                        }
                        
                      </CardFooter>
                    </GridItem>
                  </GridContainer>
                </Card>
              </GridItem>
            ))}
          </Carousel>
        </GridContainer>
      </div>
    </div>
  );
}
