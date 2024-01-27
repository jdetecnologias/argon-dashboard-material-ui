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
        <div className="grid grid-rows-2 relative text-xs md:text-lg">
            <div className="grid 4xl:grid-cols-6 3xl:grid-cols-5 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-3">
                <DateTime valueDate={data_inicio_filtro} label="De:" valueTime={hora_inicio} onChangeDate={(e)=>setDataInicio_filtro(e.target.value)} onChangeTime={(e)=>setHoraInicio(e.target.value)}/>
                <DateTime valueDate={data_fim_filtro} label="De:" valueTime={hora_fim} onChangeDate={(e)=>setDataFim_filtro(e.target.value)} onChangeTime={(e)=>setHoraFim(e.target.value)}/>
            </div>
            <div className='grid grid-cols-10 '>
                <div className='mt-1 col-span-3'>
                    <ButtonFilter onClick={handleFiltrar}/>
                </div>
                <div className='grid grid-cols-7 text-xs col-span-7'>
                    <div className='grid grid-rows-3'>
                        <div>
                            Altura(cm):
                        </div>
                        <div className='grid grid-cols-2 w-20 text-lg font-bold '>
                            {appData.height?appData.height:0} <Height colorFill="#000" _className=""/>
                        </div>
                    </div>
                    <div className='grid grid-rows-3'>
                        <div>
                            Passos:
                        </div>
                        <div className='grid grid-cols-2 w-20 text-lg font-bold '>
                            {appData.steps?appData.steps:0} <Steps colorFill="#000" _className=""/>
                        </div>
                    </div>
                    <div className='grid grid-rows-3'>
                        <div>
                            Peso(KG):
                        </div>
                        <div className='grid grid-cols-2 w-20 text-lg font-bold '>
                            {appData.weight?appData.weight:0} <Weight colorFill="#000" _className=""/>
                        </div>
                    </div>
                    <div className='grid grid-rows-3'>
                        <div>
                            Peso ideal(KG):
                        </div>
                        <div className='grid grid-cols-2 w-20 text-lg font-bold '>
                            {appData.idealWeight?appData.idealWeight:0} <Weight colorFill="#000" _className=""/>
                        </div>
                    </div>
                    <div className='grid grid-rows-3'>
                        <div>
                            Idade:
                        </div>
                        <div className='grid grid-cols-2 w-20 text-lg font-bold '>
                            {appData.age?appData.age:0} <Age colorFill="#000" _className=""/>
                        </div>
                    </div>
                    <div className='grid grid-rows-3'>
                        <div>

                        </div>
                        <div className='grid grid-cols-2 w-20 text-lg font-bold '>

                        </div>
                    </div>
                    <div className='grid grid-rows-3'>
                        <div>
                        BPG:
                        </div>
                        <div className='grid grid-cols-2 w-20 text-lg font-bold '>
                            {appData.vbg?appData.vbg:0} <Oximetry colorFill="#000" _className=""/>
                        </div>
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