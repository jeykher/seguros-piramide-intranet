import React, { createContext, useState } from "react";
import axios from 'axios';

import CONFIG from 'config/config';

export const DataDirectorioContext = createContext();

export const DirectorioContext = ({ children }) => {

    const [dataDirectorio, setDataDirectorio] = useState([]);
    const [codigoDirectorio, setCodigoDirectorio] = useState();
    const [descripcion, setDescripcion] = useState('')
    const [open, setOpen] = useState(false);
    const [Directorio, setDirectorio] = useState({})
    const [codigoDirectorioPadre, setCodigoDirectorioPadre] = useState("")
    const [openModalConfirmacion,setOpenModalConfirmacion] = useState(false);

    /* Endpoint para mostrar el directorio */
    const llamadoBaseDatos = async (tipoDirectorio, codigoDirectorioPadre ) => {
        setDataDirectorio([])
        if(!codigoDirectorioPadre){
            const codigoDirectorioPadre = null}
       
        setOpen(true)
        const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/mostrarDirectorio`,{
            'p_tipo_directorio':tipoDirectorio,
            'p_sub_directorio': codigoDirectorioPadre
        
        });
   
        setDataDirectorio(res.data.c_cursor_mostrar_directorio)
        //console.log(res.data)
        setOpen(false)
    }

    /*Endpoint de obtener codigo de Directorio */

    const obtenerCodDirectorio = async () => {
        const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/obtenerCodDirectorio`);
        setCodigoDirectorio(res.data.c_cursor_cod_directorio[0].COD_DIRECTORIO)

    }

    const ObtenerDirectorioActual = async(codigoDirectorio) => {
        const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/info_directorio`, {
            'p_codigo_directorio': codigoDirectorio,
        });
        console.log(res.data.c_cursor_mostrar_directorio[0])
        setDirectorio(res.data.c_cursor_mostrar_directorio[0]);
    }
 
    /* Endpoint para Guardar Directorio*/
    const guardarDirectorio = async (codigoDirectorio, descripcion, usuario, tipoDirectorio, codigoDirectorioPadre, codigoPerfil) => {
   
        const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/crearActualizarDirectorio`,
            {
                'p_codigo_directorio': codigoDirectorio,
                'p_descripcion': descripcion,
                'p_usuario': usuario,
                'p_tipo_directorio':tipoDirectorio,
                'p_sub_directorio': codigoDirectorioPadre,
                'p_codigo_perfil': codigoPerfil
            })
                
            
            llamadoBaseDatos(tipoDirectorio, codigoDirectorioPadre);
            setDescripcion('');
    }

    /*Endpoint para Eliminar Directorio */

    const eliminarDirectorio = async (TipoDirectorio, codDirectorio, codDirectorioPadre) =>{
        setDataDirectorio([]);
    
        const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/eliminarDirectorio`,{

            p_codigo_directorio: codDirectorio
        })
        console.log(codDirectorioPadre)
        llamadoBaseDatos(TipoDirectorio, codDirectorioPadre);
        setCodigoDirectorio(res.data.c_cursor_directorio[0].COD_DIRECTORIO)
       
    }
    
    return (

        <DataDirectorioContext.Provider value={{
            dataDirectorio, setDataDirectorio,
            llamadoBaseDatos, obtenerCodDirectorio,
            codigoDirectorio, setCodigoDirectorio,
            guardarDirectorio,descripcion, setDescripcion,open, 
            setOpen,eliminarDirectorio,openModalConfirmacion,setOpenModalConfirmacion,
            setCodigoDirectorioPadre,codigoDirectorioPadre, ObtenerDirectorioActual, Directorio
        }}>
            {children}
        </DataDirectorioContext.Provider>
    )
}