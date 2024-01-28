import dayjs from "dayjs";
import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { getCookie } from "helper/cookies";
import { getMin } from "helper/math";
import { getMax } from "helper/math";
import { getAverage } from "helper/math";
import { GetLastGlycemia } from "layouts/dashboard/model/getGlycemiaData";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export default function Chart(props){
    const {dataChart, _className,title, lightTheme} = props;
    const [lastGlycemia, setLastGlycemia] = useState({});

    useEffect(() => {
        let dadosLogin = getCookie("dadosLogin");
        if(dadosLogin != ""){
          dadosLogin = JSON.parse(dadosLogin);
    
          GetLastGlycemia(dadosLogin.email).then(result=>{
            if(result.data && result.data.message){
                setLastGlycemia(result.data.message);
            }
          })   
        }
      },[]);
    
    const bgClassName = lightTheme ? "" : "bg-black";
    let mainClassName ="grid grid-cols-10 "+bgClassName; 
    mainClassName +=  _className !== undefined ? " "+_className : ""; 
    return (
        <div id="grafico" className={mainClassName}>
            <div className={lightTheme?"col-span-8":"col-span-8 invert"}>
                <GradientLineChart
                title={title}
                chart={dataChart}
                height={200}
                />
            </div>
            <div className={lightTheme?"col-span-2":"text-lime-300 col-span-2"}>
                <div className="text-sm font-black">
                    Maior: {parseInt(getMax(dataChart.datasets[0].data))}
                </div>
                <div className="text-sm font-black">
                    Menor: {parseInt(getMin(dataChart.datasets[0].data))}
                </div>
                <div className="text-sm">
                    Média:
                </div>
                <div className="text-4xl text-center">
                    {parseInt(getAverage(dataChart.datasets[0].data))}
                </div>
                <div className="text-sm">
                    Atual({lastGlycemia && lastGlycemia.data?dayjs(lastGlycemia.data).format("DD/MM/YYYY"):"Sem dados"}): {lastGlycemia && lastGlycemia.lastGlycemia ? lastGlycemia.lastGlycemia : 0}
                </div>    
                <div className="text-4xl text-center">
                    Mg/dl
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
}