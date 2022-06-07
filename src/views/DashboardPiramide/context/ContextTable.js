import React, { createContext, useState, useContext } from "react";
import Tooltip from '@mui/material/Tooltip';
import Button from "components/CustomButtons/Button.js";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {DataDashboardContext} from "views/DashboardPiramide/context/ContextDashboard"


export const DataTableContext = createContext();

export const TableContext = ({children}) => {
    // const [solicitudVaca, setSolicitudVaca] = useState([])

    // const {solicituVaciones} = useContext(DataDashboardContext);
    
    // const DatosTabla = (datoSolicitud) =>{
    //     let solicitud = [
    //         ...solicitudVaca
    //     ]
    //     const valSol = solicitud.find(element => element.office == datoSolicitud.periodo)
    //     if(valSol){
    //         alert("Solicitud ya procesada")
    //         return;
    //     }
    //     solicitud.push(datoSolicitud)
    //     console.log(solicitud)
    //     DatosSolicitud(solicitud)
    // }

    // const DatosSolicitud = () => {

    //     // let res = data.map((prop, key) => {
    //     //     return {
    //     //       id: key,
    //     //       fechaSolicitud: prop.fechaSolicitud,
    //     //       periodo: prop.periodo,
    //     //       pend: prop.pend,
    //     //       diasolicitud: prop.diasolicitud,
    //     //       // status: prop.TOTAL_DIAS_DISFRUTE - prop.DIAS_DISFRUTADOS===0 ? "Aprobado" : "En espera",
    //     //       actions:(
    //     //         // we've added some custom button actions
    //     //         <div className="actions-right">
    //     //           {/* use this button to add a like kind of action */}
    //     //           <Tooltip title="Observación">
    //     //           <Button
    //     //             justIcon
    //     //             round
    //     //             simple
    //     //             // disabled={ prop.TOTAL_DIAS_DISFRUTE - prop.DIAS_DISFRUTADOS===0}
    //     //             onClick={() => console.log("toco")}
                    
    //     //             className="like"
    //     //           >
    //     //             <VisibilityIcon style={{color:"black"}}/>
    //     //           </Button>
    //     //           </Tooltip>{" "}
        
                  
    //     //         </div>
    //     //       ),
    //     //     };
    //     //   })

    //     //   setSolicitudVaca(res)
    // }
    return(
        <DataTableContext.Provider
        value={{}}
       >
            {children}
        </DataTableContext.Provider>
    );
}