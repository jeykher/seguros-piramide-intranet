import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Carousel from "react-elastic-carousel";
import "../../../assets/css/carousel.css";
import {DateDiff} from 'utils/dateDiff';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import styled from "styled-components"

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import axios from "axios";
import {Link} from "react-router-dom"

import CONFIG from "config/config";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 150,
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  imgRoundedCircle: {
    borderRadius: "10% !important",
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    height: 170,
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
export default function ProductSection() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const imageClasses = classNames(
    classes2.imgRaised,
    classes2.imgRoundedCircle,
    classes2.imgFluid
  );
  /*--------------------------------------------SeguridadSaludLaboral------------------- */

  const [dataPrevencionSection, setDataPrevencionSection] = useState([{},{},{}]);
  const [loadSaludLaboral, setLoadSaludLaboral] = useState(false)

  useEffect(() => {
    const llamadoPrevencionSection = async () => {
      setLoadSaludLaboral(true)
      const res = await axios.get(`${CONFIG.endpoints.strapi}/seguridad-saluds`);
      try{
        const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
        setDataPrevencionSection(dataOrdenada);
        setLoadSaludLaboral(false)
      }catch(error){}
   
    };
    llamadoPrevencionSection();
  }, []);

  return (
    <div className={classes.title3}>
      <GridContainer justify="center">
        <GridItem
          xs={12}
          sm={12}
          md={8}
          style={{ marginTop: "-50px !important" }}
        >
          <h2 className={classes.title}>Seguridad y Salud Laboral</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <Carousel pagination={false} itemsToShow={3}>
            {dataPrevencionSection?.map((data, i) => (
              <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                  {
                    loadSaludLaboral ?<Skeleton variant='rectangular' height={120}/> :data.new? <span><img
                    src={CONFIG.endpoints.strapi + data?.image?.url}
                    alt="..."
                    className={imageClasses}
                  /><ImageNew src="new.png"/> </span> : <img
                  src={CONFIG.endpoints.strapi + data?.image?.url}
                  alt="..."
                  className={imageClasses}
                />
                  }
                  
                </GridItem>
                <CardActionArea>
                  <CardContent style={{minHeight:180}}>
                    <Typography gutterBottom variant="h5" component="h5">
                      {loadSaludLaboral ?<Skeleton/> :data?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify" }}
                    >
                      {loadSaludLaboral ?<Skeleton/> :data?.description?.length > 50 ? data?.description?.substring(0,300)+"..." : data?.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ float: "right" }}>
                { loadSaludLaboral ?<Skeleton width={50}/> : data.url == undefined ||  data.url == ''?
                <Link
                    // to="/calidad-vida"
                    to={{
                      pathname: `/seguridad-salud/${data.id}`,
                      data: data
                    }}
                  >
                  <Button 
                  style={{textTransform:"none" }} 
                  color="primary">
                    Ver más..
                  </Button>
                  </Link> : 
                  <Button 
                  href={data.url}
                  style={{textTransform:"none" }}
                  color="primary">
                    Ver más..
                  </Button>}

                </CardActions>
              </GridItem>
            ))}
          </Carousel>
        </GridContainer>
      </div>
    </div>
  );
}
