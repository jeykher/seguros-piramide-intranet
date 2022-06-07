import React, {useState} from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ModalEliminarSoli from "views/DashboardPiramide/components/Modal/ModalEliminarSoli"

const ButtonCancelSolicitud = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
    <ModalEliminarSoli open={open} handleClickOpen={handleClickOpen} setOpen={setOpen}/>
    <div>
    <Button onClick={handleClickOpen}>
    <DeleteIcon style={{color:"#006bb9"}}/>
    </Button>
  </div>
  </>
  )
}

export default ButtonCancelSolicitud