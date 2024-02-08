
import { useState, useEffect } from "react";
// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Map from "layouts/dashboard/map/map";
import ChartThemeSelector from "./components/Chart/chartThemeSelector";
import { PrintContentCanvas } from 'helper/printDocument';
import { Print } from "layouts/dashboard/assets/print";
import { Sleep } from "layouts/dashboard/assets/sleep";
import fundo from "layouts/dashboard/assets/fundo.png"
import { Steps } from "layouts/dashboard/assets/steps";
import { FrequencyHeart } from "layouts/dashboard/assets/frequencyHeart";
import { Activities } from "layouts/dashboard/assets/activities";
import If from "components/If/if";
import { useRecoilState } from "recoil";
import { minutoToHour } from "helper/date";
import { getFitered, getFiteredByAdmin } from "./controller/getFilteredController";
import { getCookie } from "helper/cookies";
import { adapterGlycemia } from "./adapter/dataAdapter";
import dayjs from "dayjs";
import { loginRedirect } from "helper/loginRedirect";
import ErrorAlert from "./components/ErrorAlert/errorAlert";
import FilterContainer from "./components/FilterItem/FilterContainer";
import ChartList from "./components/Chart/chartList";
import fundo2 from "./assets/fundo2.png"
import { appDataState, metaDataListState } from "../../stateHandler/atoms/atoms";
import { GetLastAppData } from "./model/getAppDataModel";

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

   const numbersOfDivs = [1,2,3,4,5]                                       
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
    }else{
      const dadoslogin = getDadosLogin();
      email = dadoslogin.email;
      filtrar(dadoslogin.email, data_inicio_filtro, data_fim_filtro,dadoslogin.token);

      filtrarFullDay(dadoslogin.email,oneday, dadoslogin.token,setListGlycemiaOne);
      filtrarFullDay(dadoslogin.email,twoday, dadoslogin.token,setListGlycemiaTwo);
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
    <DashboardLayout>
      <DashboardNavbar />
      <FilterContainer
        hora_inicio={hora_inicio} data_inicio_filtro={data_inicio_filtro} hora_fim={hora_fim}  data_fim_filtro={data_fim_filtro}
        setDataInicio_filtro={setDataInicio_filtro} setHoraInicio={setHoraInicio} setDataFim_filtro={setDataFim_filtro}  setHoraFim={setHoraFim}
        handleFiltrar={handleFiltrar}
      />
      <If test={messageErrorsList.length === 0} Else={<ErrorAlert messageErrorList={messageErrorsList} resetMessages={()=>setMessageErrorList([])}/>}>
      <div className=" md:grid md:grid-cols-4 flex flex-col-reverse mt-16">
        <div className="col-span-3">
          <ChartThemeSelector onChange={setLightTheme} value={lightTheme}/>
          <button className="btn btn-primary ml-2" onClick={()=>PrintContentCanvas("#grafico","#grafico canvas")}><Print collorFill="#fff" /></button>
            <div>
              <div>
                Data filtrada:
                <ChartList dataChart={dataChart} lightTheme={lightTheme}/>
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
        <div>
 
          <div>
              <h5 className="text-center text-sm font-extrabold">Horas de sono:</h5>
              <div className="grid grid-cols-2">
                  <div className="w-48">
                      <Sleep collorFill="#000" _className=""/>
                  </div>
                  <div className='w-48 font-bold'  style={{position:"relative"}}>
                      <img src={fundo}/> 
                      <span style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.sleepTime?minutoToHour(appData.sleepTime):0}</span>
                  </div>
              </div> 
          </div>
          <div>
            <div className="grid grid-cols-3">
                <div className="grid grid-rows-3">
                    <h5 className="text-center text-sm font-extrabold">Passos Ativo</h5>
                    <div className='w-32' style={{position:"relative"}}>
                        <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                            <Steps collorFill="#000" _className="w-12"/>
                        </div>
                    </div>
                    <div className="p-2 text-center text-xs font-extrabold">
                        {appData.steps?parseInt(appData.steps):0}
                    </div>
                </div>
                <div className="grid grid-rows-3">
                    <h5 className="text-center text-sm font-extrabold">Atividades</h5>
                    <div className='w-32'  style={{position:"relative"}}>
                        <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                            <FrequencyHeart collorFill="#000" _className="w-12"/>
                        </div>
                    </div>
                    <div className="p-2 text-center text-xs font-extrabold">
                    {appData.activities?parseInt(appData.activities):0}
                    </div>
                </div>
                <div className="grid grid-rows-3">
                    <h5 className="text-center text-sm font-extrabold">Movimentos intensidade</h5>
                    <div className='w-32'  style={{position:"relative"}}>
                        <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                            <Activities  collorFill="#000" _className="w-12"/>
                        </div>
                    </div>
                    <div className="p-2 text-center text-xs font-extrabold">
                        {appData.intensityMovements?parseInt(appData.intensityMovements):0}
                    </div>
                </div>
            </div> 
          </div>
          <div>
            <div className="grid grid-cols-2">
            <div>
                    <h5 className="text-center text-sm font-extrabold">Distância</h5>
                    <div className='w-48 font-bold' style={{position:"relative"}}>
                        <img src={fundo}/> 
                        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.distance?parseInt(appData.distance):0}Mt</div>
                    </div>
                </div>
                <div>
                    <h5 className="text-center text-sm font-extrabold">Tempo Ativo</h5>
                    <div className='w-48 font-bold' style={{position:"relative"}}>
                        <img src={fundo}/> 
                        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.avtiveTime?minutoToHour(appData.avtiveTime):0}</div>
                    </div>
                </div>
            </div> 
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