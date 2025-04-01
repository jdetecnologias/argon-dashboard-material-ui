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

export default function Chart(props){
    const {dataChart, _className,title, lightTheme, propName} = props;
    const [lastGlycemia, setLastGlycemia] = useState({});
    const [showData, setShowData] = useState(true);
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
                    <div className={averagesClass+"text-sm font-black"}>
                        Maior: {parseInt(getMax(dataChart.datasets[0].data))}
                    </div>
                    <div className={averagesClass+"text-sm font-black"}>
                        Menor: {parseInt(getMin(dataChart.datasets[0].data))}
                    </div>
                    <div className={averagesClass+"text-sm font-black"}>
                        Média:
                    </div>
                    <div className={"text-4xl text-center"}>
                        {hasAverages?parseInt(getAverage(dataChart.datasets[0].data)):parseInt(getLastValue(dataChart.datasets[0].data))}
                    </div>
                    <div className="text-sm font-black">
                        Atual({lastGlycemia && lastGlycemia.data?dayjs(lastGlycemia.data).format("DD/MM/YYYY"):"Sem dados"}): {lastGlycemia && lastGlycemia.lastGlycemia ? lastGlycemia.lastGlycemia : 0}
                    </div>    
                    <div className="text-4xl text-center">
                       {getUnitMesure(propName)}
                    </div>                        
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
    propName: PropTypes.string.isRequired
}