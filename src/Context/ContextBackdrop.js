import { createContext, useState, useContext } from "react";

export const DataBackdrop = createContext(); 

export const useBackdrop= () => useContext(DataBackdrop);

export const BackDropProvider = ({children}) => {

    const [open, setOpen] = useState(false)

    return (
        <DataBackdrop.Provider value={{open, setOpen}}> 
            {children}
        </DataBackdrop.Provider>
    )
}