import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Carousel from "react-elastic-carousel";
import "../../../assets/css/carousel.css";
import {DataDocumentoContext} from  '../../Biblioteca/Context/ContextDocumentos/ContextDocumento';
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import CardActionArea from "@material-ui/core/CardActionArea";
import {DateDiff} from 'utils/dateDiff';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import axios from "axios";
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
  /*--------------------------------------------PreventionSections------------------- */

  const [dataPrevencionSection, setDataPrevencionSection] = useState([{},{},{}]);
  const [loadPrevencion, setLoadPrevencion] = useState(false)

  const {
    mostrarDocumentoSelected,
  } = useContext(DataDocumentoContext);

  useEffect(() => {
    const llamadoPrevencionSection = async () => {
      setLoadPrevencion(true)
      const res = await axios.get(
        `${CONFIG.endpoints.strapi}/prevention-sections`
      );
      try{
        const dataOrdenada = res.data.map(item => ({...item, new: DateDiff(item.published_at, new Date(), 7)})).sort((a, b) => a.order_section - b.order_section);
        let data = []
        for (const item of dataOrdenada) {
          let url
          if(item.Descargar) {
            let aux = item.url.split('/');
            console.log(aux);
            url = await mostrarDocumentoSelected(aux[0],aux[1]);
            console.log(url.DOCUMENTO)
          } else {
            url = item.url
          }
          data.push({... item, url})
        }
  
        setDataPrevencionSection(data);
        setLoadPrevencion(false)
      }catch(error){

      }
     
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
          <h2 className={classes.title}>
          Administración de Riesgos de LC/FT/FPADM
          </h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <Carousel pagination={false} itemsToShow={3}>
            {dataPrevencionSection?.map((data, i) => (
              <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                  {
                    loadPrevencion ?<Skeleton variant='rectangular' height={120}/> : data.new ? <span><img
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
                  <CardContent style={{minHeight:200}}>
                    <Typography gutterBottom variant="h5" component="h5">
                      {loadPrevencion ?<Skeleton/> :data?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify" }}
                    >
                     {loadPrevencion ?<Skeleton/> : data?.description?.length > 50 ? data.description.substring(0,200)+"..." : data?.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ float: "right" }}>
                { loadPrevencion ?<Skeleton width={50}/> : data.url == undefined ||  data.url == ''?
                <Link
                    to={{
                      pathname: `/prevencion-legitimacion/${data.id}`,
                      data: data
                    }}
                  >
                  <Button style={{textTransform:"none" }} color="primary">
                    Ver más..
                  </Button>
                  </Link> :
                  !data.Descargar || data.url.DOCUMENTO?
                  <Button 
                  href={data.url}
                  style={{textTransform:"none" }}
                  color="primary">
                  Ver más.
                  </Button>:
                  <Button 
                    href={`data:application/pdf;base64, ${data.url.DOCUMENTO}`}
                    download={data.url.NOMBRE_DOCUMENTO}
                    style={{textTransform:"none" }}
                    color="primary">
                    Ver más.
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
