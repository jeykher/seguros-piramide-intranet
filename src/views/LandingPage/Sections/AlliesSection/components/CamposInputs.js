import React,{useEffect, useContext} from 'react'
import { Card, Grid, IconButton, MenuItem, TextField } from '@material-ui/core';
import axios from 'axios';
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import { DataContext } from '../context/DataContext';

import CONFIG from "config/config";

const listaServicios = [
    {CODSERVICIO:"CL", DESCSERVICIO:"Clínica"},
    {CODSERVICIO:"FA", DESCSERVICIO:"Farmacias"},
    {CODSERVICIO:"AP", DESCSERVICIO:"Centros de Atención Médica Primaria"},
    {CODSERVICIO:"LA", DESCSERVICIO:"Laboratorios"},
    {CODSERVICIO:"01", DESCSERVICIO:"Talleres"},
    {CODSERVICIO:"02", DESCSERVICIO:"Casas de Repuestos"}
]

export const CamposInputs = () => {
    const {  estadoSelec,
        setEstadoSelec,
        busqueda,
        setBusqueda,
        valoresTabla,
        setValoresTabla,
        loader,
        setLoader,
        estados, setEstados,
        estado, setEstado,
        servicio, setServicio,
        ciudades, setCiudades,
        ciudad, setCiudad,
        disableCiudad, setDisableCiudad,
            ciudadSelec, setCiudadSelec} = useContext(DataContext)

    const buscarProveedoresGral = async(event) => {
        // setLoader(true)
        setDisableCiudad(true)
        setEstadoSelec("0")
        setCiudadSelec("")
        setCiudades([])
        setEstado("0")
        setBusqueda("")
        setServicio(event.target.value);
        // console.log(event.target.value)
        const respProveedores = await axios.post(`${CONFIG.endpoints.portal}/dbo/providers/get_providers_info`,{
            "p_service_type_for_scales_val":"",
            "p_name_to_find":"",
            "p_direction_to_find":"",
            "p_provider_type":event.target.value,
            "p_service_code":""
        })
        setValoresTabla(respProveedores.data.result)
        // setLoader(false)
    }
    const handleChangeServicio = (event) => {
        buscarProveedoresGral(event)
    };

    const handleChangeCiu = (event) => {
        setCiudad(event.target.value);
    };
    const handleChangeEst = (event) => {
        setEstado(event.target.value);
        if(event.target.value == "0"){
            setCiudadSelec("")
            setCiudades([])
            setDisableCiudad(true)
            setBusqueda("")
            return
        } else{

            const fetchCiudades =async () => {
                const estadoSeleccionado = event.target.value
                setLoader(true)
                setCiudadSelec("")
                setCiudad("")
                setBusqueda("")

                const resp = await axios.post(`${CONFIG.endpoints.portal}/dbo/providers/get_providers_info`,{
                    "p_service_type_for_scales_val":"",
                    "p_name_to_find":"",
                    "p_direction_to_find":"",
                    "p_provider_type":servicio,
                    "p_service_code":""
                });

                var ciudadesXestadoSeleccionado=await resp.data.result.filter((estado) => (
                    estadoSeleccionado == estado.ESTADO_PROVEEDOR
                ));

                var ciudades=await ciudadesXestadoSeleccionado.map(function(clinica) {
                    return clinica.CIUDAD_PROVEEDOR
                });

                var sorted =await ciudades.sort();

                var unique = sorted.filter(function (value, index) {
                    return value !== sorted[index + 1];
                });

                setCiudades(unique)
                setDisableCiudad(false)
                setLoader(false)
            }
            fetchCiudades()
        }
    };

    useEffect(() =>{
        const fetchEstados =async () => {
            const resp = await axios.post(`${CONFIG.endpoints.emergencia24}/listarEstados`,{
                "p_codpais":"001"
            });
            // alert(`${process.env.REACT_APP_URL}/listarEstados`)
            setEstados(resp.data)
        }
        fetchEstados()
    },[ciudades])

    useEffect(() =>{
        const fetchEstados =async () => {
            const resp = await axios.post(`${CONFIG.endpoints.emergencia24}/listarEstados`,{
                "p_codpais":"001"
            });
            // alert(`${process.env.REACT_APP_URL}/listarEstados`)
            setEstados(resp.data)
        }
        fetchEstados()
    },[])

    useEffect(() =>{
        const fetchDataTablaIni =async () => {
            setLoader(true)

            const respProveedores = await axios.post(`${CONFIG.endpoints.portal}/dbo/providers/get_providers_info`,{
                "p_service_type_for_scales_val":"",
                "p_name_to_find":"",
                "p_direction_to_find":"",
                "p_provider_type":"CL",
                "p_service_code":""
            })
            setValoresTabla(respProveedores.data.result)
            setLoader(false)
        }
        fetchDataTablaIni()
    },[])

    return (
        <div style={{ margin: 10, padding: 20}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                            <TextField
                            select
                            label="Seleccione el Servicio"
                            value={servicio}
                            onChange={handleChangeServicio}
                            // style={{minWidth:180}}
                            fullWidth
                        >
                            {listaServicios.map((servicio) => (
                                <MenuItem
                                key={servicio.CODSERVICIO}
                                value={servicio.CODSERVICIO}
                                >
                                    {servicio.DESCSERVICIO}
                                </MenuItem>
                            ))}

                        </TextField>
                        <IconButton style={{display:"none"}}><PictureAsPdfRoundedIcon size="large"/></IconButton>
                        </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                        <TextField
                        select
                        label="Seleccione el Estado"
                        value={estado}
                        onChange={handleChangeEst}
                        // style={{minWidth:180}}
                        fullWidth
                        // helperText="Seleccione el Estado"
                    >
                        <MenuItem
                                key="0"
                                value="0"
                                onClick={()=> setEstadoSelec("0")}
                                >
                                Todas
                        </MenuItem>
                        {estados.map((estado) => (
                            <MenuItem
                                key={estado.CODESTADO}
                                value={estado.DESCESTADO}
                                onClick={(e)=>setEstadoSelec(estado.DESCESTADO)}
                                >
                                {estado.DESCESTADO}
                            </MenuItem>
                        ))}

                    </TextField>
                    </Grid>
                    <Grid  item xs={12} sm={3} md={3}>
                        <TextField
                        select
                        label="Seleccione la Ciudad"
                        value={ciudad}
                        onChange={handleChangeCiu}
                        // style={{minWidth:180}}
                        fullWidth
                        disabled={disableCiudad}
                    >
                        {ciudades?.map((ciudad) => (
                            <MenuItem
                                key={ciudad}
                                value={ciudad}
                                onClick={()=> setCiudadSelec(ciudad)}
                                >
                                {ciudad}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                     <TextField
                       label="Buscar Proveedor"
                       value={busqueda}
                        onChange={(e)=> {
                            setBusqueda(e.target.value)
                        }}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                    />
                    </Grid>
               </Grid>
        </div>
    )
}

