import PropTypes from 'prop-types'
import DateTime from './dateTimeItem'
import ButtonFilter from './buttonFilter'

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
    return (
        <div className="grid grid-rows-2 relative text-xs md:text-lg">
            <div className="grid 4xl:grid-cols-6 3xl:grid-cols-5 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-3">
                <DateTime valueDate={data_inicio_filtro} label="De:" valueTime={hora_inicio} onChangeDate={(e)=>setDataInicio_filtro(e.target.value)} onChangeTime={(e)=>setHoraInicio(e.target.value)}/>
                <DateTime valueDate={data_fim_filtro} label="De:" valueTime={hora_fim} onChangeDate={(e)=>setDataFim_filtro(e.target.value)} onChangeTime={(e)=>setHoraFim(e.target.value)}/>
            </div>
            <div className='mt-1'>
                <ButtonFilter onClick={handleFiltrar}/>
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