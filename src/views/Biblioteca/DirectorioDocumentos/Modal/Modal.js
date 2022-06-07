import React, { useRef, useEffect, useCallback, useState,useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import TextField from '@material-ui/core/TextField';
import img1 from '../../image/modal.jpg';
import axios from 'axios';
import { DataDirectorioContext } from 'views/Biblioteca/Context/ContextDirectorio/ContextDirectorio';
// import { DataDirectorioContext } from '../../Context/ContextDirectorio/ContextDirectorio';
// import  '../../../App.css';

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
    padding: 5px 10px;
    border-radius: 30px;
    border: none;
    background: #d68430;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  button:hover{
    background-color:#a8621b !important;
  
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




export const ModalDirectorio = ({ showModal, setShowModal, codigoDirectorio,codigoDirectorioPadre }) => {
  const modalRef = useRef();

  const {guardarDirectorio,descripcion, setDescripcion} = useContext(DataDirectorioContext);

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
        // console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

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
                  const GuardarDirectorio = async () => {

                    let datosUsuario = JSON.parse(sessionStorage.getItem("DATOS_USUARIO"))
                    let codUsuario =datosUsuario?.CODIGO_USUARIO     
                    const usuario = codUsuario;
                    const codPerfil = datosUsuario?.CODIGO_PERFIL     
                    const tipoDirectorio = 'DOC'
                   
                   if (!codigoDirectorioPadre){
                    if( descripcion == ''){
                      alert('Por favor ingrese el nombre del Directorio!!')
                      return;
                    }else {
                        const codigoDirectorioPadre = null;
                      guardarDirectorio(codigoDirectorio, descripcion, usuario, tipoDirectorio, codigoDirectorioPadre, codPerfil);
                      setShowModal(false);
                    }  
                   }else {
                    if( descripcion == ''){
                      alert('Por favor ingrese el nombre del Directorio!!')
                      return;
                    }else {
                    guardarDirectorio(codigoDirectorio, descripcion, usuario, tipoDirectorio,codigoDirectorioPadre, codPerfil);
                    setShowModal(false);
                    }
                   }                        
                  }
                   GuardarDirectorio();
                }}>
                  <div style={{alignItems:"center "}}>
                  <TextField 
                  id="nombreDirectorio" 
                  label="Nombre de Directorio"
                  style={{width:300, fontSize:10}} 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)}/>
                  </div>
                  <br/>
                  <div style={{display:"flex", justifyContent:"center"}}>
                <button>Guardar</button>
                </div>
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