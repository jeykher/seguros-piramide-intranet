import { createContext, useState, useContext } from "react";
import { AiOutlineArrowUp } from 'react-icons/ai'; 
import { BsCalendar3 } from 'react-icons/bs';
import { BsNewspaper } from 'react-icons/bs';
import { BsTelephoneFill } from 'react-icons/bs'
import { MdGroups } from 'react-icons/md';
import { FaBirthdayCake } from 'react-icons/fa';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { BsCurrencyExchange } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';
import {Link} from "react-scroll"

export const DataSpeedDial = createContext(); 

export const useSpeedDial= () => useContext(DataSpeedDial);

export const SpeedDialProvider = ({children}) => {

    const [speedDialNavigatorElements, setSpeedDialNavigatorElements] = useState([
        {
            id: 1,
            componentIcon: 
            <Link to="carousel" smooth={true} spy={true}>
            <AiOutlineArrowUp color="white" size="20" />
            </Link>,
            tooltipTitle: "Inicio"
            
        },
        {
            id: 2,
            componentIcon: 
            <Link to="eventAct" smooth={true} spy={true} offset={-70} exact={true} duration={1000} activeClass="active">
            <BsCalendar3 color="white" size="20" />
            </Link>,
            tooltipTitle: "Eventos / Actividades / Jornadas"
        },
        {
            id: 3,
            componentIcon: 
            <Link to="noticias" smooth={true} spy={true} offset={-50} exact={true} duration={1000} activeClass="active">
            <BsNewspaper color="white" size="20" />
            </Link>,
            tooltipTitle: "Noticias"
        },
        {
            id: 4,
            componentIcon: 
            <Link to="dirTelf" smooth={true} spy={true} offset={-70} exact={true} duration={1000} activeClass="active">
            <BsTelephoneFill color="white" size="20" />
            </Link>,
            tooltipTitle: "Directorio Telefónico"
        },
        {
            id: 5,
            componentIcon:  
            <Link to="aliados" smooth={true} spy={true} offset={-70} exact={true} duration={1000} activeClass="active">
            <MdGroups color="white" size="25" />
            </Link>,
            tooltipTitle: "Nuestros Aliados"
        },
        {
            id: 6,
            componentIcon:  
            <Link to="cumplePromGradua" smooth={true} spy={true} offset={-60} exact={true} duration={1000} activeClass="active">
            <FaBirthdayCake color="white" size="22" />
            </Link>,
            tooltipTitle: "Cumpleaños / Promociones"
        },
        {
            id: 7,
            componentIcon:  
            <Link to="saludseguridad" smooth={true} spy={true} offset={-80} exact={true} duration={1000} activeClass="active">
            <FaBriefcaseMedical color="white" size="20" />
            </Link>,
            tooltipTitle: "Salud y Seguridad Laboral"
        },
        {
            id: 8,
            componentIcon: 
            <Link to="prevencion" smooth={true} spy={true} offset={-50} exact={true} duration={1000} activeClass="active">
            <BsCurrencyExchange color="white" size="20" />
            </Link>,
            tooltipTitle: "Administración de Riesgos de LC/FT/FPADM"
        },
        {
            id: 9,
            componentIcon:
                <Link to="enlacesInteres" offset={0} spy={true} smooth={true} exact={true} duration={1000} activeClass="active" className="ipos-speeddial-navigator-item-link">
                    <FaLink color="white" size="20" />
                </Link>   
                ,
            tooltipTitle: "Enlaces de Interés"
        }
    ])

    return (
        <DataSpeedDial.Provider value={{speedDialNavigatorElements, setSpeedDialNavigatorElements}}> 
            {children}
        </DataSpeedDial.Provider>
    )}