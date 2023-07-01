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
import Map from "./map/map";
import ItemCard from "./components/ItemCard/itemCard";
import CardList from "./components/CardList/cardList";
let qtyMapShow = -1;
function Default() {
  qtyMapShow += 1;
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
      <div className="mt-52 grid grid-rows-2">
        <div className="grid 4xl:grid-cols-6 3xl:grid-cols-5 2xl:grid-cols-4 sm:grid-cols-3">
          <div className="grid grid-rows-2">
            De:
            <div>
              <input type="date" value={data_inicio_filtro} onChange={(e)=>setDataInicio_filtro(e.target.value)}  placeholder="Data Inicio"/>
              <input type="time" value={hora_inicio} onChange={(e)=>setHoraInicio(e.target.value)} />         
            </div>
          </div>
          <div className="grid grid-rows-2">
            Até:
            <div>
              <input type="date" value={data_fim_filtro} onChange={(e)=>setDataFim_filtro(e.target.value)} placeholder="Data Fim"/> 
              <input type="time" value={hora_fim}  onChange={(e)=>setHoraFim(e.target.value)} />  
            </div>
          </div>
        </div>
        <div>
            <button className="bg-white h-8 w-12 shadow rounded text-gray-300" onClick={handleFiltrar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </button>  
          </div>
      </div>
      <If test={messageErrorsList.length === 0} Else={<ErrorAlert messageErrorList={messageErrorsList} resetMessages={()=>setMessageErrorList([])}/>}>
        <ArgonBox py={3}>    
          <Grid container spacing={3} mb={3}>
            <Grid item className="col-md-12 col-lg-8">
              <GradientLineChart
                title="Meus indíces de glicemia"
                chart={dataChart}
              />
            </Grid>
            <Grid item className="col-md-12 col-lg-4">
                <Map/>
            </Grid>
          </Grid>
        </ArgonBox>
        <CardList>
          {
            metaDataList.map((item, key)=>(
                <ItemCard 
                  onClick={()=>setMetaDataOptions(item.prop, !item.show)}
                  key={key}
                  className={"cursor-pointer "+ (item.show ? "bg-slate-500 text-white":"")}
                  value={parseInt(getAverage(getValues(item.label)))} 
                  label={getTextByLenght(item.label)}
                  />
              )
            )
          }        
        </CardList>
      </If>
    </DashboardLayout>
  );
}


export default Default;
