import React, { createContext, useState } from "react";
import axios from 'axios';

import CONFIG from 'config/config';

export const DataDocumentoContext = createContext();

export const DocumentoContext = ({ children }) => {

    const [dataDocumento, setDataDocumento] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [documento, setDocumento] = useState('');
    const [mineType, setMineType] = useState('');
    const [open, setOpen] =  useState(false);
    const [openModalConfirmacion,setOpenModalConfirmacion] = useState(false);
    // const [directorioCod, setDirectorioCod] =  useState('');


     /*endPoint para mostrar los documentos por cod de directorio*/
      const mostrarDocumento = async (codigoDirectorio) => {
        setDataDocumento([]);
        setOpen(true)
         
        const res = await axios.post(`${CONFIG.endpoints.emergencia24}/mostrarDocumento`,{
          p_codigo_directorio:codigoDirectorio
        });
        setDataDocumento(res.data)
        setOpen(false)
        ///console.log('ver valor del API' + JSON.stringify(res.data) )
        //setOpen(false)
      }

      const mostrarDocumentoSelected = async (codigoDirectorio, name) => {         
        const res = await axios.post(`${CONFIG.endpoints.emergencia24}/mostrarDocumento`,{
          p_codigo_directorio:codigoDirectorio
        });
        //setDataDocumento(res.data)
        console.log(res.data.find(element => element.NOMBRE_DOCUMENTO.toLowerCase() === name.toLowerCase()));
        ///console.log('ver valor del API' + JSON.stringify(res.data) )
        //setOpen(false)
        return res.data.find(element => element.NOMBRE_DOCUMENTO.toLowerCase() === name.toLowerCase())
      }
   /*endPoint para eliminar los documentos por cod de directorio*/
  const eliminarDocumento = async ( codigoDirectorio,nombre) => {
    setDataDocumento([]);
    setOpen(true)
    // alert('codigo directorio' + codigoDirectorio)
    // alert('nombre directorio' + nombre);

    // return;
     
   const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/eliminarDocumento`,{
    'p_codigo_directorio':codigoDirectorio,
    'p_nombre_documento':nombre
  });
  setDataDocumento(res.data.c_cursor_documento)
  setNombre('');
  setOpen(false)
  mostrarDocumento(codigoDirectorio);
//    llamadoBaseDatos('DOC', codigoDirectorio)
  ///console.log('ver valor del API' + JSON.stringify(res.data) )
  //setOpen(false)
}

     /* endpoint para crear y actualizar Imagen */
    const guardarActualizarDocumento = async (codigoDirectorio,nombre, descripcion, documento, usuario, mineType ) => {

        setOpen(true)    
        let form =  new FormData();
        form.append('files', documento);
        const resDoc = await axios.post(`${CONFIG.endpoints.strapi}/upload`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // const res = await axios.post('https://segurospiramide.com/asg-api/dbo/intranet/crearActualizarDocumento',
        const res = await axios.post(`${CONFIG.endpoints.emergencia24}/crearActualizarDocumento`,
        {'p_codigo_directorio':codigoDirectorio, 
         'p_nombre_documento':nombre,
         'p_descripcion':descripcion, 
         'p_documento':`${CONFIG.endpoints.strapi}${resDoc.data[0].url}`,
         'p_usuario':usuario,
         'p_mine_type': mineType
        })
      // console.log( '************************' + res.data)
       mostrarDocumento(codigoDirectorio);
       setNombre('');
       setDescripcion('');
       setMineType('');
      }
     

    return (

        <DataDocumentoContext.Provider value={{
            mostrarDocumento,mostrarDocumentoSelected,dataDocumento, setDataDocumento,
            nombre, setNombre, descripcion, setDescripcion,
            documento, setDocumento, guardarActualizarDocumento,
            mineType, setMineType, open, setOpen,eliminarDocumento,
            openModalConfirmacion,setOpenModalConfirmacion
        }}>
            {children}
        </DataDocumentoContext.Provider>
    )
}