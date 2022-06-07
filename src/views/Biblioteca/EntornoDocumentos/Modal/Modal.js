import React, { useRef, useEffect, useCallback, useState, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import TextField from '@material-ui/core/TextField';
import img1 from '../../image/modal.jpg';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Divider from '@material-ui/core/Divider';
import { DataDocumentoContext } from 'views/Biblioteca/Context/ContextDocumentos/ContextDocumento';
// import { DataDocumentoContext } from '../../../../Context/ContextDocumentos/ContextDocumento';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
width: 1020px;
height: 585px;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background: #fff;
color: #000;
display: grid;
grid-template-columns: 1fr 1fr;
position: relative;
z-index: 10;
border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    min-width: 100px;
    padding: 9px 30px;
    border-radius: 30px;
    border: none;
    background: #e89525;
    color: #fff;
    font-size: 11px;
    cursor: pointer;
    height: 31px;
    margin-top: 1px;
  }
  button:hover{
    background-color:#a8621b !important;
  
  }
  #input[type="file"] {
    display: none;
}
#BotonSubirDoc{
  min-width: 100px;
    padding: 5px 10px;
    border-radius: 30px;
    border: none;
    background: #e96004;
    color: #fff;
    font-size: 10px;
    cursor: pointer;
}
#BotonSubirDoc:hover{
  background-color:#d45703 !important;

}
#nomDocumento{
  font-size: 12px;
}
#Descripcion{
  font-size: 12px;
}

`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal }) => {

const [succes, setSucces] = useState(false);
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
     
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
       
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  const { nombre, setNombre, descripcion, setDescripcion,
    documento, setDocumento, guardarActualizarDocumento,
    mineType, setMineType } = useContext(DataDocumentoContext);

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const convertiraBase64 = (archivos) => {
    setSucces(false)
    var sizeByte = archivos[0].size;
    var siezekiloByte = parseInt(sizeByte / 1024);
    if(siezekiloByte > 16000){
        alert('El tamaño supera el limite permitido');
        setDocumento('')
        return;
    }
    const nombreDocumento = document.getElementById('input').files[0].name;
    let mineType = nombreDocumento.split('.');
    mineType = mineType[mineType.length-1]
     setMineType(mineType);

    if(!['pdf','do','docx','doc','xlsx','xls','xlsm'].includes(mineType)){
      alert("Formato Invalido")
      return;
    }
  setSucces(true)


    Array.from(archivos).forEach(archivo => {
      setDocumento(archivo)
      /* var reader = new FileReader();
      reader.readAsDataURL(archivo);

      reader.onload = function () {
        var arrayAuxiliar = [];
        var base64 = reader.result;
        arrayAuxiliar = base64.split(',');
        setDocumento(arrayAuxiliar[1]);
      } */
    })
  }

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={img1} alt='piramides' />
              <ModalContent>
                <h3>Ingrese Datos</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const guardarDocumento = async () => {
                    // alert('entro')
                    // return
                    const querystring = window.location.search
                    const params = new URLSearchParams(querystring)
                    // console.log(params.get('carpeta'))
                    const codigoDirectorio = params.get('carpeta')
                    let datosUsuario = JSON.parse(sessionStorage.getItem("DATOS_USUARIO"));
                    let codUsuario =datosUsuario?.CODIGO_USUARIO;
                    const usuario = codUsuario;
                     
                    if (!nombre  || !descripcion || !mineType){
                      alert('Por favor llenar los datos')
                      return;
                    }else if(['pdf','do','docx','doc','xlsx','xls','xlsm'].includes(mineType)){
                      guardarActualizarDocumento(codigoDirectorio, nombre, descripcion, documento, usuario, mineType);
                      
                      setShowModal(false);
                      setSucces(false);
                      setNombre();
                      setDescripcion();
                      setDocumento();
                    } else {
                      alert("Formato Invalido")
                    }                   
                  }
                  guardarDocumento();
                }}>
                  <div style={{ alignItems: "center " }}>
                    <TextField
                      // id="standard-basic"
                      style={{ width: 315 }}
                      id="nomDocumento"
                      label="Nombre de Documento"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)} />
                  </div>
                  <div style={{ alignItems: "center " }}>
                    <TextField
                      // id="standard-basic"
                      label="Descripcion"
                      id="Descripcion"
                      style={{ width: 315 }}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)} />
                  </div>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container>
                      <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', marginTop: 7 }} >
                           <form action="#">
                          <input type="file" accept="" name="image-upload" id="input" onChange={(event) => convertiraBase64(event.target.files)} />
                          <label htmlFor="input">
                            <Button
                              component="span"
                              id="BotonSubirDoc"
                              startIcon={<ArrowUpwardIcon />}>
                              Subir Documento
                            </Button>
                          </label>
                        </form>
                      </Grid>
                      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                     <div style={{ display: 'flex', justifyContent: 'center', marginTop:6}}>
                    <button>GUARDAR</button>
                  </div>
                      </Grid>
                    </Grid>
                  </div>
                  {succes &&
                    <div style={{width:100, height:100,position:"relative", margin:"auto"}}><img src="/check.gif" style={{ display:"block",marginLeft:"auto", position:"relative", width:"100%", marginTop:20}}/></div>
              }

                  <br />
                  <Divider />                  
                </form>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};