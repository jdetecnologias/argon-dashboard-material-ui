
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { Sleep } from "layouts/dashboard/assets/sleep";
import { Steps } from "layouts/dashboard/assets/steps";
import { FrequencyHeart } from "layouts/dashboard/assets/frequencyHeart";
import { Activities } from "layouts/dashboard/assets/activities";
import { appDataState } from "../../../../stateHandler/atoms/atoms";
import { Fundo1 } from "./../../assets/fundo1";
import { minutoToHour } from "helper/date";

export  default function AppData(props){
    const [appData, setData] = useRecoilState(appDataState)
    return (
        <div> 
          <div>
              <h5 className="text-center text-sm font-extrabold">Horas de sono:</h5>
              <div className="grid grid-cols-2">
                  <div className="w-48">
                      <Sleep colorFill="lightblue" _className=""/>
                  </div>
                  <div className='w-48 font-bold'  style={{position:"relative"}}>
                      <Fundo1 colorFill="lightblue"/>
                      <span style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.sleepTime?minutoToHour(appData.sleepTime):0}</span>
                  </div>
              </div> 
          </div>

          <div className="grid grid-cols-3">
              <div className="grid grid-rows-3">
                  <h5 className="text-center text-sm font-extrabold">Passos Ativo</h5>
                  <div className='w-32' style={{position:"relative"}}>
                      <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                          <Steps colorFill="lightblue" _className="w-12"/>
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
                          <FrequencyHeart colorFill="lightblue" _className="w-12"/>
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
                          <Activities  colorFill="lightblue" _className="w-12"/>
                      </div>
                  </div>
                  <div className="p-2 text-center text-xs font-extrabold">
                      {appData.intensityMovements?parseInt(appData.intensityMovements):0}
                  </div>
              </div>
          </div> 
          
          <div>
            <div className="grid grid-cols-2">
            <div>
                    <h5 className="text-center text-sm font-extrabold">Distância</h5>
                    <div className='w-48 font-bold' style={{position:"relative"}}>
                    <Fundo1 colorFill="lightblue"/>
                        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.distance?parseInt(appData.distance):0}Mt</div>
                    </div>
                </div>
                <div>
                    <h5 className="text-center text-sm font-extrabold">Tempo Ativo</h5>
                    <div className='w-48 font-bold' style={{position:"relative"}}>
                        <Fundo1 colorFill="lightblue"/>
                        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translateY(-50%) translateX(-50%)"}}>{appData.avtiveTime?minutoToHour(appData.avtiveTime):0}</div>
                    </div>
                </div>
            </div> 
          </div>
        </div>
    )
}
