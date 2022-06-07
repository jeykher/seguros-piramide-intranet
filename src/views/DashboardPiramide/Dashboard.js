import React,{useContext} from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import {DataDashboardContext} from "views/DashboardPiramide/context/ContextDashboard"
import {
  sidebar,
  sidebarOpen,
  hamburger,
  linksContainer,img,
  imgResponsive
} from './components/Sidebar/style.module.scss';

const Dashboard = ({children}) => {
  const {open,handleOpen} = useContext(DataDashboardContext);
  return (
    <div>
      <>
        <Sidebar 
          style={{ width: "20vw" }}
          open={open}
          handleOpen={handleOpen}
        />
      {children}
      </>
    </div>
  );
};

export default Dashboard;
