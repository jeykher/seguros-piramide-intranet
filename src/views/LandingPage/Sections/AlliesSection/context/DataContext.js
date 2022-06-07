import React,{createContext, useState}  from 'react'

export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [estadoSelec, setEstadoSelec] = useState('');
    const [ciudadSelec, setCiudadSelec] = useState('');  
    const [busqueda, setBusqueda] = useState(''); 

    const [valoresTabla, setValoresTabla] = useState([]);

    const [loader, setLoader] = useState(false);

    //states de Estados
    const [estados, setEstados] = React.useState([]);
    const [estado, setEstado] = React.useState('0');
    //states de Servicios
    const [servicio, setServicio] = React.useState('CL');
    //states de Ciudades
    const [ciudades, setCiudades] = React.useState([]);
    const [ciudad, setCiudad] = React.useState('');
    //states de deshabilitar ciudad
    const [disableCiudad, setDisableCiudad] = React.useState(true);

    
    return (
        <DataContext.Provider value={{
            estadoSelec, 
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
            ciudadSelec, setCiudadSelec

        }}>
            {children}
        </DataContext.Provider>
    )
}


