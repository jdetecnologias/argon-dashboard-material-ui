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
import ArgonTypography from "components/ArgonTypography";
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
import { loginRedirect } from "helper/loginRedirect";
import If from "components/If/if";
import ErrorAlert from "./components/ErrorAlert/errorAlert";
import colors from "../../assets/theme/base/colors";

function Default() {
  const dataHoje = dayjs().format("YYYY-MM-DD")
  const [listGlycemia, setListGlycemia] = useState([]);
  const [dataChart,setDataChart ] = useState([]);
  const [data_inicio_filtro,setDataInicio_filtro] = useState(dataHoje);
  const [data_fim_filtro,setDataFim_filtro] = useState(dataHoje);
  const [hora_inicio,setHoraInicio] = useState("00:00");
  const [hora_fim,setHoraFim] = useState("23:59");
  const [messageErrorsList,setMessageErrorList] = useState([])
  const [metaDataList, setMetaDataList] = useState([
                                            {prop:"valor_glicemia", label:"Glicemia", show:true,color:"success"},
                                            {prop:"heartRate", label:"Frequência cardiaca", show:false,color:"error"},
                                            {prop:"oxymetry", label:"Oximetria", show:false,color:"primary"},
                                            {prop:"bodyTemperature", label:"Temperatura corporal", show:false,color:"warning"},
                                            {prop:"weight", label:"Peso", show:false,color:"secondary"},
                                            {prop:"steps", label:"Passos", show:false,color:"info"}
                                          ])
                                          
  useEffect(() => {
    const dadoslogin = getDadosLogin();
    filtrar(dadoslogin.email, data_inicio_filtro, data_fim_filtro,dadoslogin.token);
  },[])

  useEffect(() => {
    setListGlycemia([]);
  },[messageErrorsList])

  useEffect(() => {
    setDataChart( adapterGlycemia(listGlycemia, [].concat(metaDataList).filter(option=>option.show)))
  },[listGlycemia,metaDataList])


function filtrar(email, data_inicio_filtro, data_fim_filtro, token){
  getFitered({email, data_inicio_filtro, data_fim_filtro, hora_inicio, hora_fim },token,(dados, messageErrorsList)=>{
     
    if(messageErrorsList.length > 0){
      setMessageErrorList(messageErrorsList);
    }else{
      setListGlycemia(dados);
    }
  })
}

function getTextByLenght(text){
  const stringLength = text.length;
  const element = document.querySelector(".averageCard");
  const width = element?element.clientWidth:100;
  const num = 7.6;
  const qtdLength = parseInt(width/num); 

  if(stringLength > qtdLength){
    return text.substring(0,qtdLength-1);;
  }else{
    return text;
  }
}

function getValues(labelName){

  if(dataChart && dataChart.datasets){
    const dataset = dataChart.datasets.find(dataset=>dataset.label === labelName)
    if(dataset !== undefined && dataset !== null && dataset.data && dataset.data.length > 0 ){
      return dataset.data
    } 

    return [];
  }
  return[];
}

function getAverage(values){
  if(values !== undefined && values !== null && values.length>0){
    const average = values.reduce((avg, val,index)=>{
      let totalValue = avg*(index);
      totalValue += val;

      return totalValue/(index+1);
    },0)

    return average;
  }

  return 0;
}

function handleFiltrar(){
  const  dadosLogin = getDadosLogin();

  filtrar(dadosLogin.email, data_inicio_filtro, data_fim_filtro, dadosLogin.token);
}

function getDadosLogin(){
  let dadoslogin = getCookie("dadosLogin");

  if(dadoslogin === ""){
    loginRedirect()
    return false;
   }
 
   try{
     dadoslogin = JSON.parse(dadoslogin);
   }catch(e){
    loginRedirect()
   }

  return dadoslogin
 }

 function setMetaDataOptions(prop, value){
  const newList = [].concat(metaDataList)
  const index = newList.findIndex(item=>item.prop === prop);
  const register = newList.find(item=>item.prop === prop)
  
  register.show = value;

  newList[index] = register;
  setMetaDataList(()=>newList)
 }

 function GetColor(color){
  let cl = colors
    
  cl = cl[color] || cl["dark"]
  cl = cl.main

  return cl
 }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={2}>
          <ArgonInput type="date" value={data_inicio_filtro} onChange={(e)=>setDataInicio_filtro(e.target.value)}  placeholder="Data Inicio"/>
          <ArgonInput type="time" value={hora_inicio} onChange={(e)=>setHoraInicio(e.target.value)} />         
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <ArgonInput type="date" value={data_fim_filtro} onChange={(e)=>setDataFim_filtro(e.target.value)} placeholder="Data Fim"/> 
          <ArgonInput type="time" value={hora_fim}  onChange={(e)=>setHoraFim(e.target.value)} />  
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ArgonButton onClick={handleFiltrar}>
            Filtrar  
          </ArgonButton>  
        </Grid>
      </Grid>
      <If test={messageErrorsList.length === 0} Else={<ErrorAlert messageErrorList={messageErrorsList} resetMessages={()=>setMessageErrorList([])}/>}>
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
        <Grid item xs={12} lg={12} className="d-none d-xl-block" style={{position:"absolute", top:300, left:30,zIndex:9999}} >
        	<ArgonTypography
                variant="button"
                fontWeight="weight"
                sx={{ lineHeight: 0 }} 
              > 
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center" style={{height:"50px",lineHeight:"50px" }}>Constantes Diárias</li>
              	{metaDataList.map((item, key)=><><li className="list-group-item" style={{color:GetColor(item.color),padding:"10px"}}><input key={key} style={{marginLeft:"20px"}} onChange={()=>setMetaDataOptions(item.prop, !item.show)} checked={item.show} type="checkbox"/>{item.label}</li></>)}
                </ul>
          </ArgonTypography>
        </Grid>
        <Grid item xs={12} lg={12} className="d-block d-xl-none">
        	<ArgonTypography
                variant="button"
                fontWeight="weight"
                sx={{ lineHeight: 0 }}
              > 
                <button className="btn btn-primary" type="button" role="button" data-bs-toggle="collapse" data-bs-target="#constantes" aria-expanded="false" aria-controls="constantes">
                  Constantes Diárias
                </button>
                <div className="p-1 row collapse" id="constantes">                 
              	  {metaDataList.map((item, key)=><><span className="col-12" style={{color:GetColor(item.color),padding:"10px"}}><input key={key} style={{marginLeft:"20px"}} onChange={()=>setMetaDataOptions(item.prop, !item.show)} checked={item.show} type="checkbox"/>{item.label}</span></>)}
                </div>
          </ArgonTypography>
        </Grid>
        <Grid item xs={12} lg={12} >
                <div className="row">
                  <div className="col-4  col-sm-3 col-xxl-2 text-center" style={{height:"150px", lineHeight:"50px"}}>
                    Médias <br/>(período)
                  </div>
                <If test={metaDataList.filter(metaData=>metaData.show).length <= 0}>
                <div className="col-8 col-sm-9 col-lg-11" style={{height:"150px", lineHeight:"100px", fontWeight:900}}>
                    Nenhuma constante selecionada!
                  </div>           
                </If>
                  {metaDataList.filter(metaData=>metaData.show).map((item, key)=>{
                    return ( <>
                                <div className="col-4  col-sm-3 col-xxl-1 m-1" style={{height:"150px"}}>
                                  <div className="d-inline" style={{fontSize:"12px"}}>{getTextByLenght(item.label)}</div>
                                  <div className="text-center averageCard" style={{fontWeight:"800",fontSize:"22px",height:"120px",lineHeight:"120px",border:`solid 1px ${GetColor(item.color)}`}}>{parseInt(getAverage(getValues(item.label)))}</div>
                                </div>
                              </>
                            )
                    }
                    )
                  }

                </div>
        </Grid>
      </If>
    </DashboardLayout>
  );
}

export default Default;
