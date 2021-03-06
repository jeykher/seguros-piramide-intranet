import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Backdrop from '@material-ui/core/Backdrop';
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Grid from "@mui/material/Grid";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import axios from "axios";
import ComponentParrafoImgDerecha from "./ImagePage2";
import ComponentParrafoImgIzquierda from "./ImagePage";
import ComponentParrafo from "./Parrafo";
import ComponentImg from "./Image";
import Flyers from "./Flyers"
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams  } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import CONFIG from "config/config";

const Parrafo = styled.div`
  p {
    font-size: 28px !important;

    margin-top: 30px !important;

    color: #b42d00 !important;

  }

`;

const Button = styled.div`
  
.MuiButtonBase-root {
  margin-left: 20px;
  margin-top: 20px;
}
`;

const useStyles = makeStyles(styles);

const arrayOrdenado = [];

export default function PrevencionLegitimacion(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { id: idItem  } = useParams();

  /*-------------------------Calidad de Vida------------------------------------------- */
  const [dataPrevencion, setDataPrevencion] = useState([]);
  const [titulo, setTitulo] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const llamadoPrevencion = async () => {
      setOpen(true);
        const {data} = await axios.get(`${CONFIG.endpoints.strapi}/prevention-sections/${idItem}`)
      setTitulo(data.title)

      const arr = await data
        ?.contenido_prevention_sections.map((item, i) => {
          
          if (item.ListaOpciones === "PARRAFO")
            return {
              orden: item.order_section,
              ele: <ComponentParrafo dataSections={item} />,
            };
          if (item.ListaOpciones === "PARRAFO_IMAGEN_DERECHA")
            return {
              orden: item.order_section,
              ele: <ComponentParrafoImgDerecha dataSections={item} />,
            };
          if (item.ListaOpciones === "PARRAFO_IMAGEN_IZQUIERDA")
            return {
              orden: item.order_section,
              ele: <ComponentParrafoImgIzquierda dataSections={item} />,
            };
          if (item.ListaOpciones === "IMAGEN")
            return {
              orden: item.order_section,
              ele: <ComponentImg dataSections={item} />,
            };
          if (item.ListaOpciones === "FLYERS")
          return{
            orden: item.order_section,
            ele: <Flyers dataSections={item}/>
          }

        }).sort((a, b) => a.orden - b.orden);

        setDataPrevencion(arr);
        setOpen(false);
    };
    llamadoPrevencion();
  }, []);

  return (
    <div>
       <Backdrop
        style={{ zIndex: 99, color: "#fff" }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header
        color="transparent"
        // brand="Seguros Pir??mide"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        image={require("assets/img/imagenEditada.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
      <Button>
              <Link to="/">
                <IconButton><ArrowBackIcon /></IconButton>
              </Link>
      </Button>
        <div>
        <Parrafo>
          <div style={{ display: "flex", justifyContent: "center",marginBottom:40 }} >
          <div
              style={{
                width: "75%",
                margin: "auto",
                marginBottom: 30,
                lineHeight: 1
              }}
            >
              <p className="title-parrafo">{titulo}</p>
          </div>
          </div>
          </Parrafo>
          {dataPrevencion?.map((item, i) => (
            <Grid container key={i} style={{ display: "flex", justifyContent: "center", paddingBottom:20  }}>
              <Grid item xs={8}>
                <div>{item.ele}</div>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
