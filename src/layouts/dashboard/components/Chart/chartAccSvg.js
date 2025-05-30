import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { getAverage } from "helper/math";
import PropTypes from "prop-types";

import MultipleAveragesView from "./MultipleAveragesView";

export default function ChartAccSvg(props){
    const {dataChart, _className,title, lightTheme} = props;   
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
                <div className="text-sm">
                    Média do período:
                </div>
                <MultipleAveragesView datasets={dataChart.datasets}/> 
            </div>
        </div>
    )
}

ChartAccSvg.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
    _className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lightTheme: PropTypes.bool.isRequired,
}