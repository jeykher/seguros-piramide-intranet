import React, {useEffect, useState} from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

import axios from 'axios';

import CONFIG from "config/config";

const useStyles = makeStyles(carouselStyle);

export default function SectionCarousel() {

  const [dataCarousel, setDataCarousel] = useState([]);

  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  useEffect(() =>{
    const llamadoImagenesCarousel = async() =>{
      const res = await axios.get(`${CONFIG.endpoints.strapi}/imagen-carousels`);
      setDataCarousel(res.data)
      // console.log(res.data)
    }
    llamadoImagenesCarousel()
  },[])
  return (
    <div className={classes.section} id="carousel">
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
            <Card>
              <Carousel {...settings}>

                {dataCarousel?.map((data,i) =>(
                  <div key={i}>
                    <img src={CONFIG.endpoints.strapi + data?.carousel?.url} alt="Third slide" className="slick-image" />
                  </div>
                ))}
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

