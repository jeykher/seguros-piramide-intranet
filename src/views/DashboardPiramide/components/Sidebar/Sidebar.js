import React,{useState} from 'react';
import Item from '../Item/Item';
import {Links} from '../../Data/Links';
import {
  sidebar,
  sidebarOpen,
  hamburger,
  linksContainer,img,
  imgResponsive,nameopen,nameclosed
} from './style.module.scss';
import logo from "../../image/logo-piramide.svg"
import logo2 from "../../image/logo_piramide2.png"
import Typography from '@mui/material/Typography';
import styled from "styled-components"
import PerfectScrollbar from "perfect-scrollbar";
import Divider from '@mui/material/Divider';

const NameUser = styled.p`
  color: rgb(255 255 255) !important;
  font-size: 16px !important;
  margin-top:10px;
`;
var ps;

const ContentImage = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;
const Sidebar = ({ open, handleOpen }) => {
  
  const sidebarWrapper = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div className={open ? sidebarOpen : sidebar} ref={sidebarWrapper} style={{position:"fixed", top:0}}>
      <svg
        className={hamburger}
        onClick={handleOpen}
        viewBox="0 0 18 12"
      >
        <path
          d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
          fill="#8F8F8F"
        />
      </svg>
      <div style={{overflow:"hidden", marginBottom: -50}}>
        <ContentImage>
        {open ? <img src={logo} alt="#" className={img}/> : <img src={logo2} alt="#" className={imgResponsive}/>}
        </ContentImage>
        <Divider color="#808080"/>
        <NameUser  className={open ? nameopen : nameclosed}>Jose Betancourt</NameUser>
        <Divider color="#808080"/>
      </div>
      <div className={linksContainer}>
        {Links &&
          Links.map(({to, text, svg, submenu},i) => (
            <Item key={i} to={to} text={text} svg={svg} open={open} submenu={submenu}/>
          ))
        }
        
      </div>
      
    </div>
  );
};

export default Sidebar;