import React, { createContext, useState } from "react";
import axios from 'axios';

import CONFIG from 'config/config';

export const DataImagenContext = createContext();

export const ImagenContext = ({ children }) => {

     var text  = 'hola';
     const [nombre, setNombre] = useState('');
     const [descripcion, setDescripcion] = useState('');   
     const [imagen, setImagen] = useState('');
     const [dataImagen, setDataImagen] = useState([]);
     const [open, setOpen] = useState(false);
     const [openModalConfirmacion,setOpenModalConfirmacion] = useState(false);

         /* Endpoint para mostrar Imagen */
        const mostrarImagen = async (codigoDirectorio) => {
            setDataImagen([]);
            setOpen(true)
            
        const res = await axios.post(`${CONFIG.endpoints.emergencia24}/mostrarImagen`,{

       
            p_codigo_directorio:codigoDirectorio
          });

          setDataImagen(res.data)
          setOpen(false)
      }

      /*endPoint para eliminar los documentos por cod de directorio*/
  const eliminarImagen = async ( codigoDirectorio,nombre) => {
    setDataImagen([]);
    setOpen(true)
    // alert('codigo directorio' + codigoDirectorio)
    // alert('nombre directorio' + nombre);

    // return;
     
   const res = await axios.post(`${CONFIG.endpoints.portal}dbo/intranet/eliminarImagen`,{
    'p_codigo_directorio':codigoDirectorio,
    'p_nombre_imagen':nombre
  });
  setDataImagen(res.data.c_cursor_imagen)
  setNombre('');
  setOpen(false)
  mostrarImagen(codigoDirectorio);
//    llamadoBaseDatos('DOC', codigoDirectorio)
  ///console.log('ver valor del API' + JSON.stringify(res.data) )
  //setOpen(false)
}

          /* Endpoint para crear y actualizar Imagen */
    const guardarActualizarImagen = async (codigoDirectorio,nombre, descripcion, imagen, usuario ) => {

        //    console.log('codigo direcotrio' + codigoDirectorio)
        //    console.log('nombre' +nombre )
        //    console.log('descripcion' + descripcion)
        //    console.log('imagen'+ imagen)    
       

        setOpen(true)  
        let form =  new FormData();
        form.append('files', imagen);
        const resImg = await axios.post(`${CONFIG.endpoints.strapi}/upload`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('image: ', resImg.data)
        // const res = await axios.post('https://segurospiramide.com/asg-api/dbo/intranet/crearActualizarImagen',
        const res = await axios.post(`${CONFIG.endpoints.emergencia24}/crearActualizarImagen`,
        {'p_codigo_directorio': codigoDirectorio,
         'p_nombre_imagen':nombre, 
         'p_descripcion':descripcion, 
         'p_imagen': `${CONFIG.endpoints.strapi}${resImg.data[0].url}`,
         'p_usuario':usuario
        })
      // console.log( '************************' + res.data)
       mostrarImagen(codigoDirectorio);
       setNombre('');
       setDescripcion('');
      }

    return (

        <DataImagenContext.Provider value={{
            text,nombre, setNombre,descripcion, setDescripcion,
            imagen, setImagen, guardarActualizarImagen, mostrarImagen,
            dataImagen, setDataImagen, open, setOpen,eliminarImagen, openModalConfirmacion,setOpenModalConfirmacion
        }}>
            {children}
        </DataImagenContext.Provider>
    )
}