import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PropTypes from "prop-types";
export default function Chart(props){
    const {dataChart, _className,title} = props;    
    return (
        <div className={_className}>
        <GradientLineChart
        title={title}
        chart={dataChart}
        />
        </div>
    )
}

Chart.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
    _className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}