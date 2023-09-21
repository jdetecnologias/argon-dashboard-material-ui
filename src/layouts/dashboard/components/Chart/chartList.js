import Map from "layouts/dashboard/map/map";
import Chart from "./chart"
import PropTypes from "prop-types";
import ChartThemeSelector from "./chartThemeSelector";
import { useState } from "react";
import { PrintContentCanvas } from 'helper/printDocument';
import { Print } from "layouts/dashboard/assets/print";

export default function ChartList(props){
    const {dataChart} = props;   
    const [lightTheme, setLightTheme] = useState(true); 
    return (
            <div className=" md:grid md:grid-cols-4 flex flex-col-reverse mt-16">
                <div className="col-span-3">
                    <ChartThemeSelector onChange={setLightTheme} value={lightTheme}/>
                    <button className="btn btn-primary ml-2" onClick={()=>PrintContentCanvas("#grafico","canvas")}><Print collorFill="#fff" /></button>
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