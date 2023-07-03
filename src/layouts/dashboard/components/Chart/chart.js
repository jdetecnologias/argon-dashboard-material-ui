import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PropTypes from "prop-types";
export default function Chart(props){
    const {dataChart, _className} = props;    
    return (
        <div className={_className}>
        <GradientLineChart
        title="Meus indíces de glicemia"
        chart={dataChart}
        />
        </div>
    )
}

Chart.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
    _className: PropTypes.string.isRequired,
}