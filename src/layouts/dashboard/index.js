/* eslint-disable no-unused-vars */
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

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import { getFitered } from "./controller/getFilteredController";
import { getCookie } from "helper/cookies";
import { adapterGlycemia } from "./adapter/dataAdapter";

function Default() {
  const [listGlycemia, setListGlycemia] = useState([]);
  const [dataChart,setDataChart ] = useState([]);

  useEffect(() => {
    let dadoslogin = getCookie("dadosLogin");

    if(dadoslogin === ""){
     location.href = "/autheticacion/sign-in";
    }
  
    try{
      dadoslogin = JSON.parse(dadoslogin);
    }catch(e){
      location.href = "/autheticacion/sign-in"
    }
  
    const token = dadoslogin.token;
    const email = dadoslogin.email;
    console.log(token,email)
  
    getFitered({email, data_inicio_filtro:"2023-01-22", data_fim_filtro:"2023-01-26" },token,(dados)=>{
      setListGlycemia(dados);
    })
  },[])
  	

useEffect(() => {
  setDataChart( adapterGlycemia(listGlycemia))
},[listGlycemia])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>    
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={12}>
            <GradientLineChart
              title="Meus indíces de glicemia"
              chart={dataChart}
            />
          </Grid>
        </Grid>
      </ArgonBox>
  
    </DashboardLayout>
  );
}

export default Default;
