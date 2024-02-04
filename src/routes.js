/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard/index";
import Averages from "layouts/averages";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import { BodyTemperature } from "layouts/dashboard/assets/bodyTemperature";
import { FrequencyHeart } from "layouts/dashboard/assets/frequencyHeart";
import { Oximetry } from "layouts/dashboard/assets/oximetry";
import { Glycemia } from "layouts/dashboard/assets/glycemia";
import { Steps } from "layouts/dashboard/assets/steps";
import { Activities } from "layouts/dashboard/assets/activities";
import { Localization } from "layouts/dashboard/assets/localization";
import { ClipBoard } from "layouts/dashboard/assets/clipboard";
import { Sleep } from "layouts/dashboard/assets/sleep";
import { Back } from "layouts/dashboard/assets/back";

const routes = [
  {
    type: "route",
    name: "Meus Índices",
    key: "dashboard",
    route: "/meus_indices",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Perfil",
    key: "average",
    route: "/meus_indices",
    icon: <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-single-02" />,
    component: <Averages />,
  }
  ,
  {
    type: "route",
    name: "Atender",
    key: "diaria",
    route: "/meus_indices",
    icon: <ClipBoard colorFill="#000" _className="" />,
    component: <Averages />,
  },

  {
    type: "controlls",
    name: "Glicemia",
    key: "diaria2",
    route: "/meus_indices",
    icon: <Glycemia colorFill="#000" _className=""/>,
    metadataname:"valor_glicemia",
    component: <Averages />,
  },
  {
    type: "controlls",
    name: "Oximetria",
    key: "adiaria3",
    route: "/meus_indices",
    metadataname:"oxymetry",
    icon: <Oximetry colorFill="#000" _className=""/>,
    component: <Averages />,
  },
  {
    type: "controlls",
    name: "Temperatura",
    metadataname:"bodyTemperature",
    key: "diaria4",
    route: "/meus_indices",
    icon:  <BodyTemperature colorFill="#000" _className=""/>,
    component: <Averages />,
  },
  {
    type: "controlls",
    name: "Batimentos",
    key: "diaria5",
    route: "/meus_indices",
    metadataname:"heartRate",
    icon: <FrequencyHeart colorFill="#000" _className=""/>,
    component: <Averages />,
  },
  {
    type: "controlls",
    name: "Passos",
    key: "diaria7",
    route: "/meus_indices",
    metadataname:"weight",
    icon: <Steps colorFill="#000" _className=""/>,
    component: <Averages />,
  },
  {
    type: "route",
    name: "Sono",
    key: "diaria8",
    route: "/meus_indices",
    icon: <Sleep colorFill="#000" _className="" />,
    component: <Averages />,
  },
  {
    type: "route",
    name: "Atividades",
    key: "diaria6",
    route: "/meus_indices",
    icon: <Activities colorFill="#000" _className=""/>,
    component: <Averages />,
  },
  {
    type: "route",
    name: "Localizar",
    key: "diaria9",
    route: "/meus_indices",
    icon: <Localization colorFill="#000" _className=""/>,
    component: <Averages />,
  },
  {
    type: "route",
    name: "Voltar",
    key: "diaria10",
    route: "/meus_indices",
    icon: <Back colorFill="#000" _className="" />,
    component: <Averages />,
  }
];

export default routes;
