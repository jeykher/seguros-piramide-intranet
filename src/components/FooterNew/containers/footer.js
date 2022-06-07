import React from 'react'
import Footer from '../components/footer'
import Icon from '../components/icons'
import img from '../image/logo_piramide2.png'
import ButtonBase from '@material-ui/core/ButtonBase';


export function FooterContainer() {
    return (
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                   <ButtonBase style={{display:'flex', alingItems:'center'}}><img src={img} alt="logopiramide" style={{width:80, margin:20}}/></ButtonBase>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Productos</Footer.Title>
                    <Footer.Link href="#">Personales</Footer.Link>
                    <Footer.Link href="#">Empresariales</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Contactanos</Footer.Title>
                    <Footer.Link href="#">0800 SPIRAMI(7747264)</Footer.Link>
                    <Footer.Link href="#">0212 2190400</Footer.Link>
                    <Footer.Link href="#">0212 2193698</Footer.Link>
                </Footer.Column>
               <Footer.Column>
                <Footer.Title>Aplicaciones Relevantes</Footer.Title>
                    <Footer.Link href="#"><Icon className="" />Acsel</Footer.Link>
                    <Footer.Link href="#"><Icon className="" />Sysaid</Footer.Link>
                     <Footer.Link href="#"><Icon className="" />Sistema Requisición Materiales</Footer.Link>
                    {/*<Footer.Link href="#"><Icon className="fab fa-twitter" />Twitter</Footer.Link> */}
                </Footer.Column>
            </Footer.Row>
            </Footer.Wrapper>
            <hr/>
            <p id="copyright" >© 2021 Pirámide Seguros, C.A - Todos los derechos reservados, RIF. J-00106474-5. Inscrita en la Superintendencia de la Actividad Aseguradora bajo el número 80. Publicidad aprobada por la Superintendencia de la Actividad Aseguradora bajo el N° 15.091</p>
        </Footer>
    )
}