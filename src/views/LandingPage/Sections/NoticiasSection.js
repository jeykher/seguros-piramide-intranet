import React,{useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Carousel from 'react-elastic-carousel'
import {DateDiff} from 'utils/dateDiff';
import "../../../assets/css/carousel.css"

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from "classnames";
import axios from 'axios';
import {Link} from "react-router-dom"
import styled from "styled-components"
import CONFIG from "config/config";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
    /*--------------------------------------NoticiasSection------------------------------ */
    const [dataNoticiasSection,setDataNoticiasSection] = useState([{},{},{}]);
    const [loadNoticias, setLoadNoticias] = useState(false);

  useEffect(()=>{
    const llamadoNoticiasSection = async() =>{
      setLoadNoticias(true)
      const res = await axios.get(`${CONFIG.endpoints.strapi}/noticias-sections`);
      try{
        const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
        setDataNoticiasSection(dataOrdenada)
        setLoadNoticias(false)
      }catch(error){

      }
      
    }
    llamadoNoticiasSection()
  },[])
  
  return (
    <div className={classes.title3}>
      <GridContainer justify="center">
        <GridItem
          xs={12}
          sm={12}
          md={8}
          style={{ marginTop: "-50px !important" }}
        >
          <h2 className={classes.title}>Noticias Pirámide</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <Carousel pagination={false} itemsToShow={3}>
            {dataNoticiasSection?.map((data, i) => (
              <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                  {
                    loadNoticias ?<Skeleton variant='rectangular' height={120}/> : data.new ? <span><img
                    src={CONFIG.endpoints.strapi + data?.image?.url}
                    alt="..."
                    className={imageClasses}
                  /><ImageNew src="new.png"/></span> : <img
                  src={CONFIG.endpoints.strapi + data?.image?.url}
                  alt="..."
                  className={imageClasses}
                />
                  }
                </GridItem>
                <CardActionArea>
                  <CardContent style={{minHeight:180}}>
                    <Typography gutterBottom variant="h5" component="h5">
                      {
                        loadNoticias ? <Skeleton/> : data?.title
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify" }}
                    >
                      {
                        loadNoticias ? <Skeleton/> : data?.description?.length > 50 ? data?.description.substring(0,300)+"..." : data?.description
                      }
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ float: "right" }}>
                  {
                    loadNoticias ? <Skeleton width={50}/> : data.url == undefined ||  data.url == ''?
                    <Button style={{textTransform:"none" }} color="primary">
                    <Link
                      to={{
                        pathname: `/noticias-piramide/${data.id}`,
                        data: data
                      }}
                    >
                      Ver más..
                      </Link>
                    </Button>:
                    <Button style={{textTransform:"none" }} color="primary" target="_blank"
                  href={data.url}
                >
                    Ver más..
                </Button>
                  }
                </CardActions>
              </GridItem>
            ))}
          </Carousel>
        </GridContainer>
      </div>
    </div>
  );
}
