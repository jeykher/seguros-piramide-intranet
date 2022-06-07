import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'; 
import Button from "@mui/material/Button";
import { useContext } from 'react';
import { DataImagenContext } from '../Context/ContextImagen/ContextImagen';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  export  function Modalconfirmacion({open,setOpen,codigoDirectorioSelect,nombreImagen}) {
    // const [open, setOpen] = React.useState(false);

    const {
     
    
        llamadoBaseDatos,
        eliminarImagen,
    
      } = useContext(DataImagenContext);
   
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Advertencia
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} >
            ¿ Esta seguro que desea eliminar la imagen seleccionada ? , de ser asi presione el boton confirmar
            </Typography>
            <Button variant="contained" style={{marginTop:10}}
                onClick={async () =>{
                    // alert(codigoDirectorioSelect)
                    // alert (nombreImagen)
                    await eliminarImagen(codigoDirectorioSelect, nombreImagen);
                    //   await llamadoBaseDatos('IMG', codigoDirectorioSelect);
                    setOpen(false)
                }   }
            
            >Confirmar</Button>
            <Button variant="contained" style={{marginTop:10, marginLeft:20  }} onClick={handleClose}>Cancelar</Button>

          </Box>
        </Modal>
      </div>
    );
  }