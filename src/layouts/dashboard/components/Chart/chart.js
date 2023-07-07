import GradientLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PropTypes from "prop-types";
export default function Chart(props){
    const {dataChart, _className,title} = props;    
    return (
        <div className={_className+" grid grid-cols-10 bg-black"}>
            <div className="col-span-8 invert">
                <GradientLineChart
                title={title}
                chart={dataChart}
                height={200}
                />
            </div>
            <div className="text-lime-300 col-span-2 text-9xl">
                25
            </div>
        </div>
    )
}

Chart.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
    _className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}