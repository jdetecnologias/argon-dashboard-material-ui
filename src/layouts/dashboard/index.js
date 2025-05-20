
import { useState, useEffect } from "react";
// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ChartThemeSelector from "./components/Chart/chartThemeSelector";
import { PrintContentCanvas } from 'helper/printDocument';
import { Print } from "layouts/dashboard/assets/print";
import If from "components/If/if";
import { useRecoilState } from "recoil";
import { getFitered, getFiteredByAdmin } from "./controller/getFilteredController";
import { getCookie } from "helper/cookies";
import { adapterGlycemia } from "./adapter/dataAdapter";
import dayjs from "dayjs";
import { loginRedirect } from "helper/loginRedirect";
import ErrorAlert from "./components/ErrorAlert/errorAlert";
import FilterContainer from "./components/FilterItem/FilterContainer";
import ChartList from "./components/Chart/chartList";
import { appDataState, metaDataListState } from "../../stateHandler/atoms/atoms";
import { GetLastAppData } from "./model/getAppDataModel";
import AppData from "./components/AppData/appData";

import {
  useArgonController,
  setShowNavbar,
} from "context";
import ChartAcc from "./components/Chart/chartAcc";
import ChartSelector from "./components/Chart/ChartSelector";

let qtyMapShow = -1;
function Default() {
  qtyMapShow += 1;

  const [appData, setData] = useRecoilState(appDataState)
   const dataHoje = dayjs().format("YYYY-MM-DD")
  const [listGlycemia, setListGlycemia] = useState([]);
  const [listGlycemiaOne, setListGlycemiaOne] = useState([]);
  const [listGlycemiaTwo, setListGlycemiaTwo] = useState([]);
  const [optionAccumulate, setOptionAccumulate] = useState(false);
  const [dataChart,setDataChart ] = useState([]);
  const [data_inicio_filtro,setDataInicio_filtro] = useState(dataHoje);
  const [data_fim_filtro,setDataFim_filtro] = useState(dataHoje);
  const [hora_inicio,setHoraInicio] = useState("00:00");
  const [hora_fim,setHoraFim] = useState("23:59");
  const [messageErrorsList,setMessageErrorList] = useState([])
  const [metaDataList, setMetaDataList] = useRecoilState(metaDataListState)
  const [lightTheme, setLightTheme] = useState(true); 
  const [showAppData, setShowAppData] = useState(false); 
  const [controller, dispatch] =  useArgonController();
  const {showNavbar} = controller;
                                     
  useEffect(() => {
    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);
    const adminAccess = urlParams.get('adminAccess') !== null && urlParams.get('adminAccess') === 'true' ;
    let email = "";
    const oneday =  dayjs().add(-1,'day').format('YYYY-MM-DD');
    const twoday = dayjs().add(-2,'day').format('YYYY-MM-DD'); 
    if(adminAccess){
      email = urlParams.get('email');
      filtrarAdmin(email, data_inicio_filtro, data_fim_filtro);
      filtrarFullDayAdmin(email,oneday, setListGlycemiaOne);
      filtrarFullDayAdmin(email,twoday, setListGlycemiaTwo);
      setShowNavbar(dispatch,true);
    }else{
      const dadoslogin = getDadosLogin();
      email = dadoslogin.email;
      filtrar(dadoslogin.email, data_inicio_filtro, data_fim_filtro,dadoslogin.token);

      filtrarFullDay(dadoslogin.email,oneday, dadoslogin.token,setListGlycemiaOne);
      filtrarFullDay(dadoslogin.email,twoday, dadoslogin.token,setListGlycemiaTwo);
      setShowNavbar(dispatch,true);
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
    const listaAtualizada = listGlycemia.map(glycemia=>{
      if(glycemia.bloodPressure){
        const listBloodPressure = glycemia.bloodPressure.split(",");
        glycemia.bloodPressureHigh = parseInt(listBloodPressure[0]);
        glycemia.bloodPressureLow = parseInt(listBloodPressure[1]);
      }

      return glycemia;
    })
    const dataAdapted = adapterGlycemia(listaAtualizada, [].concat(metaDataList).filter(option=>option.show));
    if(dataAdapted.datasets.length > 1){
      setOptionAccumulate(true)
    }else{
      setOptionAccumulate(false)
    }
    setDataChart( dataAdapted)
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

function filtrarFullDay(email, data, token, callback){
  getFitered({email, data_inicio_filtro:data, data_fim_filtro:data, hora_inicio:"00:00", hora_fim:"23:59" },token,(dados, messageErrorsList)=>{
     
    if(messageErrorsList.length > 0){
      setMessageErrorList(messageErrorsList);
    }else{
      callback(dados);
    }
  })
}

function filtrarFullDayAdmin(email, data, callback){
  getFiteredByAdmin({email, data_inicio_filtro:data, data_fim_filtro:data, hora_inicio:"00:00", hora_fim:"23:59" },(dados, messageErrorsList)=>{
     
    if(messageErrorsList.length > 0){
      setMessageErrorList(messageErrorsList);
    }else{
      callback(dados);
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
  const newList = metaDataList.map(item => {
                                              const newObj = Object.keys(item).reduce((obj,propr, index)=>{
                                                  obj[propr] = item[propr]
                                                  return obj;
                                                },{}) 
                                              if(item.prop === prop){
                                                newObj.show = true;
                                              }else{
                                                newObj.show = false;
                                              }

                                              return newObj;
                                            });
  
  setMetaDataList(()=>newList)
 }

 
  return (
    <DashboardLayout bgColor="transparent">
      <DashboardNavbar />
      <If test={showNavbar}>
        <FilterContainer
          hora_inicio={hora_inicio} data_inicio_filtro={data_inicio_filtro} hora_fim={hora_fim}  data_fim_filtro={data_fim_filtro}
          setDataInicio_filtro={setDataInicio_filtro} setHoraInicio={setHoraInicio} setDataFim_filtro={setDataFim_filtro}  setHoraFim={setHoraFim}
          handleFiltrar={handleFiltrar}
        />
      </If>
      <If test={messageErrorsList.length === 0} Else={<ErrorAlert messageErrorList={messageErrorsList} resetMessages={()=>setMessageErrorList([])}/>}>
      <div>
        <div className=" md:grid md:grid-cols-12 flex flex-col-reverse">
          <div className={showAppData?"col-span-8":"col-span-12"}>
            <ChartThemeSelector onChange={setLightTheme} value={lightTheme}/>
            <button className="btn btn-primary ml-2" onClick={()=>PrintContentCanvas("#grafico","#grafico canvas")}><Print collorFill="#fff" /></button>
              <div>
                <div>
                  Data filtrada:
                  <ChartSelector dataChart={dataChart} optionAccumulate={optionAccumulate} lightTheme={lightTheme}/>
                  <If test={optionAccumulate}>
                    <ChartAcc dataChart={dataChart} lightTheme={lightTheme}/>
                  </If>
                  <If test={!optionAccumulate}>
                    <ChartList dataChart={dataChart} lightTheme={lightTheme}/>
                  </If>
                </div>
                <div>
                  Data: {dayjs().add(-1,'day').format('DD/MM/YYYY')}
                  <ChartList dataChart={adapterGlycemia(listGlycemiaOne, [].concat(metaDataList).filter(option=>option.show))} lightTheme={lightTheme}/>
                </div>
                <div>
                  Data: {dayjs().add(-2,'day').format('DD/MM/YYYY')}
                  <ChartList dataChart={adapterGlycemia(listGlycemiaTwo, [].concat(metaDataList).filter(option=>option.show))} lightTheme={lightTheme}/>
                </div>
              </div>
          </div>
          <div className={showAppData?"col-span-4":"hidden"}>
            <AppData/>
          </div>
        </div>
      </div>

      <label style={{display:"none"}} className="relative inline-flex items-center cursor-pointer h-6">
                <input type="checkbox" onChange={handleAccumulate}  value="" checked={optionAccumulate} className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Selecão multipla</span>
      </label>
      </If>
    </DashboardLayout>
  );
}

export default Default;