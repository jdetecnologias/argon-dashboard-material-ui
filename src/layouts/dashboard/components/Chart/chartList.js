
import Chart from "./chart"
import PropTypes from "prop-types";

export default function ChartList(props){
    const {dataChart, lightTheme} = props;   

    return (    
            <>
               {
                    dataChart.datasets && dataChart.datasets.map((dataset, key)=>{
                    return <
                            
                                Chart 
                                key={key} 
                                title={dataset.label} 
                                lightTheme={lightTheme}
                                dataChart={{labels:dataChart.labels, datasets:[dataset]}}
                            />
                    })
                }
            </>
            
    )
}

ChartList.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
    lightTheme: PropTypes.bool.isRequired
}