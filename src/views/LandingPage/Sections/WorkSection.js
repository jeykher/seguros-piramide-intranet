import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import img from "./contactanos-3.png";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import contactUsStyle from "assets/jss/material-kit-react/views/contactUsStyle.js";

const useStyles = makeStyles(contactUsStyle);

export default function ContactUsPage() {
  const [departamentos, setDepartamentos] = useState([
    { departamento: "Corporativa de Gestión Humana" },
    { departamento: "Nacional de Comercialización" },
    { departamento: "Técnica" },
    { departamento: "Operaciones" },
    { departamento: "Fianzas" },
    { departamento: "Corporativa de Sistemas y Tecnología" },
    { departamento: "Corporativa de Administración y Finanzas" },
    { departamento: "Infraestructura, Bienes y Seguridad" },
    { departamento: "Corporativa de Auditoría" },
    { departamento: "Corporativa de Mercadeo" },
    { departamento: "Gerencia de Licitaciones" },
  ]);

  const [departamento, setDepartamento] = useState("");

  const handleChange = (event) => {
    setDepartamento(event.target.value);
  };

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Material Kit PRO React"
        links={<HeaderLinks dropdownHoverColor="dark" />}
        fixed
        color="dark"
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.contactContent}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem md={8} sm={12}>
                <form>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: 0 }}>
                      <CustomInput
                        labelText="Nombre"
                        id="float"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: 30 }}>
                      <CustomInput
                        labelText="Teléfono"
                        id="float"
                        number
                      />
                    </div>
                    <div style={{ marginLeft: 30 }}>
                      <TextField
                        select
                        label="Departamentos"
                        value={departamento}
                        onChange={handleChange}
                        style={{ marginTop: 10, width: "350px" }}
                        fullWidth
                      >
                        {departamentos.map((option) => (
                          <MenuItem
                            key={option.departamento}
                            value={option.departamento}
                          >
                            {option.departamento}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>

                  <CustomInput
                    labelText="Mensaje"
                    id="float"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                    }}
                  />
                  <div className={classes.textCenter}>
                    <Button
                      style={{ backgroundColor: "#e39b30" }}
                      round
                      fullWidth
                    >
                      Enviar
                    </Button>
                  </div>
                </form>
              </GridItem>
              <GridItem md={4} sm={4} className={classes.mlAuto}>
                <img src={img} style={{ width: 420 }} />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
