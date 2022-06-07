import React,{useState, useContext, useEffect} from 'react'
import { FormControlLabel } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import {DataDashboardContext} from 'views/DashboardPiramide/context/ContextDashboard'


const CheckBox = ({prop, key, handleTotalDay}) => {
    const [checked, setChecked] = useState(false)
    const {totalDays, setTotalDays} = useContext(DataDashboardContext)

    const handleCheckbox = () =>{
        setChecked(!checked)
    }
    useEffect(()=>{
        // console.log(checked)
        if(checked === true){
            setTotalDays([
                ...totalDays,
                prop
            ])
        }else{
            let totalDayFiltered = totalDays.filter(data => data.id !== prop.id)
            setTotalDays(totalDayFiltered)
        }
    },[checked])
    // console.log(totalDays)
  return (
    <div>
      <FormControlLabel
        control={<Checkbox 
        disabled={ prop.TOTAL_DIAS_DISFRUTE - prop.DIAS_DISFRUTADOS===0}
        name="checkedC" />}
        onChange={
            handleCheckbox
        }
      />
    </div>
  );
}

export default CheckBox