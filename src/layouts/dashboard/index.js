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
import ArgonInput from "components/ArgonInput";
import dayjs from "dayjs";
import ArgonButton from "components/ArgonButton";

function Default() {


  const [listGlycemia, setListGlycemia] = useState([]);
  const [dataChart,setDataChart ] = useState([]);
  const [data_inicio_filtro,setDataInicio_filtro] = useState("");
  const [data_fim_filtro,setDataFim_filtro] = useState("");




  useEffect(() => {
    const dadoslogin = getDadosLogin();
 
    filtrar(dadoslogin.email, data_inicio_filtro, data_fim_filtro,dadoslogin.token);
  },[])

function filtrar(email, data_inicio_filtro, data_fim_filtro, token){
  getFitered({email, data_inicio_filtro, data_fim_filtro },token,(dados)=>{
    setListGlycemia(dados);
  })
}

function handleFiltrar(){
  const  dadosLogin = getDadosLogin();

  filtrar(dadosLogin.email, data_inicio_filtro, data_fim_filtro, dadosLogin.token);
}

function getDadosLogin(){
  let dadoslogin = getCookie("dadosLogin");

  if(dadoslogin === ""){
    location.href = "/autheticacion/sign-in";
   }
 
   try{
     dadoslogin = JSON.parse(dadoslogin);
   }catch(e){
     location.href = "/autheticacion/sign-in"
   }

  return dadoslogin
 }

  	

useEffect(() => {
  setDataChart( adapterGlycemia(listGlycemia))
},[listGlycemia])

useEffect(() => {
  const dataHoje = dayjs().format("YYYY-MM-DD")
  setDataInicio_filtro(dataHoje)
  setDataFim_filtro(dataHoje)
},[])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ArgonInput type="date" value={data_inicio_filtro} onChange={(e)=>setDataInicio_filtro(e.target.value)}  placeholder="Data Inicio"/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ArgonInput type="date" value={data_fim_filtro} onChange={(e)=>setDataFim_filtro(e.target.value)} placeholder="Data Fim"/>  
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ArgonButton onClick={handleFiltrar}>
            Filtrar  
          </ArgonButton>  
        </Grid>
      </Grid>
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
