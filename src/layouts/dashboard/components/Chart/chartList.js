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
                    <div>
                        <h5 className="text-center text-sm font-extrabold">Horas de sono:</h5>
                        <div className="grid grid-cols-2">
                            <div className="w-48">
                                <Sleep collorFill="#000" _className=""/>
                            </div>
                            <div className='w-48 font-bold'  style={{position:"relative"}}>
                                <img src={fundo}/> 
                                <span style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>8H</span>
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
                                    485
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
                                    8
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
                                    12
                                </div>
                            </div>
                        </div>    

                    </div>
                    <div>
                        <div className="grid grid-cols-2">
                        <div>
                                <h5 className="text-center text-sm font-extrabold">Tempo Ativo</h5>
                                <div className='w-48 font-bold' style={{position:"relative"}}>
                                    <img src={fundo}/> 
                                    <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>6KM</div>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-center text-sm font-extrabold">Tempo Ativo</h5>
                                <div className='w-48 font-bold' style={{position:"relative"}}>
                                    <img src={fundo}/> 
                                    <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>1.6H</div>
                                </div>
                            </div>
                        </div>    

                    </div>
                </div>
            </div>
    )
}

ChartList.propTypes = {
    dataChart: PropTypes.objectOf(PropTypes.array).isRequired,
}