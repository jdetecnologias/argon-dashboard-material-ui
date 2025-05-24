import Map from "layouts/dashboard/map/map";
import ChartAccSvg from "./chartAccSvg";
import PropTypes from "prop-types";
import ChartThemeSelector from "./chartThemeSelector";
import { useState } from "react";
import { PrintContentCanvas } from 'helper/printDocument';
import { Print } from "layouts/dashboard/assets/print";
import Chart from "./chart";

export default function ChartAcc(props){
    const {dataChart, lightTheme} = props;   

    return (
             <Chart 
                        optionAccumulate={true}
                        key={1} 
                        title="Dados" 
                        lightTheme={lightTheme}
                        dataChart={{labels:dataChart.labels, datasets:dataChart.datasets}}
                    />
    )
}

ChartAcc.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
    lightTheme: PropTypes.bool.isRequired
}