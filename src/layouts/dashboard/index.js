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

import { getFitered, getFiteredByAdmin } from "./controller/getFilteredController";
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
import FilterContainer from "./components/FilterItem/FilterContainer";
import Chart from "./components/Chart/chart";
import ChartList from "./components/Chart/chartList";
import { getAverage } from "helper/math";
import ChartAcc from "./components/Chart/chartAcc";
import fundo from "./assets/fundo2.png"
import { useRecoilState } from "recoil";
import { appDataState, glycemiaAverage } from "../../stateHandler/atoms/atoms";
import { GetLastAppData } from "./model/getAppDataModel";

let qtyMapShow = -1;
function Default() {
  qtyMapShow += 1;

  const [data, setData] = useRecoilState(appDataState)
   const dataHoje = dayjs().format("YYYY-MM-DD")
  const [listGlycemia, setListGlycemia] = useState([]);
  const [optionAccumulate, setOptionAccumulate] = useState(false);
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
   const numbersOfDivs = [1,2,3,4,5]                                       
  useEffect(() => {
    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);
    const adminAccess = urlParams.get('adminAccess') !== null && urlParams.get('adminAccess') === 'true' ;
    let email = "";
    if(adminAccess){
      email = urlParams.get('email');
      filtrarAdmin(email, data_inicio_filtro, data_fim_filtro);
    }else{
      const dadoslogin = getDadosLogin();
      email = dadoslogin.email;
      filtrar(dadoslogin.email, data_inicio_filtro, data_fim_filtro,dadoslogin.token);
    }

    if(email !== ""){
      GetLastAppData(email).then(result=>{
        if(result.data && result.data.message){
          setData(result.data.message);
        }
      });
    }

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


function filtrarAdmin(email, data_inicio_filtro, data_fim_filtro){
  getFiteredByAdmin({email, data_inicio_filtro, data_fim_filtro, hora_inicio, hora_fim },(dados, messageErrorsList)=>{
     
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

function handleAccumulate(){
  if(optionAccumulate){
    setMetaDataItemShow(metaDataList[0].prop)
  }

  setOptionAccumulate(!optionAccumulate);
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


function handleFiltrar(){
  const queryString = window.location.search;
    
  const urlParams = new URLSearchParams(queryString);
  const adminAccess = urlParams.get('adminAccess') !== null && urlParams.get('adminAccess') === 'true' ;

  if(adminAccess){
    const email = urlParams.get('email');
    filtrarAdmin(email, data_inicio_filtro, data_fim_filtro);
  }else{
    const  dadosLogin = getDadosLogin();

    filtrar(dadosLogin.email, data_inicio_filtro, data_fim_filtro, dadosLogin.token);
  }
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

 function setMetaDataItemShowAcc(prop){
  const newList = [].concat(metaDataList)

  newList.forEach(item => {
    if(item.prop === prop){
      item.show = !item.show;
    }
  })


  setMetaDataList(()=>newList)
 }

 function setMetaDataItemShow(prop){
  const newList = [].concat(metaDataList)

  newList.forEach(item => {
    if(item.prop === prop){
      item.show = true;
    }else{
      item.show = false;
    }
  })


  setMetaDataList(()=>newList)
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
    
  cl = /*cl[color] ||*/ cl["dark"]
  cl = cl.main

  return cl
 }
 
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FilterContainer
        hora_inicio={hora_inicio} data_inicio_filtro={data_inicio_filtro} hora_fim={hora_fim}  data_fim_filtro={data_fim_filtro}
        setDataInicio_filtro={setDataInicio_filtro} setHoraInicio={setHoraInicio} setDataFim_filtro={setDataFim_filtro}  setHoraFim={setHoraFim}
        handleFiltrar={handleFiltrar}
      />
      <If test={messageErrorsList.length === 0} Else={<ErrorAlert messageErrorList={messageErrorsList} resetMessages={()=>setMessageErrorList([])}/>}>
      <If test={optionAccumulate}>
        <ChartAcc dataChart={dataChart}/>
      </If>
      <If test={!optionAccumulate}>
        <ChartList dataChart={dataChart}/>
      </If>
      <label className="relative inline-flex items-center cursor-pointer h-6">
                <input type="checkbox" onChange={handleAccumulate}  value="" checked={optionAccumulate} className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Selecão multipla</span>
      </label>
          <CardList>

            {
              metaDataList.map((item, key)=>(

                  <ItemCard 
                    onClick={!optionAccumulate?()=>setMetaDataItemShow(item.prop):()=>setMetaDataItemShowAcc(item.prop)}
                    key={key}
                    className={"cursor-pointer "+ (item.show ? " font-bold text-gray-500 opacity-100":"opacity-20")}
                    value={parseInt(getAverage(getValues(item.label)))} 
                    label={item.label}
                    />
                )
              )
            }        
          </CardList>
          <div className="grid grid-cols-5">
            {
              numbersOfDivs.map((item, key)=>{
                    return(
                            <div key={key} id={"caixa"+item}>
                              <div className='w-32 font-bold' style={{position:"relative"}}>
                                <img src={fundo}/> 
                                <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{Math.round(Math.random()*100)+"%"}</div>
                              </div>
                            </div>
                          )

              })
            }
          </div>
      </If>
    </DashboardLayout>
  );
}

export default Default;