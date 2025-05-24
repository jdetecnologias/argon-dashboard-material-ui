
import PropTypes from "prop-types";
import If from "components/If/if";
import UniqueAveragesView from "./UniqueAveragesView";
// Argon Dashboard 2 MUI example components

 function AverageViewSelector(props){
     return (
       <>
            <If test={optionAccumulate}>
               <UniqueAveragesView />
            </If>
            <If test={!optionAccumulate}>
               <ChartList dataChart={dataChart} lightTheme={lightTheme}/>
            </If>
       </>
     );

 }

 AverageViewSelector.propTypes = {
     dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
     optionAccumulate: PropTypes.bool.isRequired,
     lightTheme: PropTypes.bool.isRequired
 }


export default AverageViewSelector