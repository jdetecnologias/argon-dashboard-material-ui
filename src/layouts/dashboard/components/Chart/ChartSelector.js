
import { useState, useEffect } from "react";
import ChartThemeSelector from "./chartThemeSelector";
import PropTypes from "prop-types";
import If from "components/If/if";
import ChartAcc from "./chartAcc";
import ChartList from "./chartList";
// Argon Dashboard 2 MUI example components

 function ChartSelector({optionAccumulate,dataChart,lightTheme}){
     return (
       <>
            <If test={optionAccumulate}>
               <ChartAcc dataChart={dataChart} lightTheme={lightTheme}/>
            </If>
            <If test={!optionAccumulate}>
               <ChartList dataChart={dataChart} lightTheme={lightTheme}/>
            </If>
       </>
     );

 }

 ChartSelector.propTypes = {
     dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
     optionAccumulate: PropTypes.bool.isRequired,
     lightTheme: PropTypes.bool.isRequired
 }


export default ChartSelector