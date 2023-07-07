import Map from "layouts/dashboard/map/map";
import Chart from "./chart"
import PropTypes from "prop-types";
export default function ChartList(props){
    const {dataChart} = props;    
    return (
        <div className=" md:grid md:grid-cols-4 flex flex-col-reverse mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-1 col-span-3">
            {
                dataChart.datasets && dataChart.datasets.map((dataset, key)=>{
                return <
                           
                            Chart 
                            key={key} 
                            title={dataset.label} 
                            dataChart={{labels:dataChart.labels[key], datasets:[dataset]}}
                        />
                })
            }
            

            </div>
            <div>
                <Map/>
            </div>
        </div>
    )
}

ChartList.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
}