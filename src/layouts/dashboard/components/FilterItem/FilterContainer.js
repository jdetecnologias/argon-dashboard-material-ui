import PropTypes from 'prop-types'
import DateTime from './dateTimeItem'
import ButtonFilter from './buttonFilter'
import { Height } from 'layouts/dashboard/assets/height';
import { Steps } from 'layouts/dashboard/assets/steps';
import { Oximetry } from 'layouts/dashboard/assets/oximetry';
import { Weight } from 'layouts/dashboard/assets/weight';
import { Age } from 'layouts/dashboard/assets/age';
import { useRecoilState } from 'recoil';
import { appDataState } from '../../../../stateHandler/atoms/atoms';
import AppDataItemTopo from '../AppData/appDataItemTopo';
import { Sleep } from 'layouts/dashboard/assets/sleep';
import { Activities } from 'layouts/dashboard/assets/activities';
import { minutoToHour } from 'helper/date';
import { FrequencyHeart } from 'layouts/dashboard/assets/frequencyHeart';
import { ActivitiesGluco } from 'layouts/dashboard/assets/activitiesGluco';
import { SleepGluco } from 'layouts/dashboard/assets/sleepGluco';
import { FrequencyHeartGluco } from 'layouts/dashboard/assets/frequencyHeartGluco';
import AppDataItemTopoGluco from '../AppData/appDataItemTopoGluco';

export default function FilterContainer(props){
    const {
            hora_inicio, 
            hora_fim,
            data_inicio_filtro, 
            data_fim_filtro,
            setDataInicio_filtro,
            setHoraInicio,
            setDataFim_filtro,
            setHoraFim,
            handleFiltrar
        } = props;
    
    const [appData, setAppData] = useRecoilState(appDataState)
    return (
        <div className="grid relative text-xs">
            <div className="grid grid-cols-12">
                <div className="lg:col-span-4 sm:col-span-6">
                    <div className="grid-rows-2">
                        <div>
                            <DateTime valueDate={data_inicio_filtro} label="De:" valueTime={hora_inicio} onChangeDate={(e)=>setDataInicio_filtro(e.target.value)} onChangeTime={(e)=>setHoraInicio(e.target.value)}/>
                        </div>
                        <div className='grid sm:grid-cols-12 mt-1'>
                            <div className='sm:col-span-8 md:col-span-7 lg:col-span-8 1xl:col-span-7'>
                                <DateTime valueDate={data_fim_filtro} valueTime={hora_fim} onChangeDate={(e)=>setDataFim_filtro(e.target.value)} onChangeTime={(e)=>setHoraFim(e.target.value)}/>
                            </div>
                            <div className='sm:col-span-2 lg:col-span-1'>
                                <ButtonFilter onClick={handleFiltrar}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:"-20px"}} className='lg:col-span-8  sm:col-span-6 '>
                    <div className='grid justify-center lg:grid-cols-6 sm:grid-cols-3 xs:grid-cols-1 grid-flow-row text-xs'>                       
                        <AppDataItemTopo showIcon={true} value={appData.height} label=" Altura(cm)" icon={<Height colorFill="#000" _className=""/>}/>
                        <AppDataItemTopo showIcon={true} value={appData.weight} label="Peso(KG)" icon={<Weight colorFill="#000" _className=""/>}/>
                        <AppDataItemTopo showIcon={true} value={appData.steps} label="Passos" icon={ <Steps colorFill="#000" _className=""/>}/>
                        <AppDataItemTopo showIcon={true} value={appData.age} label="Idade" icon={ <Age colorFill="#000" _className=""/>}/>
                        <AppDataItemTopo showIcon={true} value={appData.vbg} label="VBG" icon={<Oximetry colorFill="#000" _className=""/>}/>
                    </div>                    
                    <div className='grid justify-center grid-cols-3 grid-flow-row text-xs'> 
                        <AppDataItemTopo value={appData.sleepTime?minutoToHour(appData.sleepTime):0} label ="Sono" icon={<SleepGluco colorFill="#000" _className="w-16"/>} />
                        <AppDataItemTopo value={appData.activities} label="Batimentos Cardíacos" icon={<FrequencyHeartGluco  colorFill="#000" _className="w-16"/>}/>
                        <AppDataItemTopo value={appData.intensityMovements} label="Atividades"  icon={<ActivitiesGluco colorFill="#000" _className="w-16"/>}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

FilterContainer.propTypes = {
    hora_inicio:PropTypes.string.isRequired, 
    hora_fim:PropTypes.string.isRequired,
    data_inicio_filtro:PropTypes.string.isRequired, 
    data_fim_filtro:PropTypes.string.isRequired,
    setDataInicio_filtro:PropTypes.func.isRequired,
    setHoraInicio:PropTypes.func.isRequired,
    setDataFim_filtro:PropTypes.func.isRequired,
    setHoraFim:PropTypes.func.isRequired,
    handleFiltrar:PropTypes.func.isRequired
}