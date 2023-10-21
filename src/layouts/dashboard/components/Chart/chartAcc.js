import Map from "layouts/dashboard/map/map";
import ChartAccSvg from "./chartAccSvg";
import PropTypes from "prop-types";
import ChartThemeSelector from "./chartThemeSelector";
import { useState } from "react";
import { PrintContentCanvas } from 'helper/printDocument';
import { Print } from "layouts/dashboard/assets/print";

export default function ChartAcc(props){
    const {dataChart} = props;   
    const [lightTheme, setLightTheme] = useState(true); 
    return (
            <div className=" md:grid md:grid-cols-4 flex flex-col-reverse mt-16">
                <div className="col-span-3">
                    <ChartThemeSelector onChange={setLightTheme} value={lightTheme}/>
                    <button className="btn btn-primary ml-2" onClick={()=>PrintContentCanvas("#grafico","canvas")}><Print collorFill="#fff" /></button>
                     <ChartAccSvg 
                        key={1} 
                        title="Dados" 
                        lightTheme={lightTheme}
                        dataChart={{labels:dataChart.labels, datasets:dataChart.datasets}}
                    />
                </div>
                <div>
                    <Map/>
                </div>
            </div>
    )
}

ChartAcc.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
}