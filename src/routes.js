import Buttons from "viewsDash/Components/Buttons.js";
import ReactTables from "viewsDash/Tables/ReactTables.js";
import Dashboard from "viewsDash/Dashboard/Dashboard.js";
import Icons from "viewsDash/Components/Icons.js";
import Notifications from "viewsDash/Components/Notifications.js";
import Panels from "viewsDash/Components/Panels.js";

 import Calendar from "viewsDash/Calendar/Calendar.js";
 import Charts from "viewsDash/Charts/Charts.js";
 import ErrorPage from "viewsDash/Pages/ErrorPage.js";
 import ExtendedForms from "viewsDash/Forms/ExtendedForms.js";
 import ExtendedTables from "viewsDash/Tables/ExtendedTables.js";
 import FullScreenMap from "viewsDash/Maps/FullScreenMap.js";
 import GoogleMaps from "viewsDash/Maps/GoogleMaps.js";
 import GridSystem from "viewsDash/Components/GridSystem.js";

 import LockScreenPage from "viewsDash/Pages/LockScreenPage.js";
 import LoginPage from "viewsDash/Pages/LoginPage.js";

 import PricingPage from "viewsDash/Pages/PricingPage.js";
 import RTLSupport from "viewsDash/Pages/RTLSupport.js";

 import RegisterPage from "viewsDash/Pages/RegisterPage.js";
 import RegularForms from "viewsDash/Forms/RegularForms.js";
 import RegularTables from "viewsDash/Tables/RegularTables.js";
 import SweetAlert from "viewsDash/Components/SweetAlert.js";
 import TimelinePage from "viewsDash/Pages/Timeline.js";
 import Typography from "viewsDash/Components/Typography.js";
 import UserProfile from "viewsDash/Pages/UserProfile.js";
 import ValidationForms from "viewsDash/Forms/ValidationForms.js";
 import VectorMap from "viewsDash/Maps/VectorMap.js";
 import Widgets from "viewsDash/Widgets/Widgets.js";
 import Wizard from "viewsDash/Forms/Wizard.js";
 import Dash from "views/Dashboard/Dashboard.js";
//  import myDashboard from "../Dashboard/Dashboard.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import PostAdd from "@material-ui/icons/PostAdd";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Input from "@material-ui/icons/Input";




import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import Comment from "@material-ui/icons/Comment";
import FastRewind from "@material-ui/icons/FastRewind";
import PersonAdd from "@material-ui/icons/PersonAdd";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';




var dashRoutes = [

  {
    path: "/charts",
    name: "Charts",
    rtlName: "???????? ??????????????",
    icon: DashboardIcon,
    component: Charts,
    layout: "/admin",
  
  },
  {
    path: "/dashboard",
    name: "MI TABLERO",
    rtlName: "???????? ??????????????",
    icon: DashboardIcon,
    component: Dash,
    layout: "/admin",
  
  },
  {
    collapse: true,
    name: "SOLICITUDES",
    rtlName: "??????????",
    icon: Comment,
    state: "pageCollapse",
    
    views: [
      {
        path: "/pricing-page",
        name: "Contancias de Trabajo",
        rtlName: "????????????????",
        mini: " .",
        rtlMini: "??",
        // component: PricingPage,
        layout: "/auth",
        color:"white",
       
      },
      {
        path: "/rtl-support-page",
        name: "Recibo de Pagos",
        rtlName: "?????????? ??????",
        mini: " .",
        rtlMini: "????",
        // component: RTLSupport,
        layout: "/rtl",
      },
      {
        path: "/timeline-page",
        name: "Anticipo de Vacaciones",
        rtlName: "???????????????? ????????????",
        mini: " .",
        rtlMini: "????",
        // component: TimelinePage,
        layout: "/admin",
      },
      {
        path: "/login-page",
        name: "Vacaciones",
        rtlName: "?????????????????? ????????????",
        mini: " .",
        rtlMini: "????????",
        // component: LoginPage,
        layout: "/auth",
      },
      
    ],
  },
 
  {
    collapse: true,
    name: "IMPUESTOS",
    rtlName: "??????????",
    icon: PostAdd,
    state: "formsCollapse",
    
    views: [
      {
        path: "/pricing-page",
        name: "Planilla de Retencion (ARI)",
        rtlName: "????????????????",
        mini: ".",
        rtlMini: "??",
        // component: PricingPage,
        layout: "/auth",
        color:"white",
        
        
        
       
      },
      {
        path: "/rtl-support-page",
        name: "Comprobante de Retenci??n (ARC)",
        rtlName: "?????????? ??????",
        mini: ".",
        rtlMini: "????",
        // component: RTLSupport,
        layout: "/rtl",
      },
                 
    ],
  },

  
  {
    collapse: true,
    name: "SOLICITUD DE PERSONAL",
    rtlName: "??????????????",
    icon: PersonAdd,
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Requisici??n de Personal",
        rtlName: "???????????? ??????????",
        mini: " .",
        rtlMini: "????",
        component: RegularTables,
        layout: "/admin",
      },
      {
        path: "/extended-tables",
        name: "Movimiento de Personal",
        rtlName: "?????????? ??????????",
        mini: " .",
        rtlMini: "??????",
        component: ExtendedTables,
        layout: "/admin",
      },
      {
        path: "/extended-tables",
        name: "Captaci??n de Personal",
        rtlName: "?????????? ??????????",
        mini: " .",
        rtlMini: "??????",
        component: ExtendedTables,
        layout: "/admin",
      },
     
    ],
  },

  {
    path: "/widgets",
    name: "MIS PRESTAMOS",
    rtlName: "????????????????",
    icon: AttachMoney,
    component: Widgets,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "ZONA DE DESCARGA",
    rtlName: "???????????? ????????????????",
    icon: CloudDownloadIcon,
    component: Charts,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "SALON VIRTUAL",
    rtlName: "???????????? ????????????????",
    icon: Input,
    component: Charts,
    layout: "/admin",
  },
  {
    path: "/",
    name: "RETORNAR INTRANET",
    rtlName: "???????????? ????????????????",
    icon: FastRewind,
    component: Charts,
    layout: "/landing-page",
  },
];
export default dashRoutes;
