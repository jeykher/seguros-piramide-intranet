import React from 'react'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Pills from "./Pills"


function IndexActividadesEventos() {
    return (
        <div style={{margintop:"10px", backgroundColor:"rgb(251 247 226)",width:"110%",marginLeft:"-5%"}} id="cumplePromGradua">
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <h2 style={titulo}>Cumpleaños / Promociones / Graduaciones </h2>
                    <Pills/>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default IndexActividadesEventos

//estilos

const titulo = {    
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    marginTop: "30px",
    minHeight: "32px",
    textAlign: "center",
    fontFamily: "Roboto Slab",
    fontWeight: 900,
    marginBottom: "50px",
    textDecoration: "none"
}
