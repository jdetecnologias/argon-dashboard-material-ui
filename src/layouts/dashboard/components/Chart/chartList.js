import Map from "layouts/dashboard/map/map";
import Chart from "./chart"
import PropTypes from "prop-types";
import ChartThemeSelector from "./chartThemeSelector";
import { useState } from "react";
import { PrintContentCanvas } from 'helper/printDocument';
import { Print } from "layouts/dashboard/assets/print";
import { Sleep } from "layouts/dashboard/assets/sleep";
import fundo from "layouts/dashboard/assets/fundo.png"
import { Steps } from "layouts/dashboard/assets/steps";
import { FrequencyHeart } from "layouts/dashboard/assets/frequencyHeart";
import { Activities } from "layouts/dashboard/assets/activities";
import If from "components/If/if";
import { useRecoilState } from "recoil";
import { appDataState } from "../StateHandler/atoms/atoms";
import { minutoToHour } from "helper/date";


export default function ChartList(props){
    const {dataChart} = props;   
    const [lightTheme, setLightTheme] = useState(true); 
    const [showMap, setShowMap] = useState(true); 
    const [appData, setAppData] = useRecoilState(appDataState);
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
                    <button onClick={()=>setShowMap(true)} className={showMap?"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded":"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"}>Mapa</button>
                    <button onClick={()=>setShowMap(false)} className={!showMap?"ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded":"ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"}>Dados paciente</button>
                    <If test={showMap}>
                        <Map/>
                    </If>
                    <If test={!showMap}>
                    <div>
                        <h5 className="text-center text-sm font-extrabold">Horas de sono:</h5>
                        <div className="grid grid-cols-2">
                            <div className="w-48">
                                <Sleep collorFill="#000" _className=""/>
                            </div>
                            <div className='w-48 font-bold'  style={{position:"relative"}}>
                                <img src={fundo}/> 
                                <span style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.sleepTime?minutoToHour(appData.sleepTime):0}</span>
                            </div>
                        </div>    

                    </div>
                    <div>
                        <div className="grid grid-cols-3">
                            <div className="grid grid-rows-3">
                                <h5 className="text-center text-sm font-extrabold">Passos Ativo</h5>
                                <div className='w-32' style={{position:"relative"}}>
                                    <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                                        <Steps collorFill="#000" _className="w-12"/>
                                    </div>
                                </div>
                                <div className="p-2 text-center text-xs font-extrabold">
                                    {appData.steps?parseInt(appData.steps):0}
                                </div>
                            </div>
                            <div className="grid grid-rows-3">
                                <h5 className="text-center text-sm font-extrabold">Atividades</h5>
                                <div className='w-32'  style={{position:"relative"}}>
                                    <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                                        <FrequencyHeart collorFill="#000" _className="w-12"/>
                                    </div>
                                </div>
                                <div className="p-2 text-center text-xs font-extrabold">
                                {appData.activities?parseInt(appData.activities):0}
                                </div>
                            </div>
                            <div className="grid grid-rows-3">
                                <h5 className="text-center text-sm font-extrabold">Movimentos intensidade</h5>
                                <div className='w-32'  style={{position:"relative"}}>
                                    <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                                        <Activities  collorFill="#000" _className="w-12"/>
                                    </div>
                                </div>
                                <div className="p-2 text-center text-xs font-extrabold">
                                    {appData.intensityMovements?parseInt(appData.intensityMovements):0}
                                </div>
                            </div>
                        </div>    

                    </div>
                    <div>
                        <div className="grid grid-cols-2">
                        <div>
                                <h5 className="text-center text-sm font-extrabold">Distância</h5>
                                <div className='w-48 font-bold' style={{position:"relative"}}>
                                    <img src={fundo}/> 
                                    <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.distance?parseInt(appData.distance):0}Mt</div>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-center text-sm font-extrabold">Tempo Ativo</h5>
                                <div className='w-48 font-bold' style={{position:"relative"}}>
                                    <img src={fundo}/> 
                                    <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.avtiveTime?minutoToHour(appData.avtiveTime):0}</div>
                                </div>
                            </div>
                        </div>    

                    </div>
                    </If>
                </div>
            </div>
    )
}

ChartList.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
}