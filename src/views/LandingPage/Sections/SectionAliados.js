import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';

// @material-ui/icons

// import Card from '@material-ui/core/Card';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "@material-ui/core/Button";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Carousel from "react-elastic-carousel";
import "../../../assets/css/carousel.css";
import styles1 from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import teamStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/teamStyle.js";
import {DateDiff} from 'utils/dateDiff';
import axios from "axios";
import styled from "styled-components"

import CONFIG from "config/config";

const styles = {
  ...teamsStyle,
  ...teamStyle,
  justifyContentCenter: {
    justifyContent: "center",
  },
};
const useStyles = makeStyles(styles);
const useStyles1 = makeStyles(styles1);
const ImageNew = styled.img`
    position: absolute;
    height: 160px;
    width: 155px;
    z-index: 1;
    left: -24px;
    padding: 40px;
    top: -40px;
`;
export default function ProductSection() {
  const classes1 = useStyles1();
  const classes = useStyles();

  /*------------------------------------------------SectionAliados----------------------------------------------------- */
  const [dataSectionAliados, setDataSectionAliados] = useState([{},{},{}]);
  const [loadAliados, setLoadAliados] = useState(false)

  useEffect(() => {
    const llamadoSectionAliados = async () => {
      setLoadAliados(true)
      const res = await axios.get(`${CONFIG.endpoints.strapi}/section-aliados`);
      try{
        const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
        setDataSectionAliados(dataOrdenada);
        setLoadAliados(false)
      }catch(error){

      }
     
    };
    llamadoSectionAliados();
  }, []);

  return (
    <div
      className={classes.section}
      style={{ marginTop: -60, marginBottom: -80 }}
    >
      <h2 className={classes.title}>Nuestros Aliados</h2>
      <div>
        <GridContainer>
          <Carousel pagination={false} itemsToShow={3}>
            {dataSectionAliados?.map((data, i) => (
              <GridItem xs={12} sm={3} md={12}>
                <Card profile plain className={classes.card3}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {
                          loadAliados ? <Skeleton variant='rectangular' height={120}/> : data.new ? <span><img
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
                        <h4 className={classes.cardTitle}>
                          {
                            loadAliados ? <Skeleton/> :data?.title
                          }
                        </h4>
                        <p className={classes.description}>
                          {
                            loadAliados ? <Skeleton/> : data?.description?.length > 50 ? data?.description?.substring(0,200)+"..." : data?.description
                          }
                        </p>
                      </CardBody>
                      <CardFooter
                        plain
                        className={classes.justifyContentCenter}
                        style={{backgroundColor: "#ffffff"}}
                      >
                        {
                          loadAliados ? <Skeleton width={50}/> :  <Button justIcon simple color="twitter">
                          <a href={data?.twiter} class="nav-link" target="_blank">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </Button>
                        }
                       {
                         loadAliados ? <Skeleton width={50}/> : <Button justIcon simple color="facebook">
                         <a href={data?.facebook} class="nav-link" target="_blank">
                           <i className="fab fa-facebook-square" />
                         </a>
                       </Button>
                       }
                      {
                        loadAliados ? <Skeleton width={50}/> : <Button justIcon simple color="google">
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
