import dayjs from "dayjs";
import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { getCookie } from "helper/cookies";
import { getMin } from "helper/math";
import { getMax } from "helper/math";
import { getAverage } from "helper/math";
import { GetLastGlycemia } from "layouts/dashboard/model/getGlycemiaData";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Switcher from "../Switch/switch";
import { getUnitMesure } from "helper/unitMesure";
import { getLastValue } from "helper/math";
import { hasAverages } from "helper/unitMesure";
import { hasAveragesData } from "helper/unitMesure";
import UniqueAveragesView from "./UniqueAveragesView";
import MultipleAveragesView from "./MultipleAveragesView";
import If from "components/If/if";

export default function Chart(props){
    const {dataChart, _className,title, lightTheme, propName, optionAccumulate} = props;
    const [lastGlycemia, setLastGlycemia] = useState({});
    const [showData, setShowData] = useState(true);
    const [selectedAverageData, setSelectedAverageData] = useState(0)
    useEffect(() => {
        const queryString = window.location.search;
    
        const urlParams = new URLSearchParams(queryString);
        const adminAccess = urlParams.get('adminAccess') !== null && urlParams.get('adminAccess') === 'true' ;
        let email = "";

        if(adminAccess){
            email = urlParams.get('email');
          }else{
              let dadosLogin = getCookie("dadosLogin");
              if(dadosLogin != ""){
                dadosLogin = JSON.parse(dadosLogin);  
                email = dadosLogin.email;
              }
          }

          if(email !== ""){
            GetLastGlycemia(email).then(result=>{
                if(result.data && result.data.message){
                    setLastGlycemia(result.data.message);
                }
              });  
          }


      },[]);

    function handleSelectedAverageData(e){
        const value = e.target.value;

        setSelectedAverageData(value)
    }  
    console.log(dataChart, _className,title, lightTheme)
    const bgClassName = lightTheme ? "" : "bg-black";
    let mainClassName ="grid grid-cols-10 "+bgClassName; 
    mainClassName +=  _className !== undefined ? " "+_className : ""; 
    const hasAverages = hasAveragesData(propName);
    const averagesClass = !hasAverages?"invisible ":" "
    const colsSpanChart = showData?"col-span-8":"col-span-10";
    const avgDataClass = showData?"":" hidden";
    return (
        <div id="grafico">
            <div className={mainClassName}>
                <div className="col-span-2 col-end-10">
                    <Switcher onChange={setShowData} value={showData} label="Médias"/>
                </div>
            </div>
            <div className={mainClassName}>
                <div className={lightTheme?colsSpanChart:colsSpanChart+" invert"}>
                    <GradientLineChart
                    title={title}
                    chart={dataChart}
                    height={200}
                    />
                </div>
                <div  className={lightTheme?"col-span-2"+avgDataClass:"text-lime-300 col-span-2"+avgDataClass}>
                <div>
                    <select onChange={handleSelectedAverageData} id="labels" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {
                            dataChart.datasets.map((dataset, index)=><option value={index} key={index}>{dataset.label}</option>)
                        }
                    </select>
                </div>
                <UniqueAveragesView 
                        showData={showData}
                        lightTheme={lightTheme}
                        maior={parseInt(getMax(dataChart.datasets[selectedAverageData].data))} 
                        menor={parseInt(getMin(dataChart.datasets[selectedAverageData].data))}
                        average={hasAverages?parseInt(getAverage(dataChart.datasets[selectedAverageData].data)):parseInt(getLastValue(dataChart.datasets[selectedAverageData].data))}
                        unitMesure={getUnitMesure(propName)}
                        atual= {lastGlycemia && lastGlycemia.lastGlycemia ? lastGlycemia.lastGlycemia : 0}
                        atualData={lastGlycemia && lastGlycemia.data?dayjs(lastGlycemia.data).format("DD/MM/YYYY"):"Sem dados"}
                        hasAverages={hasAverages}
                    />
                </div>
            </div>
        </div>
    )
}

Chart.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
    _className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lightTheme: PropTypes.bool.isRequired,
    propName: PropTypes.string.isRequired,
    optionAccumulate: PropTypes.bool.isRequired
}