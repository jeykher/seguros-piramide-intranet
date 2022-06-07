import React from "react";
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

import image1 from "assets/img/Carrusel/6Intra.jpg";
import image2 from "assets/img/Carrusel/2Intra.jpg";
import image3 from "assets/img/Carrusel/3Intra.jpg";
import image4 from "assets/img/Carrusel/4Intra.jpg";
import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";
import Parallax from "components/Parallax/Parallax.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div 
     //className={classes.section}
    >
      <div
      className={classes.container}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} 
          // className={classes.marginAuto}
          >
            <Card carousel style={{height:"80%"}} >
              <Carousel {...settings}>
    {/* <Parallax > */}
                <div 
                // style={{width: "100%",
                //   height: "auto", overflow: "hidden"}}
                >
                  <img src={image1} alt="First slide" 
                  style={{objectFit: "cover",
                    maxWidth: "100%",
                    objectPosition: "center"} }               
                  
                 
                  />
                 
                  <div 
                  className="slick-caption"
                  >
                    {/* <h4>
                      <LocationOn className="slick-icons" />
                      Yellowstone National Park, United States
                    </h4> */}
                  </div>
                </div>
                <div>
                <img src={image2} alt="First slide" 
                  style={{objectFit: "cover",
                    maxWidth: "100%",
                    objectPosition: "center"} }   
                  />
                  <div className="slick-caption">
                    {/* <h4>
                      <LocationOn className="slick-icons" />
                      Somewhere Beyond, United States
                    </h4> */}
                  </div>
                </div>
                <div>
                  <img src={image3} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    {/* <h4>
                      <LocationOn className="slick-icons" />
                      Yellowstone National Park, United States
                    </h4> */}
                  </div>
                </div>
                <div>
                  <img src={image4} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    {/* <h4>
                      <LocationOn className="slick-icons" />
                      Yellowstone National Park, United States
                    </h4> */}
                  </div>
                </div>
    {/* </Parallax> */}
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
